import { NextRequest, NextResponse } from "next/server";
import { createMettpayOrder, getMettpayOrderDetails } from "@/lib/mettpay";
import {
  savePayOnlineOrder,
  findPayableSubmission,
  findPayableSubmissionInTable,
  updatePayableSubmission,
  PAYABLE_TABLES,
  type PayableTable,
} from "@/lib/db";
import { notifyPaymentStage } from "@/lib/paymentNotify";
import { PRICES } from "@/lib/prices";

export const runtime = "nodejs";

// Same style as ApplicationForm/TouristVisaForm's client-side ref ids
// ("AMR-" + ~10k random) — "PAY-" prefix keeps payment orders visually
// distinct from application submissions in the submissions table.
function generateReferenceId(): string {
  // Widened from a ~10k range (40000-49999) — see genRef() comments in
  // TouristVisaForm.tsx / ApplicationForm.tsx for why.
  return "PAY-" + Math.floor(100000 + Math.random() * 900000);
}

// Mirrors TouristVisaForm's own withVat() — kept as a separate copy (same
// pattern already used across ApplicationForm/PricingCalculator/etc. in this
// codebase) rather than a shared import, so this route has no dependency on
// client component internals.
function withVat(amount: number): number {
  return Math.round(amount * 105) / 100;
}

