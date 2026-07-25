import { NextRequest, NextResponse } from "next/server";
import { findPayableSubmission, updatePayableSubmission } from "@/lib/db";

export const runtime = "nodejs";

// Server-to-server webhook Mettpay calls once a transaction settles — the
// authoritative confirmation, separate from (and more trustworthy than) the
// browser being redirected to /payment-status, which a user could reload,
// skip, or forge query params for.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderNo = String(body.order_no ?? "");
    const transactionStatus = String(body.transaction_status ?? "");

    if (!orderNo || !transactionStatus) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existing = await findPayableSubmission(orderNo);
    if (!existing) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    await updatePayableSubmission(existing, { transaction_status: transactionStatus });

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API /paymentCallBack error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
