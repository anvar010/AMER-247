import { NextRequest, NextResponse } from "next/server";
import { mailer, assertMailConfigured, MAIL_FROM, CONTACT_ADMIN_RECIPIENTS, escapeHtml } from "@/lib/mailer";
import { saveSubmission } from "@/lib/saveSubmission";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    assertMailConfigured();

    const body = await req.json();
    const { name, email, phone, reason, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      reason?: string;
      message?: string;
    };

    if (!name || !email || !phone || !reason || !message) {
      return NextResponse.json({ error: "Missing required field." }, { status: 400 });
    }

    const fullName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeReason = escapeHtml(reason);
    const safeMessage = escapeHtml(message);

    const html = `
      <b>Name:</b> ${fullName}<br/><br/>
      <b>Email:</b> ${safeEmail}<br/><br/>
      <b>Mobile No:</b> ${safePhone}<br/><br/>
      <b>Reason:</b> ${safeReason}<br/><br/>
      <b>Message:</b> ${safeMessage}<br/><br/>
    `;

    // Persist FIRST — saveSubmission never throws, so a mail-provider outage
    // can't lose the submission entirely.
    await saveSubmission({
      formType: "contact",
      applicantName: name,
      email,
      phone,
      data: { reason, message },
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: CONTACT_ADMIN_RECIPIENTS,
      replyTo: email,
      subject: `Amer Contact Form for ${safeReason}`,
      html: `Contacted us:<br/>${html}`,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: `Amer Contact Form for ${safeReason}`,
      html: `Our support team will contact you:<br/>${html}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API /contact error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
