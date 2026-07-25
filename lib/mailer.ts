import nodemailer from "nodemailer";

const FROM = process.env.MAIL_FROM ?? "noreply@amer247.com";

export const mailer = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_KEY,
  },
});

export function assertMailConfigured() {
  if (!process.env.SENDGRID_KEY) {
    throw new Error("Missing SENDGRID_KEY in environment variables.");
  }
}

export const MAIL_FROM = FROM;

export const escapeHtml = (str: string) =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");


// Same recipients as the master project's per-hub mail routes
// (newAmerServiceMail / newEmiratesIDMail / newGoldenVisaMail /
// newMedicalTestMail share one identical list; newTouristVisaMail and
// payOnlineMail each have their own).
const AMER_STYLE_RECIPIENTS = [
  "applyonline@amer247.com",
  "online@amer247.online",
  "amerapplications@gmail.com",
  "online.amer247@gmail.com",
];

export const HUB_ADMIN_RECIPIENTS: Record<string, string[]> = {
  "AMER Services": AMER_STYLE_RECIPIENTS,
  "Amer Services": AMER_STYLE_RECIPIENTS,
  "Emirates ID": AMER_STYLE_RECIPIENTS,
  "Golden Visa": AMER_STYLE_RECIPIENTS,
  "Medical Test": AMER_STYLE_RECIPIENTS,
  // No dedicated Insurance mail route exists in master — using the same
  // Amer-Services-style list as the closest real equivalent.
  "Insurance": AMER_STYLE_RECIPIENTS,
  "Tourist Visa": [
    "amerapplications@gmail.com",
    "Shameel@amer247.com",
    "amertouristvisas@gmail.com",
    "mettinformation@gmail.com",
    "nisar@amer247.com",
    "accounts@mettholidays.ae",
  ],
  "Pay Online": [
    "amertouristvisas@gmail.com",
    "mettinformation@gmail.com",
    "nisar@amer247.com",
    "accounts@mettholidays.ae",
    "online@amer247.online",
    "online.amer247@gmail.com",
  ],
};

// Matches master's sendMail route (the general Amer contact form).
export const CONTACT_ADMIN_RECIPIENTS = ["info@amer247.com"];
// No CAREER_ADMIN_RECIPIENTS — master's CareerForm doesn't send an admin
// email at all (its handleSubmit doesn't even save the application, just
// redirects). /api/career only emails the applicant a confirmation now;
// no one gets notified admin-side.
