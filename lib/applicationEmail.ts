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

function formatTimestamp(iso?: string | null): string {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 19).replace("T", " ");
}

export type PaymentStageInfo = {
  stage: "pending" | "success";
  initiatedAt: string;
  pendingAt?: string | null;
  successAt?: string | null;
};

export function buildApplicationEmail(
  row: SubmissionRowForEmail,
  payment?: PaymentStageInfo
): {
  subject: string;
  adminHtml: string;
  customerHtml: string;
} {
  const referenceId = row.reference_id ?? "";
  const applicantName = row.applicant_name ?? "";
  const email = row.email ?? "";
  const data = row.data ?? {};

  // Only one status line (whatever the current stage is) plus a timestamp
  // per stage actually reached so far.
  const paymentRows: [string, string][] = payment
    ? ([
        ["Payment Status", payment.stage.toUpperCase()],
        payment.pendingAt ? ["Pending", formatTimestamp(payment.pendingAt)] : null,
        payment.successAt ? ["Success", formatTimestamp(payment.successAt)] : null,
      ].filter((r): r is [string, string] => r !== null))
    : [];

  if (row.hub === "Pay Online") {
    const isPending = payment?.stage === "pending";
    const rows: [string, string][] = [
      ...paymentRows,
      ["Name", applicantName],
      ["Email", email],
      ["Mobile No", row.phone ?? ""],
      ["Reference No", referenceId],
      ["Amount (AED)", str(data.amount)],
      ["Application Reference", str(data.applicationReference)],
      ["Comments", str(data.comments)],
    ].filter(([, v]) => v) as [string, string][];

    return {
      subject: `${isPending ? "Payment Pending" : "Payment Received"} - Amer ${referenceId} - ${str(data.amount)}`,
      adminHtml: renderBrandedEmail({
        title: isPending ? "Payment Pending" : "Payment Received",
        heroEmoji: isPending ? "⏳" : "💳",
        heroSubtitle: isPending ? "A new online payment has been initiated." : "A new online payment has been submitted.",
        intro: isPending
          ? "A payment was just started with the following details:"
          : "A payment was just submitted with the following details:",
        rows,
      }),
      customerHtml: renderBrandedEmail({
        title: isPending ? "Payment Pending" : "Payment Received",
        heroEmoji: isPending ? "⏳" : "💳",
        heroSubtitle: isPending ? "We're processing your payment." : "We've received your payment details.",
        greetingName: applicantName,
        intro: isPending
          ? "Your payment is being processed. We'll email you again once it's confirmed."
          : "Our support team will contact you. Here are your details:",
        rows,
      }),
    };
  }

  const service = row.service ?? "";
  const rows: [string, string][] = [
    ...paymentRows,
    ["Service", service],
    ["Reference ID", referenceId],
    ["Name", applicantName],
  ];
  if (data.amount) rows.push(["Amount (AED)", str(data.amount)]);
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
