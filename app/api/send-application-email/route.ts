import { NextRequest, NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, HUB_ADMIN_RECIPIENTS } from "@/lib/mailer";
import { buildApplicationEmail } from "@/lib/applicationEmail";
import { findPayableSubmission, updatePayableSubmission, payableRowToEmailInput } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const BUCKET = "submission-files";

// Triggered client-side from /payment-status once Mettpay redirects back
// with st=1 — this is what actually sends the admin/customer emails for
// every application that went through a payment step, since /api/apply
// deliberately skipped sending them (see `deferEmail` there).
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

    // Idempotent — /payment-status can legitimately re-run this effect (a
    // page reload, a user hitting back/forward) and must never double-email
    // an admin inbox for the same payment.
    if (row.email_sent) {
      return NextResponse.json({ success: true, alreadySent: true }, { status: 200 });
    }

    const emailInput = payableRowToEmailInput(row);
    const recipients = HUB_ADMIN_RECIPIENTS[emailInput.hub];
    if (!recipients) {
      return NextResponse.json({ error: `Unknown hub: ${emailInput.hub}` }, { status: 400 });
    }
    if (!emailInput.email) {
      return NextResponse.json({ error: "Submission has no email." }, { status: 400 });
    }

    // Mark the payment itself confirmed BEFORE attempting to email — this is
    // ground truth from Mettpay's own redirect (st=1), and must never stay
    // stuck at "pending" just because a mail-provider hiccup throws below.
    // `email_sent` stays false until the sends actually succeed, so a retry
    // of this same call will still attempt (and can still send) the emails.
    await updatePayableSubmission(row, { transaction_status: "success" });

    assertMailConfigured();

    const { subject, adminHtml, customerHtml } = buildApplicationEmail(emailInput);

    const attachments: Attachment[] = [];
    const filePaths = (row.file_paths as string[] | undefined) ?? [];
    if (filePaths.length) {
      const supabase = getSupabaseAdmin();
      for (const path of filePaths) {
        const { data: file, error: downloadError } = await supabase.storage.from(BUCKET).download(path);
        if (downloadError || !file) {
          console.error(`send-application-email: failed to download ${path}:`, downloadError?.message);
          continue;
        }
        attachments.push({
          filename: path.split("/").pop() ?? path,
          content: Buffer.from(await file.arrayBuffer()),
        });
      }
    }

    await mailer.sendMail({
      from: MAIL_FROM,
      to: recipients,
      replyTo: emailInput.email,
      subject,
      attachments,
      html: adminHtml,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: emailInput.email,
      subject,
      attachments,
      html: customerHtml,
    });

    await updatePayableSubmission(row, { transaction_status: "success", email_sent: true });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API /send-application-email error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
