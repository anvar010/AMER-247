import { escapeHtml } from "@/lib/mailer";

// Visual chrome lifted from the real app's own branded template
// (247APP/amer-247-expo/supabase/functions/_shared/email-templates.ts, "02 ·
// Application Submitted") — same hero image/logo, colors, and footer, so
// these emails look like they come from the same product. Only the content
// area is ours: a variable-length details table instead of that template's
// fixed 4-row layout, since our field list varies per hub/service.
const EMAIL_ASSETS = "https://elxualivstmbhxgkwtfc.supabase.co/storage/v1/object/public/email-assets";
const PHONE = "+971 4 2300500";
const SUPPORT_EMAILS = ["applyonline@amer247.com", "online@amer247.online"];
const PRIVACY_URL = "https://amer247.com/privacy-policy";
const TERMS_URL = "https://amer247.com/terms-conditions";

function detailRows(rows: [string, string][]): string {
  return rows
    .map(
      ([label, value], i) => `
            <tr>
              <td style="font-family:'Outfit',Arial,sans-serif; font-size:12px; color:#6B7687; padding:6px 0; text-transform:uppercase; letter-spacing:0.5px; vertical-align:top;" width="40%">${escapeHtml(label)}</td>
              <td style="font-family:'Outfit',Arial,sans-serif; font-size:15px; color:#262626; padding:6px 0;">${escapeHtml(value)}</td>
            </tr>${i < rows.length - 1 ? `
            <tr><td colspan="2" style="border-bottom:1px solid #E9EDF4; padding:0; height:1px;"></td></tr>` : ""}`
    )
    .join("");
}

export function renderBrandedEmail({
  title,
  heroEmoji,
  heroSubtitle,
  greetingName,
  intro,
  rows,
}: {
  title: string;
  heroEmoji: string;
  heroSubtitle: string;
  greetingName?: string;
  intro: string;
  rows: [string, string][];
}): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${escapeHtml(title)} — Amer 24/7</title>
  <style>
    :root { color-scheme: light only; }
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
    body { margin:0; padding:0; width:100% !important; background-color:#EEF1F7; font-family:'Outfit',Arial,Helvetica,sans-serif; }
    @media only screen and (max-width:620px) {
      .hero-overlay { padding:36px 24px 32px !important; }
      .hero-title { font-size:22px !important; }
      .content-section { padding:28px 24px 24px !important; }
      .footer-section { padding:24px 20px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#EEF1F7;">
  <div style="width:100%; background-color:#EEF1F7; padding:32px 16px;">
    <div style="max-width:600px; margin:0 auto; background-color:#FFFFFF; border-radius:18px; overflow:hidden; box-shadow:0 8px 40px rgba(68,16,16,0.10);">
      <div style="background-color:#2A1008; background-image:url('${EMAIL_ASSETS}/dubai.jpg'); background-position:center center; background-repeat:no-repeat; background-size:cover;">
        <div class="hero-overlay" style="background:linear-gradient(180deg,rgba(26,10,5,0.82) 0%,rgba(74,24,8,0.90) 50%,rgba(18,8,4,0.95) 100%); padding:32px 40px 28px; text-align:center;">
          <img src="${EMAIL_ASSETS}/amer247.png" alt="Amer 24/7" style="width:160px; height:auto; margin-bottom:10px;">
          <div style="width:48px; height:48px; border-radius:50%; background:rgba(27,163,156,0.20); border:2px solid rgba(27,163,156,0.40); margin:0 auto 10px; line-height:48px; text-align:center;"><span style="font-size:22px;">${heroEmoji}</span></div>
          <h1 class="hero-title" style="font-family:'Outfit',Arial,sans-serif; font-size:26px; font-weight:700; color:#FFFFFF !important; line-height:1.3; margin-bottom:6px;">${escapeHtml(title)}</h1>
          <p style="font-family:'Outfit',Arial,sans-serif; font-size:14px; color:#FFFFFF !important; line-height:1.5;">${escapeHtml(heroSubtitle)}</p>
        </div>
      </div>
      <div style="padding:0 40px;"><div style="width:60px; height:3px; background:linear-gradient(90deg,#E3C77E,#C9A24B); border-radius:2px; margin:0 auto; margin-top:-2px;"></div></div>
      <div class="content-section" style="padding:40px 40px 32px;">
        ${greetingName ? `<p style="font-family:'Outfit',Arial,sans-serif; font-size:15px; color:#262626; line-height:1.7; margin-bottom:20px;">Hello <strong style="font-weight:600; color:#1A1A1A;">${escapeHtml(greetingName)}</strong>,</p>` : ""}
        <p style="font-family:'Outfit',Arial,sans-serif; font-size:15px; color:#262626; line-height:1.7; margin-bottom:24px;">${escapeHtml(intro)}</p>
        <div style="background:#F6F8FC; border-radius:14px; padding:24px; margin-bottom:24px; border-left:4px solid #FF512F;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">${detailRows(rows)}
          </table>
        </div>
        <div style="height:1px; background:#E9EDF4; margin:8px 0 16px;"></div>
        <p style="font-family:'Outfit',Arial,sans-serif; font-size:13px; color:#6B7687; line-height:1.6;">Need help? Reply to this email or call us at <strong style="color:#262626;">${PHONE}</strong>.</p>
      </div>
      <div class="footer-section" style="background:linear-gradient(180deg,#1A0A05,#120804); padding:32px 40px; text-align:center;">
        <img src="${EMAIL_ASSETS}/amer247.png" alt="Amer 24/7" style="width:120px; height:auto; margin-bottom:16px; opacity:0.8;">
        <div style="font-family:'Outfit',Arial,sans-serif; font-size:12px; color:#FFFFFF; line-height:1.6; margin-bottom:12px;">Amer 24/7 Government Services Centre<br>Dubai, United Arab Emirates<br>${SUPPORT_EMAILS.map((addr) => `<a href="mailto:${addr}" style="color:#C9A24B; text-decoration:none;">${addr}</a>`).join(' &nbsp;·&nbsp; ')}</div>
        <div style="margin-bottom:12px;"><a href="${PRIVACY_URL}" style="font-family:'Outfit',Arial,sans-serif; font-size:12px; color:#C9A24B; text-decoration:none; margin:0 8px;">Privacy Policy</a><a href="${TERMS_URL}" style="font-family:'Outfit',Arial,sans-serif; font-size:12px; color:#C9A24B; text-decoration:none; margin:0 8px;">Terms of Service</a></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
