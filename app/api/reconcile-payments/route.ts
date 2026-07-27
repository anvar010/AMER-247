import { NextRequest, NextResponse } from "next/server";
import { getMettpayOrderDetails, METTPAY_SUCCESS_STATUSES } from "@/lib/mettpay";
import { getSupabaseAdmin } from "@/lib/supabase";
import { updatePayableSubmission, PAYABLE_TABLES, type PayableRow } from "@/lib/db";
import { notifyPaymentStage } from "@/lib/paymentNotify";

export const runtime = "nodejs";

// Meant to be called on a schedule (Render Cron Job) rather than triggered
// by any page — this is the reconciliation safety net for when Mettpay's
// webhook either isn't configured or hasn't fired yet: actively asks Mettpay
// for the real status of every order still stuck at "pending", instead of
// waiting to be told.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.RECONCILE_SECRET || secret !== process.env.RECONCILE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const results: Record<string, string> = {};

  for (const table of PAYABLE_TABLES) {
    const { data: pendingRows, error } = await supabase
      .from(table)
      .select("*")
      .eq("transaction_status", "pending");

    if (error) {
      console.error(`reconcile-payments: failed to read ${table}:`, error.message);
      continue;
    }

    for (const raw of pendingRows ?? []) {
      const row = raw as Record<string, unknown>;
      const referenceId = row.reference_id as string;

      try {
        const details = await getMettpayOrderDetails(referenceId);
        if (!details) {
          results[referenceId] = "no response from Mettpay";
          continue;
        }

        const status = String(details.status ?? "");
        if (!METTPAY_SUCCESS_STATUSES.has(status)) {
          results[referenceId] = `still ${status || "unknown"}`;
          continue;
        }

        const successAt = new Date().toISOString();
        const payableRow = { ...row, table } as PayableRow;
        await updatePayableSubmission(payableRow, {
          transaction_status: "success",
          success_at: successAt,
          ...(details.unique_order_id ? { mettpay_order_id: String(details.unique_order_id) } : {}),
        });
        await notifyPaymentStage({ ...payableRow, success_at: successAt }, "success");
        results[referenceId] = `FIXED (Mettpay says ${status})`;
      } catch (error) {
        results[referenceId] = `error: ${error instanceof Error ? error.message : String(error)}`;
      }
    }
  }

  console.log("reconcile-payments run:", JSON.stringify(results));
  return NextResponse.json({ checked: Object.keys(results).length, results });
}
