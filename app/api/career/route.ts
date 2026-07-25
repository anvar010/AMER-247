import { NextRequest, NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import { mailer, assertMailConfigured, MAIL_FROM, CAREER_ADMIN_RECIPIENTS, escapeHtml } from "@/lib/mailer";
import { saveCareerApplication } from "@/lib/db";

export const runtime = "nodejs";

async function fileToAttachment(file: File): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return { filename: file.name, content: buffer, contentType: file.type };
}

export async function POST(req: NextRequest) {
  try {
    assertMailConfigured();

    const form = await req.formData();
    const field = (key: string) => String(form.get(key) ?? "");

    const fullName = field("fullName");
    const email = field("email");
    const phone = field("phone");
    const location = field("location");
    const nationality = field("nationality");
    const experience = field("experience");
    const skills = field("skills");

    const required = { fullName, email, phone, location, nationality, experience, skills };
    for (const [key, value] of Object.entries(required)) {
      if (!value) return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }

    const uploadedFiles = form.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);
    const attachments: Attachment[] = [];
    for (const value of uploadedFiles) {
      attachments.push(await fileToAttachment(value));
    }

    const safe = {
      fullName: escapeHtml(fullName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      location: escapeHtml(location),
      nationality: escapeHtml(nationality),
      experience: escapeHtml(experience),
      skills: escapeHtml(skills),
    };

    const subject = `Career Application - ${safe.fullName}`;
    const html = `
      <b>Full Name:</b> ${safe.fullName}<br/><br/>
      <b>Email:</b> ${safe.email}<br/><br/>
      <b>Phone:</b> ${safe.phone}<br/><br/>
      <b>Current Location:</b> ${safe.location}<br/><br/>
      <b>Nationality:</b> ${safe.nationality}<br/><br/>
      <b>Experience:</b> ${safe.experience}<br/><br/>
      <b>Key Skills:</b> ${safe.skills}<br/><br/>
    `;

    // Persist FIRST — never throws, so a mail-provider outage can't lose the
    // submission entirely.
    await saveCareerApplication({
      fullName,
      email,
      phone,
      location,
      nationality,
      experience,
      skills,
      files: uploadedFiles,
    });

    await mailer.sendMail({
      from: MAIL_FROM,
      to: CAREER_ADMIN_RECIPIENTS,
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
      html: `Thanks for applying — our team will review your application and get back to you:<br/><br/>${html}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API /career error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
