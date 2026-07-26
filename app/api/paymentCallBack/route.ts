import { NextRequest, NextResponse } from "next/server";
import { findPayableSubmission, updatePayableSubmission } from "@/lib/db";
import { notifyPaymentStage } from "@/lib/paymentNotify";

export const runtime = "nodejs";

// Server-to-server webhook Mettpay calls once a transaction settles — the
// authoritative confirmation, separate from (and more trustworthy than) the
// browser being redirected to /payment-status, which a user could reload,
// skip, or forge query params for.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Logged unconditionally (not just on error) — this is Mettpay's
    // undocumented webhook, so the only way to confirm it's actually being
    // called (and see its real payload shape) is to see every hit in Render
    // logs, success or not.
    console.log("paymentCallBack received:", JSON.stringify(body));

    const orderNo = String(body.order_no ?? "");
    const transactionStatus = String(body.transaction_status ?? "");

    if (!orderNo || !transactionStatus) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existing = await findPayableSubmission(orderNo);
    if (!existing) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Mettpay's own transaction/order reference (for cross-referencing
    // against their dashboard) — field name is unconfirmed since the
    // payload shape has never been seen, so every plausible key is checked
    // defensively rather than guessing one.
    const mettpayOrderId = body.order_id ?? body.orderId ?? body.mettpay_order_id ?? null;
    const mettpayTxnId = body.txn_id ?? body.txnId ?? body.transaction_id ?? body.transactionId ?? null;

    // "success" is our own convention (matches what the redirect fallback
    // uses) — Mettpay's real webhook vocabulary is unconfirmed, so anything
    // else just gets recorded as-is without firing the success notification.
    const isSuccess = transactionStatus === "success";
    const successAt = isSuccess ? new Date().toISOString() : undefined;
    await updatePayableSubmission(existing, {
      transaction_status: transactionStatus,
      ...(successAt ? { success_at: successAt } : {}),
      ...(mettpayOrderId ? { mettpay_order_id: String(mettpayOrderId) } : {}),
      ...(mettpayTxnId ? { mettpay_txn_id: String(mettpayTxnId) } : {}),
    });
    console.log(`paymentCallBack: ${orderNo} -> ${transactionStatus}`);

    if (isSuccess) {
      await notifyPaymentStage({ ...existing, success_at: successAt }, "success");
    }

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API /paymentCallBack error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
