import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

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

    const supabase = getSupabaseAdmin();
    // reference_id isn't guaranteed unique (see lib/saveSubmission.ts — it's
    // client-generated with a small random range, so two different
    // applicants can coincidentally collide) — .limit(1) + newest-first
    // instead of .single() means a rare collision degrades to "updates the
    // most recent match" instead of throwing and dropping the webhook.
    const { data: matches, error: fetchError } = await supabase
      .from("submissions")
      .select("id, data")
      .eq("reference_id", orderNo)
      .order("created_at", { ascending: false })
      .limit(1);

    const existing = matches?.[0];
    if (fetchError || !existing) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from("submissions")
      .update({ data: { ...(existing.data ?? {}), transactionStatus } })
      .eq("id", existing.id);

    if (updateError) {
      console.error("paymentCallBack update error:", updateError.message);
      return NextResponse.json({ error: "Failed to update transaction status." }, { status: 500 });
    }

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API /paymentCallBack error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