function parseAedValue(v?: string | null): number | null {
  if (!v) return null;
  const n = parseFloat(v.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

// Fixed, not derived from the incoming request — req.nextUrl.origin would
// correctly reflect "http://localhost:3000" during local testing, but since
// local testing hits Mettpay's real/live API (no sandbox key exists), that
// meant real Mettpay orders got created with a localhost return URL that no
// real customer could ever reach. Hardcoding the live domain means Mettpay
// always redirects back to the real site — change this only when
// deliberately testing payments locally.
const LIVE_ORIGIN = "https://amer247.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "");
    const email = String(body.email ?? "");
    const mobile = String(body.mobile ?? "");
    let amount = String(body.amount ?? "");
    const comments = String(body.comments ?? "");
    const applicationReference = String(body.applicationReference ?? "");
    const serviceSlug = body.serviceSlug ? String(body.serviceSlug) : null;
    // Application forms (ApplicationForm/TouristVisaForm) already save their
    // own submission row via /api/apply before calling here — passing that
    // same reference through skips a second, duplicate DB insert and keeps
    // one submissions row per application, not two.
    const existingReferenceId = body.referenceId ? String(body.referenceId) : null;
    // Which table that reference lives in, if the caller knows (both
    // TouristVisaForm and ApplicationForm do). Lets the row lookup below go
    // straight to the right table instead of guessing across all three —
    // the guess-across-tables path is what silently misattributed a real
    // payment (AMR-47377) from a brand-new online_services_applications row
    // to an unrelated, already-completed tourist_visa_applications row that
    // happened to share the same reference.
    const sourceTable = PAYABLE_TABLES.includes(body.sourceTable)
      ? (body.sourceTable as PayableTable)
      : null;

    if (!name || !email || !mobile || !amount) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Fetched early (before the amount is ever handed to Mettpay) so a
    // Tourist Visa charge can be independently recomputed from the price
    // list + this reference's already-saved passenger count, instead of
    // trusting whatever `amount` the client sent — closes the gap where a
    // multi-passenger booking (or a tampered request) could pay for one
    // person's visa while applying for several. Reused below at the
    // pending-status update instead of fetching the row twice.
    let row = existingReferenceId
      ? sourceTable
        ? await findPayableSubmissionInTable(existingReferenceId, sourceTable)
        : await findPayableSubmission(existingReferenceId)
      : null;
    if (row?.table === "tourist_visa_applications" && serviceSlug) {
      const perPersonPrice = parseAedValue(PRICES[serviceSlug]?.single);
      const adultsCount = Array.isArray(row.adults) ? row.adults.length : 0;
      const childrenCount = Array.isArray(row.children) ? row.children.length : 0;
      const passengerCount = adultsCount + childrenCount;
      if (perPersonPrice && passengerCount > 0) {
        const authoritativeAmount = withVat(perPersonPrice * passengerCount).toFixed(2);
        // Compare as numbers, not strings — the client sends withVat()'s raw
        // output (e.g. "3465"), which is numerically equal to but string-
        // unequal from this route's .toFixed(2) (e.g. "3465.00"), so a
        // string compare here logged a false "disagreement" on every exact
        // match.
        if (parseFloat(authoritativeAmount) !== parseFloat(amount)) {
          console.warn(
            `create-payment: client amount ${amount} disagreed with authoritative ${authoritativeAmount} ` +
            `for ${existingReferenceId} (${passengerCount} passengers) — using authoritative amount.`
          );
        }
        amount = authoritativeAmount;
      }
    }

    const referenceId = existingReferenceId ?? generateReferenceId();
    // Logged for visibility only — not used for the return URLs below (see
    // LIVE_ORIGIN comment). Lets us notice if req.nextUrl.origin ever
    // disagrees with the live domain for some other reason.
    console.log(`create-payment: req.nextUrl.origin = ${req.nextUrl.origin} (referenceId ${referenceId})`);
    const origin = LIVE_ORIGIN;
    const returnUrl = body.returnUrl
      ? String(body.returnUrl)
      : `${origin}${existingReferenceId ? "" : "/pay-online"}`;

    const params = new URLSearchParams({
      st: "1",
      orderid: referenceId,
      name,
      email,
      mobile,
      amount,
      comments: "Payment Completed!!",
    }).toString();

    // Same fields as the success params (minus `st`/`comments`) — the
    // failure page needs name/email/mobile/amount to offer a "Retry
    // Payment" button without a DB round-trip.
    const errorParams = new URLSearchParams({
      st: "2",
      orderid: referenceId,
      name,
      email,
      mobile,
      amount,
    }).toString();

    if (!existingReferenceId) {
      // Persist as "initiated" before calling out to Mettpay — mirrors
      // /api/apply's own "save before the risky external call" pattern, so
      // a Mettpay outage never loses the record of someone attempting to
      // pay.
      await savePayOnlineOrder({
        referenceId,
        name,
        email,
        mobile,
        amount,
        comments,
        applicationReference,
        transactionStatus: "initiated",
      });
    }

    const order = await createMettpayOrder({
      amount,
      referenceId,
      name,
      email,
      mobile,
      returnUrl,
      returnSuccUrl: `${origin}/payment-status?${params}`,
      returnErrorUrl: `${origin}/payment-status?${errorParams}`,
    });
    // Logged unconditionally — we only ever read `payment_url` from this
    // response today, so this is the only way to see whether Mettpay
    // already includes an Order ID at creation time (before any webhook).
    console.log("create-payment: Mettpay create-order response:", JSON.stringify(order));

    // Mettpay confirmed the order and generated a real checkout link — move
    // from "initiated" (submitted, payment not yet attempted) to "pending"
    // (customer is now on Mettpay's checkout page) and notify admin/customer.
    // Reuses the row fetched above when available (existingReferenceId case)
    // instead of querying again — only the fresh-PAY-order path (no
    // existingReferenceId, row not created until savePayOnlineOrder above)
    // actually needs this fetch.
    if (!row) row = await findPayableSubmission(referenceId);
    if (row) {
      const pendingAt = new Date().toISOString();
      // Mettpay's create-order response never includes it (confirmed: only
      // payment_url comes back) — but get_order_details does return
      // unique_order_id even for a brand-new, not-yet-paid order, so this is
      // the real way to get it at the pending stage. Best-effort — never
      // blocks the pending update/notification below if it fails.
      let mettpayOrderId: string | null = null;
      try {
        const details = await getMettpayOrderDetails(referenceId);
        if (details?.unique_order_id) mettpayOrderId = String(details.unique_order_id);
      } catch (error) {
        console.error("create-payment: getMettpayOrderDetails failed:", error);
      }
      // `amount` is written here (not just at insert) because
      // tourist_visa_applications/online_services_applications rows are
      // created by /api/apply with no amount at all — this is the first and
      // only place those tables ever learn the real charged price.
      await updatePayableSubmission(row, {
        transaction_status: "pending",
        pending_at: pendingAt,
        amount,
        ...(mettpayOrderId ? { mettpay_order_id: String(mettpayOrderId) } : {}),
      });
      console.log(`create-payment: ${referenceId} moved to pending`);
      await notifyPaymentStage(
        { ...row, pending_at: pendingAt, amount, mettpay_order_id: mettpayOrderId ? String(mettpayOrderId) : null },
        "pending"
      );
    }

    return NextResponse.json({ paymentUrl: order.payment_url }, { status: 200 });
  } catch (error) {
    console.error("API /create-payment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
