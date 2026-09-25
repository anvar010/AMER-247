import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyFileLink } from "@/lib/fileLinks";

export const runtime = "nodejs";

const BUCKET = "submission-files";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const path = sp.get("p") ?? "";
  const exp = Number(sp.get("e"));
  const sig = sp.get("s") ?? "";

  if (!verifyFileLink(path, exp, sig)) {
    return NextResponse.json({ error: "Link is invalid or has expired." }, { status: 403 });
  }

  const { data: file, error } = await getSupabaseAdmin().storage.from(BUCKET).download(path);
  if (error || !file) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const filename = (path.split("/").pop() ?? "file").replace(/"/g, "");
  const type = file.type || "application/octet-stream";
  // Only types a browser can safely display are opened inline. Anything else
  // (notably HTML/SVG, which can run script on our domain) is forced to
  // download, since these are customer-uploaded files.
  const inline = type === "application/pdf" || type === "text/plain" || /^image\/(jpeg|png|gif|webp)$/.test(type);
  return new NextResponse(await file.arrayBuffer(), {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
