import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, HUB_ADMIN_RECIPIENTS, notifySystemError } from "@/lib/mailer";
import { buildApplicationEmail } from "@/lib/applicationEmail";
import { updatePayableSubmission, payableRowToEmailInput, type PayableRow } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isValidEmail } from "@/lib/sanitize";
import { makeDocsLink } from "@/lib/fileLinks";

const BUCKET = "submission-files";

// SendGrid hard-rejects any message over 30MB total (550 "max message size
// exceeded") — and that's the size AFTER MIME/base64 encoding, which adds
// ~37% on top of the raw attachment bytes. Capping the raw total here at
// 20MB keeps the encoded size (~27.4MB) safely under that with room for
// headers/HTML, instead of only discovering the problem when SendGrid
// rejects a large multi-document submission (e.g. AMR-740300, 14 files /
// ~23MB raw — ~31.5MB encoded, just over the limit).
const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const SIGNED_URL_TTL_SECONDS = 7 * 24 * 60 * 60;

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
  // The email-format check catches old rows saved before the client/server
  // validation fix (e.g. an Emirates ID number typed into the email field)
  // — nodemailer can't build an envelope from those and throws "No
  // recipients defined" deep inside sendMail, which used to reach here as
  // an uncaught-looking error alert instead of this clean, expected skip.
  if (!recipients || !emailInput.email || !isValidEmail(emailInput.email)) {
    console.error(`notifyPaymentStage: cannot email for ${row.table}/${row.reference_id} — missing recipients or invalid email (${emailInput.email ?? "none"}).`);
    return;
  }

  try {
    assertMailConfigured();

    let { subject, adminHtml, customerHtml } = buildApplicationEmail(emailInput, {
      stage,
      initiatedAt: row.created_at as string,
      pendingAt: (row.pending_at as string | null) ?? null,
      successAt: (row.success_at as string | null) ?? null,
      mettpayOrderId: (row.mettpay_order_id as string | null) ?? null,
      mettpayTxnId: (row.mettpay_txn_id as string | null) ?? null,
    });

    let attachments: Attachment[] = [];
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

    const totalAttachmentBytes = attachments.reduce((sum, a) => sum + (a.content as Buffer).length, 0);
    if (totalAttachmentBytes > MAX_ATTACHMENT_BYTES) {
      console.error(
        `notifyPaymentStage: dropping ${attachments.length} attachments for ${row.table}/${row.reference_id} ` +
        `— ${(totalAttachmentBytes / 1024 / 1024).toFixed(1)}MB exceeds the ${MAX_ATTACHMENT_BYTES / 1024 / 1024}MB cap.`
      );
      const docsLink = makeDocsLink(row.table, String(row.reference_id), SIGNED_URL_TTL_SECONDS);
      const note =
        `<p><strong>Note:</strong> ${attachments.length} uploaded document(s) were too large to attach to this email (reference ${row.reference_id}).</p>` +
        `<p><a href="${docsLink}"><strong>View all documents</strong></a> (link valid for 7 days)</p>`;
      adminHtml = note + adminHtml;
      attachments = [];
    }

    await mailer.sendMail({
      from: MAIL_FROM,
      to: recipients,
      replyTo: emailInput.email,
      subject,
      attachments,
      html: adminHtml,
    });
    await mailer.sendMail({ from: MAIL_FROM, to: emailInput.email, subject, attachments, html: customerHtml });

    await updatePayableSubmission(row, { [guardField]: true });
    console.log(`notifyPaymentStage: ${stage} email sent for ${row.table}/${row.reference_id}`);
  } catch (error) {
    console.error(`notifyPaymentStage: failed to send ${stage} email for ${row.table}/${row.reference_id}:`, error);
    await notifySystemError(`notifyPaymentStage (${stage}) — ${row.table}/${row.reference_id}`, error);
  }
}
