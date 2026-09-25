import { NextRequest, NextResponse } from "next/server";
import { zipSync } from "fflate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { findPayableSubmissionInTable, PAYABLE_TABLES, type PayableTable } from "@/lib/db";
import { verifyZipLink } from "@/lib/fileLinks";

export const runtime = "nodejs";

const BUCKET = "submission-files";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const table = sp.get("t") ?? "";
  const referenceId = sp.get("r") ?? "";
  const exp = Number(sp.get("e"));
  const sig = sp.get("s") ?? "";

  if (!verifyZipLink(table, referenceId, exp, sig) || !PAYABLE_TABLES.includes(table as PayableTable)) {
    return NextResponse.json({ error: "Link is invalid or has expired." }, { status: 403 });
  }

  const row = await findPayableSubmissionInTable(referenceId, table as PayableTable);
  const filePaths = (row?.file_paths as string[] | undefined) ?? [];
  if (!filePaths.length) {
    return NextResponse.json({ error: "No files found." }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  const files: Record<string, Uint8Array> = {};
  for (const path of filePaths) {
    const { data, error } = await supabase.storage.from(BUCKET).download(path);
    if (error || !data) continue;
    files[path.split("/").pop() ?? path] = new Uint8Array(await data.arrayBuffer());
  }

  // Store-only: PDFs/photos are already compressed, deflating wastes CPU.
  const zip = zipSync(files, { level: 0 });
  return new NextResponse(Buffer.from(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${referenceId}-documents.zip"`,
      "Cache-Control": "private, no-store",
    },
  });
}
