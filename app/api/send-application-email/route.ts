import { NextRequest, NextResponse } from "next/server";
import { findPayableSubmission, updatePayableSubmission } from "@/lib/db";
import { notifyPaymentStage } from "@/lib/paymentNotify";
import { getMettpayOrderDetails } from "@/lib/mettpay";

export const runtime = "nodejs";

// Triggered client-side from /payment-status once Mettpay redirects back
// with st=1 — the fallback success path for whenever the customer's browser
// does return to our site, independent of (and racing with) Mettpay's own
// server-to-server webhook in /api/paymentCallBack. notifyPaymentStage's own
// `email_sent` guard means whichever of the two fires first wins; the other
// is a no-op.
export async function POST(req: NextRequest) {
  try {
    const { orderid } = await req.json();
    const referenceId = String(orderid ?? "");
    if (!referenceId) {
      return NextResponse.json({ error: "Missing orderid." }, { status: 400 });
    }

    const row = await findPayableSubmission(referenceId);
    if (!row) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    if (row.email_sent) {
      return NextResponse.json({ success: true, alreadySent: true }, { status: 200 });
    }

    // Best-effort lookup of Mettpay's own Order ID for this reference — never
    // blocks or fails the actual success confirmation below if Mettpay's API
    // errors out; this is a nice-to-have, not the ground truth for success.
    let mettpayOrderId: string | null = (row.mettpay_order_id as string | null) ?? null;
    if (!mettpayOrderId) {
      try {
        const details = await getMettpayOrderDetails(referenceId);
        if (details?.unique_order_id) mettpayOrderId = String(details.unique_order_id);
      } catch (error) {
        console.error("send-application-email: getMettpayOrderDetails failed:", error);
      }
    }

    // Mark the payment itself confirmed BEFORE attempting to email — this is
    // ground truth from Mettpay's own redirect (st=1), and must never stay
    // stuck at "pending" just because a mail-provider hiccup throws below.
    const successAt = (row.success_at as string | null) ?? new Date().toISOString();
    await updatePayableSubmission(row, {
      transaction_status: "success",
      success_at: successAt,
      ...(mettpayOrderId ? { mettpay_order_id: mettpayOrderId } : {}),
    });
    await notifyPaymentStage({ ...row, success_at: successAt, mettpay_order_id: mettpayOrderId }, "success");

    return NextResponse.json({ success: true, mettpayOrderId }, { status: 200 });
  } catch (error) {
    console.error("API /send-application-email error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
