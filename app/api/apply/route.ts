import { NextRequest, NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, HUB_ADMIN_RECIPIENTS, escapeHtml } from "@/lib/mailer";
import { saveSubmission } from "@/lib/saveSubmission";

export const runtime = "nodejs";

async function fileToAttachment(file: File): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return { filename: file.name, content: buffer, contentType: file.type };
}

export async function POST(req: NextRequest) {
  try {
    assertMailConfigured();

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

    const uploadedFiles = form.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);
    const attachments: Attachment[] = [];
    for (const value of uploadedFiles) {
      attachments.push(await fileToAttachment(value));
    }

    const rows: [string, string][] = [
      ["Service", service],
      ["Reference ID", referenceID],
      ["Name", applicantName],
    ];
    if (field("sponsorName")) rows.push(["Sponsor Name", field("sponsorName")]);
    rows.push(["Email", email]);
    if (field("mobileNo")) rows.push(["Mobile No", field("mobileNo")]);
    if (field("whatsappNo")) rows.push(["WhatsApp No", field("whatsappNo")]);
    if (field("applicationPriority")) rows.push(["Application Priority", field("applicationPriority")]);
    if (field("applicationType")) rows.push(["Application Type", field("applicationType")]);
    if (field("insideOrOutside")) rows.push(["Inside/Outside UAE", field("insideOrOutside")]);
    if (field("emirates")) rows.push(["Emirates", field("emirates")]);
    if (field("nationality")) rows.push(["Nationality", field("nationality")]);
    if (field("travelDate")) rows.push(["Date of Travel", field("travelDate")]);
    if (field("address")) rows.push(["Address", field("address")]);
    if (field("comment")) rows.push(["Comment", field("comment")]);
    if (field("passengers")) rows.push(["Passengers", field("passengers")]);

    const html = rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(v)}<br/><br/>`)
      .join("");

    const subject = `Application for ${service} - ${referenceID} - ${applicantName}`;

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
      data: {
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
      },
      files: uploadedFiles,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: recipients,
      replyTo: email,
      subject,
      attachments,
      html,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: email,
      subject,
      attachments,
      html: `Our support team will contact you:<br/>${html}`,
    });

    return NextResponse.json({ success: true, referenceID }, { status: 200 });
  } catch (error) {
    console.error("API /apply error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
