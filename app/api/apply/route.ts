import { NextRequest, NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, HUB_ADMIN_RECIPIENTS } from "@/lib/mailer";
import { saveSubmission } from "@/lib/saveSubmission";
import { buildApplicationEmail } from "@/lib/applicationEmail";

export const runtime = "nodejs";

async function fileToAttachment(file: File): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return { filename: file.name, content: buffer, contentType: file.type };
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const hub = String(form.get("hub") ?? "");
    const recipients = HUB_ADMIN_RECIPIENTS[hub];
    if (!recipients) {
      return NextResponse.json({ error: `Unknown hub: ${hub}` }, { status: 400 });
    }

    const field = (key: string) => String(form.get(key) ?? "");
    const email = field("email");
    if (!email) {
      return NextResponse.json({ error: "Missing email." }, { status: 400 });
    }

    const service = field("service");
    const referenceID = field("referenceID");
    const applicantName = field("applicantName");
    // Set by ApplicationForm/TouristVisaForm when the item has a real price
    // — payment happens next, so the notification emails wait for
    // /api/send-application-email (triggered by /payment-status on
    // success) instead of going out for an application that might never
    // get paid for.
    const deferEmail = field("deferEmail") === "1";

    const uploadedFiles = form.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);

    // Tourist Visa sends these as JSON arrays (real adults/children objects,
    // not just the flattened "passengers" display string used in the email
    // below) — parsed here so the DB copy stays structured/queryable.
    function parseJsonArray(key: string): unknown[] | undefined {
      const raw = field(key);
      if (!raw) return undefined;
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : undefined;
      } catch {
        return undefined;
      }
    }

    const data = {
      service,
      sponsorName: field("sponsorName"),
      whatsappNo: field("whatsappNo"),
      applicationPriority: field("applicationPriority"),
      applicationType: field("applicationType"),
      insideOrOutside: field("insideOrOutside"),
      emirates: field("emirates"),
      nationality: field("nationality"),
      travelDate: field("travelDate"),
      address: field("address"),
      comment: field("comment"),
      passengers: field("passengers"),
      adults: parseJsonArray("adults"),
      children: parseJsonArray("children"),
      ...(deferEmail ? { transactionStatus: "pending" } : {}),
    };

    // Persist FIRST — saveSubmission never throws, and running it before the
    // emails means a mail-provider outage can't lose the submission entirely
    // (previously the throw from sendMail skipped the save).
    await saveSubmission({
      formType: "apply",
      hub,
      referenceId: referenceID,
      applicantName,
      email,
      phone: field("mobileNo"),
      data,
      files: uploadedFiles,
    });

    if (!deferEmail) {
      assertMailConfigured();

      const { subject, adminHtml, customerHtml } = buildApplicationEmail({
        hub,
        service,
        reference_id: referenceID,
        applicant_name: applicantName,
        email,
        phone: field("mobileNo"),
        data,
      });

      const attachments: Attachment[] = [];
      for (const value of uploadedFiles) {
        attachments.push(await fileToAttachment(value));
      }

      await mailer.sendMail({
        from: MAIL_FROM,
        to: recipients,
        replyTo: email,
        subject,
        attachments,
        html: adminHtml,
      });

      await mailer.sendMail({
        from: MAIL_FROM,
        to: email,
        subject,
        attachments,
        html: customerHtml,
      });
    }

    return NextResponse.json({ success: true, referenceID }, { status: 200 });
  } catch (error) {
    console.error("API /apply error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
