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


const TEST_RECIPIENT = "anvarshaknavas588@gmail.com";


export const HUB_ADMIN_RECIPIENTS: Record<string, string[]> = {
  "AMER Services": [TEST_RECIPIENT],
  "Amer Services": [TEST_RECIPIENT],
  "Emirates ID": [TEST_RECIPIENT],
  "Golden Visa": [TEST_RECIPIENT],
  "Medical Test": [TEST_RECIPIENT],
  "Insurance": [TEST_RECIPIENT],
  "Tourist Visa": [TEST_RECIPIENT],
  "Pay Online": [TEST_RECIPIENT],
};

export const CONTACT_ADMIN_RECIPIENTS = [TEST_RECIPIENT];
export const CAREER_ADMIN_RECIPIENTS = [TEST_RECIPIENT];
