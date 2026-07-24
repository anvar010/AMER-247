import { NextRequest, NextResponse } from "next/server";
import { createMettpayOrder } from "@/lib/mettpay";
import { saveSubmission } from "@/lib/saveSubmission";

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
      // Persist as "pending" before calling out to Mettpay — mirrors
      // saveSubmission's own "save before the risky external call" pattern in
      // app/api/apply/route.ts, so a Mettpay outage never loses the record of
      // someone attempting to pay.
      await saveSubmission({
        formType: "apply",
        hub: "Pay Online",
        referenceId,
        applicantName: name,
        email,
        phone: mobile,
        data: { amount, comments, applicationReference, transactionStatus: "pending" },
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

    return NextResponse.json({ paymentUrl: order.payment_url }, { status: 200 });
  } catch (error) {
    console.error("API /create-payment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
