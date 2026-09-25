import { NextRequest, NextResponse } from "next/server";
import { findPayableSubmissionInTable, PAYABLE_TABLES, type PayableTable } from "@/lib/db";
import { verifyDocsLink, makeFileLink, makeZipLink } from "@/lib/fileLinks";
import { escapeHtml } from "@/lib/mailer";

export const runtime = "nodejs";

const FILE_LINK_TTL_SECONDS = 60 * 60; // per-file links only need to outlive the page visit

function displayName(path: string): { title: string; ext: string } {
  const file = path.split("/").pop() ?? "file";
  const dot = file.lastIndexOf(".");
  const ext = dot > 0 ? file.slice(dot + 1).toUpperCase() : "FILE";
  const base = (dot > 0 ? file.slice(0, dot) : file).replace(/^\d+-/, "").replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return { title: base, ext };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const table = sp.get("t") ?? "";
  const referenceId = sp.get("r") ?? "";
  const exp = Number(sp.get("e"));
  const sig = sp.get("s") ?? "";

  if (!verifyDocsLink(table, referenceId, exp, sig) || !PAYABLE_TABLES.includes(table as PayableTable)) {
    return NextResponse.json({ error: "Link is invalid or has expired." }, { status: 403 });
  }

  const row = await findPayableSubmissionInTable(referenceId, table as PayableTable);
  const filePaths = (row?.file_paths as string[] | undefined) ?? [];
  if (!filePaths.length) {
    return NextResponse.json({ error: "No files found." }, { status: 404 });
  }

  const expiresOn = new Date(exp * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dubai" });
  const applicant = String(row?.applicant_name ?? "");
  const service = String(row?.service ?? "");
  const cards = filePaths
    .map((p, i) => {
      const { title, ext } = displayName(p);
      const href = escapeHtml(makeFileLink(p, FILE_LINK_TTL_SECONDS));
      return `<a class="doc" href="${href}" target="_blank" rel="noopener">
  <span class="num">${i + 1}</span>
  <span class="badge ${ext === "PDF" ? "pdf" : ""}">${escapeHtml(ext)}</span>
  <span class="title">${escapeHtml(title)}</span>
  <span class="open">Open &rarr;</span>
</a>`;
    })
    .join("\n");

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Documents ${escapeHtml(referenceId)}</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#EEF1F7;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#262626}
.wrap{max-width:820px;margin:0 auto;padding:32px 16px 48px}
.head{background:#262626;color:#fff;border-radius:14px;padding:24px 28px;border-bottom:4px solid #C9A24B}
.head small{color:#C9A24B;letter-spacing:.12em;text-transform:uppercase;font-size:12px;font-weight:600}
.head h1{margin:6px 0 4px;font-size:24px}
.head p{margin:0;color:#cfd3dc;font-size:14px}
.zip{display:inline-block;margin:20px 0 0;padding:12px 20px;background:#C9A24B;color:#262626;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;transition:filter .15s}.zip:hover{filter:brightness(1.08)}
.note{margin:14px 0 0;padding:10px 14px;background:#fff8e6;border:1px solid #C9A24B;border-radius:8px;font-size:13px;color:#7a5c12}
.count{margin:18px 4px 10px;font-size:14px;color:#5b6270}
.doc{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #E9EDF4;border-radius:12px;padding:14px 16px;margin-bottom:10px;text-decoration:none;color:inherit;transition:box-shadow .15s,transform .15s,border-color .15s}
.doc:hover{box-shadow:0 6px 18px rgba(38,38,38,.10);transform:translateY(-1px);border-color:#C9A24B}
.num{flex:none;width:28px;height:28px;border-radius:50%;background:#EEF1F7;color:#5b6270;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center}
.badge{flex:none;min-width:46px;text-align:center;padding:4px 8px;border-radius:6px;background:#E9EDF4;color:#3b4252;font-size:11px;font-weight:700;letter-spacing:.04em}
.badge.pdf{background:#fdecea;color:#c0392b}
.title{flex:1;min-width:0;font-size:15px;font-weight:500;overflow-wrap:anywhere}
.open{flex:none;color:#9a7a26;font-size:14px;font-weight:600}
.foot{margin-top:24px;text-align:center;font-size:12px;color:#8a91a0}
@media(max-width:520px){.doc{flex-wrap:wrap}.open{margin-left:auto}.head{padding:20px}}
</style></head>
<body><div class="wrap">
<div class="head"><small>Amer247 &middot; Submitted documents</small><h1>${escapeHtml(referenceId)}</h1><p>${escapeHtml([applicant, service].filter(Boolean).join(" · "))}</p></div>
<a class="zip" href="${escapeHtml(makeZipLink(table, referenceId, FILE_LINK_TTL_SECONDS))}">&#11015; Download all (ZIP)</a>
<div class="note">&#9201; This link is valid for 7 days &mdash; expires on ${escapeHtml(expiresOn)}.</div>
<div class="count">${filePaths.length} document${filePaths.length === 1 ? "" : "s"} &mdash; click any to open</div>
${cards}
<div class="foot">This link will expire within 7 days (on ${escapeHtml(expiresOn)}) &middot; Private link, do not share</div>
</div></body></html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" },
  });
}
