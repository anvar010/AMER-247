import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, HUB_ADMIN_RECIPIENTS } from "@/lib/mailer";
import { buildApplicationEmail } from "@/lib/applicationEmail";
import { updatePayableSubmission, payableRowToEmailInput, type PayableRow } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = "submission-files";

// Shared by every path that can reach a "pending" or "success" payment
// stage — create-payment (Mettpay accepted the order), paymentCallBack
// (Mettpay's webhook), and send-application-email (the /payment-status
// redirect fallback) — so the email/attachment logic and duplicate-send
// guard live in one place instead of three. Each stage has its own
// idempotency flag (pending_email_sent / email_sent) so re-triggering the
// same stage twice never double-emails.
export async function notifyPaymentStage(row: PayableRow, stage: "pending" | "success"): Promise<void> {
  const guardField = stage === "pending" ? "pending_email_sent" : "email_sent";
  if (row[guardField]) return;

  const emailInput = payableRowToEmailInput(row);
  const recipients = HUB_ADMIN_RECIPIENTS[emailInput.hub];
  if (!recipients || !emailInput.email) {
    console.error(`notifyPaymentStage: cannot email for ${row.table}/${row.reference_id} — missing recipients or email.`);
    return;
  }

  try {
    assertMailConfigured();

    const { subject, adminHtml, customerHtml } = buildApplicationEmail(emailInput, {
      stage,
      initiatedAt: row.created_at as string,
      pendingAt: (row.pending_at as string | null) ?? null,
      successAt: (row.success_at as string | null) ?? null,
      mettpayOrderId: (row.mettpay_order_id as string | null) ?? null,
      mettpayTxnId: (row.mettpay_txn_id as string | null) ?? null,
    });

    const attachments: Attachment[] = [];
    const filePaths = (row.file_paths as string[] | undefined) ?? [];
    if (filePaths.length) {
      const supabase = getSupabaseAdmin();
      for (const path of filePaths) {
        const { data: file, error } = await supabase.storage.from(BUCKET).download(path);
        if (error || !file) {
          console.error(`notifyPaymentStage: failed to download ${path}:`, error?.message);
          continue;
        }
        attachments.push({ filename: path.split("/").pop() ?? path, content: Buffer.from(await file.arrayBuffer()) });
      }
    }

    await mailer.sendMail({ from: MAIL_FROM, to: recipients, replyTo: emailInput.email, subject, attachments, html: adminHtml });
    await mailer.sendMail({ from: MAIL_FROM, to: emailInput.email, subject, attachments, html: customerHtml });

    await updatePayableSubmission(row, { [guardField]: true });
    console.log(`notifyPaymentStage: ${stage} email sent for ${row.table}/${row.reference_id}`);
  } catch (error) {
    console.error(`notifyPaymentStage: failed to send ${stage} email for ${row.table}/${row.reference_id}:`, error);
  }
}
