import { renderBrandedEmail } from "@/lib/emailTemplate";

// Shared by /api/apply (sends immediately for unpriced items) and
// /api/send-application-email (sends after Mettpay confirms payment) so both
// paths build the exact same subject/content from the exact same
// submissions row shape — one place to change the email, not two.
export type SubmissionRowForEmail = {
  hub: string | null;
  service: string | null;
  reference_id: string | null;
  applicant_name: string | null;
  email: string | null;
  phone: string | null;
  data: Record<string, unknown>;
};

function str(v: unknown): string {
  return v == null ? "" : String(v);
}

export function buildApplicationEmail(row: SubmissionRowForEmail): {
  subject: string;
  adminHtml: string;
  customerHtml: string;
} {
  const referenceId = row.reference_id ?? "";
  const applicantName = row.applicant_name ?? "";
  const email = row.email ?? "";
  const data = row.data ?? {};

  if (row.hub === "Pay Online") {
    const rows: [string, string][] = [
      ["Name", applicantName],
      ["Email", email],
      ["Mobile No", row.phone ?? ""],
      ["Reference No", referenceId],
      ["Amount (AED)", str(data.amount)],
      ["Application Reference", str(data.applicationReference)],
      ["Comments", str(data.comments)],
    ].filter(([, v]) => v) as [string, string][];

    return {
      subject: `Payment Received - Amer ${referenceId} - ${str(data.amount)}`,
      adminHtml: renderBrandedEmail({
        title: "Payment Received",
        heroEmoji: "💳",
        heroSubtitle: "A new online payment has been submitted.",
        intro: "A payment was just submitted with the following details:",
        rows,
      }),
      customerHtml: renderBrandedEmail({
        title: "Payment Received",
        heroEmoji: "💳",
        heroSubtitle: "We've received your payment details.",
        greetingName: applicantName,
        intro: "Our support team will contact you. Here are your details:",
        rows,
      }),
    };
  }

  const service = row.service ?? "";
  const rows: [string, string][] = [
    ["Service", service],
    ["Reference ID", referenceId],
    ["Name", applicantName],
  ];
  if (data.sponsorName) rows.push(["Sponsor Name", str(data.sponsorName)]);
  rows.push(["Email", email]);
  if (row.phone) rows.push(["Mobile No", row.phone]);
  if (data.whatsappNo) rows.push(["WhatsApp No", str(data.whatsappNo)]);
  if (data.applicationPriority) rows.push(["Application Priority", str(data.applicationPriority)]);
  if (data.applicationType) rows.push(["Application Type", str(data.applicationType)]);
  if (data.insideOrOutside) rows.push(["Inside/Outside UAE", str(data.insideOrOutside)]);
  if (data.emirates) rows.push(["Emirates", str(data.emirates)]);
  if (data.nationality) rows.push(["Nationality", str(data.nationality)]);
  if (data.travelDate) rows.push(["Date of Travel", str(data.travelDate)]);
  if (data.address) rows.push(["Address", str(data.address)]);
  if (data.comment) rows.push(["Comment", str(data.comment)]);
  if (data.passengers) rows.push(["Passengers", str(data.passengers)]);

  const subject = `Application for ${service} - ${referenceId} - ${applicantName}`;

  return {
    subject,
    adminHtml: renderBrandedEmail({
      title: "New Application Received",
      heroEmoji: "📨",
      heroSubtitle: "A new application has been submitted and needs review.",
      intro: "A new application was just submitted with the following details:",
      rows,
    }),
    customerHtml: renderBrandedEmail({
      title: "Application Submitted",
      heroEmoji: "📨",
      heroSubtitle: "We've received your application and it's being processed.",
      greetingName: applicantName,
      intro: "We have received your application and our support team will contact you soon:",
      rows,
    }),
  };
}
