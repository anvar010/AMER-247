import { NextRequest, NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, HUB_ADMIN_RECIPIENTS } from "@/lib/mailer";
import { buildApplicationEmail } from "@/lib/applicationEmail";
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

    const supabase = getSupabaseAdmin();
    // reference_id isn't guaranteed unique (see lib/saveSubmission.ts — it's
    // client-generated with a small random range, so two different
    // applicants can coincidentally collide) — .limit(1) + newest-first
    // instead of .single() means a rare collision degrades to "emails the
    // most recent match" instead of throwing and losing the notification.
    const { data: matches, error: fetchError } = await supabase
      .from("submissions")
      .select("*")
      .eq("reference_id", referenceId)
      .order("created_at", { ascending: false })
      .limit(1);

    const row = matches?.[0];
    if (fetchError || !row) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    // Idempotent — /payment-status can legitimately re-run this effect (a
    // page reload, a user hitting back/forward) and must never double-email
    // an admin inbox for the same payment.
    if (row.data?.emailSent) {
      return NextResponse.json({ success: true, alreadySent: true }, { status: 200 });
    }

    const recipients = HUB_ADMIN_RECIPIENTS[row.hub ?? ""];
    if (!recipients) {
      return NextResponse.json({ error: `Unknown hub: ${row.hub}` }, { status: 400 });
    }
    if (!row.email) {
      return NextResponse.json({ error: "Submission has no email." }, { status: 400 });
    }

    // Mark the payment itself confirmed BEFORE attempting to email — this is
    // ground truth from Mettpay's own redirect (st=1), and must never stay
    // stuck at "pending" just because a mail-provider hiccup throws below.
    // `emailSent` stays false until the sends actually succeed, so a retry
    // of this same call will still attempt (and can still send) the emails.
    await supabase
      .from("submissions")
      .update({ data: { ...(row.data ?? {}), transactionStatus: "success" } })
      .eq("id", row.id);

    assertMailConfigured();

    const { subject, adminHtml, customerHtml } = buildApplicationEmail({
      hub: row.hub,
      service: row.data?.service ?? null,
      reference_id: row.reference_id,
      applicant_name: row.applicant_name,
      email: row.email,
      phone: row.phone,
      data: row.data ?? {},
    });

    const attachments: Attachment[] = [];
    for (const path of row.file_paths ?? []) {
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

    await mailer.sendMail({
      from: MAIL_FROM,
      to: recipients,
      replyTo: row.email,
      subject,
      attachments,
      html: adminHtml,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: row.email,
      subject,
      attachments,
      html: customerHtml,
    });

    await supabase
      .from("submissions")
      .update({ data: { ...(row.data ?? {}), transactionStatus: "success", emailSent: true } })
      .eq("id", row.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API /send-application-email error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
