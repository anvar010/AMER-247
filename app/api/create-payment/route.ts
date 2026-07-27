import { NextRequest, NextResponse } from "next/server";
import { createMettpayOrder } from "@/lib/mettpay";
import { savePayOnlineOrder, findPayableSubmission, updatePayableSubmission } from "@/lib/db";
import { notifyPaymentStage } from "@/lib/paymentNotify";

export const runtime = "nodejs";

// Same style as ApplicationForm/TouristVisaForm's client-side ref ids
// ("AMR-" + ~10k random) — "PAY-" prefix keeps payment orders visually
// distinct from application submissions in the submissions table.
function generateReferenceId(): string {
  return "PAY-" + Math.floor(40000 + Math.random() * 9999);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "");
    const email = String(body.email ?? "");
    const mobile = String(body.mobile ?? "");
    const amount = String(body.amount ?? "");
    const comments = String(body.comments ?? "");
    const applicationReference = String(body.applicationReference ?? "");
    // Application forms (ApplicationForm/TouristVisaForm) already save their
    // own submission row via /api/apply before calling here — passing that
    // same reference through skips a second, duplicate DB insert and keeps
    // one submissions row per application, not two.
    const existingReferenceId = body.referenceId ? String(body.referenceId) : null;

    if (!name || !email || !mobile || !amount) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const referenceId = existingReferenceId ?? generateReferenceId();
    const origin = req.nextUrl.origin;
    // Logged unconditionally — origin comes from the incoming request's own
    // Host header via req.nextUrl, so this confirms whether it's actually
    // resolving to the real live domain (vs. an internal/default value)
    // when the request comes in through Render's reverse proxy.
    console.log(`create-payment: resolved origin = ${origin} (referenceId ${referenceId})`);
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
    const row = await findPayableSubmission(referenceId);
    if (row) {
      const pendingAt = new Date().toISOString();
      // Field name unconfirmed (checked defensively) — may already be
      // present at order-creation time, before any webhook ever fires.
      const mettpayOrderId = (order as Record<string, unknown>).order_id ?? (order as Record<string, unknown>).orderId ?? (order as Record<string, unknown>).id ?? null;
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
