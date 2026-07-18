import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = "submission-files";

// Mirrors the submission-files bucket's own restrictions (Supabase Storage
// settings) — kept here too so a rejected file never even reaches the
// network call, and so we can log/skip it with a clear reason instead of
// surfacing a raw storage error.
const MAX_FILE_BYTES = 1.5 * 1024 * 1024; // 1.5MB
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
// Fallback when the browser reports an empty file.type (happens on some
// OS/browser combos, especially for .doc/.docx) — judge by extension so a
// legitimate CV isn't silently dropped from the DB copy.
const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png", "webp", "doc", "docx"]);

function isAllowedType(file: File): boolean {
  if (file.type) return ALLOWED_MIME_TYPES.has(file.type);
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_EXTENSIONS.has(ext);
}

// Supabase Storage keys reject many characters (non-ASCII — e.g. Arabic
// filenames, common on this site — plus #, ?, etc.). Sanitize to a safe
// subset, preserving the extension; also defuses any "../" in a hostile
// filename. The original name survives in the email attachment regardless.
function sanitizeFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
  const ext = (dot > 0 ? name.slice(dot + 1) : "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);
  return `${base || "file"}${ext ? "." + ext : ""}`;
}

type SaveSubmissionArgs = {
  formType: "apply" | "contact" | "career" | "det247";
  hub?: string;
  referenceId?: string;
  applicantName?: string;
  email?: string;
  phone?: string;
  data?: Record<string, unknown>;
  files?: File[];
};

// Uploads any attached files to Storage, then inserts one row into
// `submissions` referencing their paths. Called BEFORE the email sends so
// the record survives a mail-provider outage; never throws (all failures
// are logged and swallowed) so a Supabase problem can't break the email
// path either.
export async function saveSubmission({
  formType,
  hub,
  referenceId,
  applicantName,
  email,
  phone,
  data = {},
  files = [],
}: SaveSubmissionArgs): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const filePaths: string[] = [];

    // Reference IDs are NOT unique (client generates "AMR-" + ~10k random
    // values, so collisions are expected at moderate volume) — a per-call
    // UUID segment keeps every submission's files in their own folder, and
    // upsert stays OFF so nothing can ever silently overwrite another
    // applicant's document.
    const folder = `${formType}/${referenceId ?? "no-ref"}-${randomUUID().slice(0, 8)}`;

    for (const [index, file] of files.entries()) {
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_FILE_BYTES) {
        console.error(`Skipped file "${file.name}": exceeds 1.5MB limit (${file.size} bytes).`);
        continue;
      }
      if (!isAllowedType(file)) {
        console.error(`Skipped file "${file.name}": disallowed type "${file.type}".`);
        continue;
      }
      // Index prefix guarantees uniqueness within the folder even when two
      // different original names sanitize to the same key (e.g. two Arabic
      // filenames both collapsing to "file.jpg").
      const path = `${folder}/${index + 1}-${sanitizeFileName(file.name)}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type || undefined, upsert: false });
      if (error) {
        console.error("Supabase file upload error:", error.message);
        continue;
      }
      filePaths.push(path);
    }

    const { error } = await supabase.from("submissions").insert({
      form_type: formType,
      hub: hub || null,
      reference_id: referenceId || null,
      applicant_name: applicantName || null,
      email: email || null,
      phone: phone || null,
      data,
      file_paths: filePaths,
    });

    if (error) {
      console.error("Supabase submission insert error:", error.message);
    }
  } catch (err) {
    console.error("saveSubmission failed:", err);
  }
}
