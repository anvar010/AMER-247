import { NextRequest, NextResponse } from "next/server";
import { mailer, assertMailConfigured, MAIL_FROM, escapeHtml } from "@/lib/mailer";
import { saveSubmission } from "@/lib/saveSubmission";

export const runtime = "nodejs";

// TEMP TEST OVERRIDE — redirected to a single test inbox, see lib/mailer.ts.
const DET247_ADMIN_RECIPIENTS = ["anvarshaknavas588@gmail.com"];

export async function POST(req: NextRequest) {
  try {
    assertMailConfigured();

    const body = await req.json();
    const {
      fullName, mobile, email, nationality, location,
      preferredContact, serviceRequired, otherService,
    } = body as Record<string, string>;

    const required = { fullName, mobile, email, nationality, location, preferredContact, serviceRequired };
    for (const [key, value] of Object.entries(required)) {
      if (!value) return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
    if (serviceRequired === "Other" && !otherService) {
      return NextResponse.json({ error: "Missing field: otherService" }, { status: 400 });
    }

    const safe = {
      fullName: escapeHtml(fullName),
      mobile: escapeHtml(mobile),
      email: escapeHtml(email),
      nationality: escapeHtml(nationality),
      location: escapeHtml(location),
      preferredContact: escapeHtml(preferredContact),
      serviceRequired: escapeHtml(serviceRequired),
      otherService: escapeHtml(otherService ?? ""),
    };

    const subject = `DET247 Enquiry - ${safe.serviceRequired} - ${safe.fullName}`;
    const html = `
      <h3>New Contact Form Submission</h3>
      <b>Full Name:</b> ${safe.fullName}<br/><br/>
      <b>Mobile:</b> ${safe.mobile}<br/><br/>
      <b>Email:</b> ${safe.email}<br/><br/>
      <b>Nationality:</b> ${safe.nationality}<br/><br/>
      <b>Current Location:</b> ${safe.location}<br/><br/>
      <b>Preferred Contact Method:</b> ${safe.preferredContact}<br/><br/>
      <b>Service Required:</b> ${safe.serviceRequired}<br/><br/>
      ${serviceRequired === "Other" ? `<b>Other Service:</b> ${safe.otherService}<br/><br/>` : ""}
    `;

    // Persist FIRST — saveSubmission never throws, so a mail-provider outage
    // can't lose the submission entirely.
    await saveSubmission({
      formType: "det247",
      applicantName: fullName,
      email,
      phone: mobile,
      data: { nationality, location, preferredContact, serviceRequired, otherService },
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: DET247_ADMIN_RECIPIENTS,
      replyTo: email,
      subject,
      html,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: "We received your request | DET247",
      html: `
        Hi ${safe.fullName},<br/><br/>
        Thanks for contacting us. Our team will reach you shortly via <b>${safe.preferredContact}</b>.<br/><br/>
        <b>Service Requested:</b> ${safe.serviceRequired}${serviceRequired === "Other" ? ` (${safe.otherService})` : ""}<br/><br/>
        Regards,<br/>
        DET247.
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API /det247-contact error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
