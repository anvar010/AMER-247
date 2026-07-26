import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = "submission-files";

// Mirrors the submission-files bucket's own restrictions (Supabase Storage
// settings) — kept here too so a rejected file never even reaches the
// network call, and so we can log/skip it with a clear reason instead of
// surfacing a raw storage error.
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
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

// Shared by every save*() below — uploads attachments to Storage under their
// own per-submission folder, returns the stored paths. Never throws; a
// rejected/oversized file is just skipped and logged, same as before.
async function uploadFiles(folderPrefix: string, files: File[]): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  const filePaths: string[] = [];
  const folder = `${folderPrefix}-${randomUUID().slice(0, 8)}`;

  for (const [index, file] of files.entries()) {
    if (!(file instanceof File) || file.size === 0) continue;
    if (file.size > MAX_FILE_BYTES) {
      console.error(`Skipped file "${file.name}": exceeds 5MB limit (${file.size} bytes).`);
      continue;
    }
    if (!isAllowedType(file)) {
      console.error(`Skipped file "${file.name}": disallowed type "${file.type}".`);
      continue;
    }
    // Index prefix guarantees uniqueness within the folder even when two
    // different original names sanitize to the same key.
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
  return filePaths;
}

export async function saveContactSubmission(args: {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("contact_submissions").insert({
      name: args.name || null,
      email: args.email || null,
      phone: args.phone || null,
      reason: args.reason || null,
      message: args.message || null,
    });
    if (error) console.error("contact_submissions insert error:", error.message);
  } catch (err) {
    console.error("saveContactSubmission failed:", err);
  }
}

export async function saveCareerApplication(args: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  nationality: string;
  experience: string;
  skills: string;
  files?: File[];
}): Promise<void> {
  try {
    const filePaths = await uploadFiles(`career/${args.fullName || "no-name"}`, args.files ?? []);
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("career_applications").insert({
      full_name: args.fullName || null,
      email: args.email || null,
      phone: args.phone || null,
      location: args.location || null,
      nationality: args.nationality || null,
      experience: args.experience || null,
      skills: args.skills || null,
      file_paths: filePaths,
    });
    if (error) console.error("career_applications insert error:", error.message);
  } catch (err) {
    console.error("saveCareerApplication failed:", err);
  }
}

export async function saveDet247Request(args: {
  fullName: string;
  mobile: string;
  email: string;
  nationality: string;
  location: string;
  preferredContact: string;
  serviceRequired: string;
  otherService?: string;
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("det247_requests").insert({
      full_name: args.fullName || null,
      mobile: args.mobile || null,
      email: args.email || null,
      nationality: args.nationality || null,
      location: args.location || null,
      preferred_contact: args.preferredContact || null,
      service_required: args.serviceRequired || null,
      other_service: args.otherService || null,
    });
    if (error) console.error("det247_requests insert error:", error.message);
  } catch (err) {
    console.error("saveDet247Request failed:", err);
  }
}

export async function savePayOnlineOrder(args: {
  referenceId: string;
  name: string;
  email: string;
  mobile: string;
  amount: string;
  comments?: string;
  applicationReference?: string;
  transactionStatus?: string;
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("pay_online_orders").insert({
      reference_id: args.referenceId,
      name: args.name || null,
      email: args.email || null,
      mobile: args.mobile || null,
      amount: args.amount || null,
      comments: args.comments || null,
      application_reference: args.applicationReference || null,
      transaction_status: args.transactionStatus || null,
      email_sent: false,
    });
    if (error) console.error("pay_online_orders insert error:", error.message);
  } catch (err) {
    console.error("savePayOnlineOrder failed:", err);
  }
}

export async function saveTouristVisaApplication(args: {
  referenceId: string;
  service: string;
  applicantName: string;
  email: string;
  mobileNo: string;
  whatsappNo?: string;
  nationality?: string;
  travelDate?: string;
  passengers?: string;
  adults?: unknown[];
  children?: unknown[];
  files?: File[];
  transactionStatus?: string;
}): Promise<void> {
  try {
    const filePaths = await uploadFiles(`tourist-visa/${args.referenceId}`, args.files ?? []);
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("tourist_visa_applications").insert({
      reference_id: args.referenceId,
      service: args.service || null,
      applicant_name: args.applicantName || null,
      email: args.email || null,
      mobile_no: args.mobileNo || null,
      whatsapp_no: args.whatsappNo || null,
      nationality: args.nationality || null,
      travel_date: args.travelDate || null,
      passengers: args.passengers || null,
      adults: args.adults ?? [],
      children: args.children ?? [],
      file_paths: filePaths,
      transaction_status: args.transactionStatus || null,
      email_sent: false,
    });
    if (error) console.error("tourist_visa_applications insert error:", error.message);
  } catch (err) {
    console.error("saveTouristVisaApplication failed:", err);
  }
}

export async function saveServiceApplication(args: {
  referenceId: string;
  hub: string;
  service: string;
  applicantName: string;
  sponsorName?: string;
  email: string;
  mobileNo: string;
  applicationPriority?: string;
  applicationType?: string;
  insideOrOutside?: string;
  emirates?: string;
  address?: string;
  comment?: string;
  files?: File[];
  transactionStatus?: string;
}): Promise<void> {
  try {
    const filePaths = await uploadFiles(`service/${args.referenceId}`, args.files ?? []);
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("online_services_applications").insert({
      reference_id: args.referenceId,
      hub: args.hub || null,
      service: args.service || null,
      applicant_name: args.applicantName || null,
      sponsor_name: args.sponsorName || null,
      email: args.email || null,
      mobile_no: args.mobileNo || null,
      application_priority: args.applicationPriority || null,
      application_type: args.applicationType || null,
      inside_or_outside: args.insideOrOutside || null,
      emirates: args.emirates || null,
      address: args.address || null,
      comment: args.comment || null,
      file_paths: filePaths,
      transaction_status: args.transactionStatus || null,
      email_sent: false,
    });
    if (error) console.error("online_services_applications insert error:", error.message);
  } catch (err) {
    console.error("saveServiceApplication failed:", err);
  }
}

// Payment confirmation (paymentCallBack, send-application-email) only ever
// concerns these 3 tables — Contact/Career/DET247 never go through Mettpay.
// Mirrors master's own paymentCallBack route, which loops through a fixed
// list of Strapi content types the exact same way.
const PAYABLE_TABLES = ["pay_online_orders", "tourist_visa_applications", "online_services_applications"] as const;
export type PayableTable = (typeof PAYABLE_TABLES)[number];

export type PayableRow = {
  table: PayableTable;
  id: string;
  reference_id: string;
  transaction_status: string | null;
  email_sent: boolean;
  [key: string]: unknown;
};

// reference_id isn't guaranteed unique (client-generated with a small
// random range — two different applicants can coincidentally collide) —
// newest-first + limit(1) instead of a stricter lookup means a rare
// collision degrades to "acts on the most recent match" instead of
// throwing and dropping the whole webhook/email.
export async function findPayableSubmission(referenceId: string): Promise<PayableRow | null> {
  const supabase = getSupabaseAdmin();
  for (const table of PAYABLE_TABLES) {
    const { data } = await supabase
      .from(table)
      .select("*")
      .eq("reference_id", referenceId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (data && data[0]) {
      return { ...data[0], table } as PayableRow;
    }
  }
  return null;
}

export async function updatePayableSubmission(
  row: PayableRow,
  updates: Record<string, unknown>
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from(row.table).update(updates).eq("id", row.id);
  if (error) console.error(`${row.table} update error:`, error.message);
}

// Maps a row from any of the 3 payable tables into the shape
// lib/applicationEmail.ts's buildApplicationEmail() expects — each table
// has different real columns, but the email template only cares about this
// common shape.
export function payableRowToEmailInput(row: PayableRow): {
  hub: string;
  service: string | null;
  reference_id: string;
  applicant_name: string | null;
  email: string | null;
  phone: string | null;
  data: Record<string, unknown>;
} {
  if (row.table === "pay_online_orders") {
    return {
      hub: "Pay Online",
      service: null,
      reference_id: row.reference_id,
      applicant_name: (row.name as string) ?? null,
      email: (row.email as string) ?? null,
      phone: (row.mobile as string) ?? null,
      data: {
        amount: row.amount,
        comments: row.comments,
        applicationReference: row.application_reference,
      },
    };
  }
  if (row.table === "tourist_visa_applications") {
    return {
      hub: "Tourist Visa",
      service: (row.service as string) ?? null,
      reference_id: row.reference_id,
      applicant_name: (row.applicant_name as string) ?? null,
      email: (row.email as string) ?? null,
      phone: (row.mobile_no as string) ?? null,
      data: {
        amount: row.amount,
        whatsappNo: row.whatsapp_no,
        nationality: row.nationality,
        travelDate: row.travel_date,
        passengers: row.passengers,
        adults: row.adults,
        children: row.children,
      },
    };
  }
  // online_services_applications
  return {
    hub: (row.hub as string) ?? "",
    service: (row.service as string) ?? null,
    reference_id: row.reference_id,
    applicant_name: (row.applicant_name as string) ?? null,
    email: (row.email as string) ?? null,
    phone: (row.mobile_no as string) ?? null,
    data: {
      amount: row.amount,
      sponsorName: row.sponsor_name,
      applicationPriority: row.application_priority,
      applicationType: row.application_type,
      insideOrOutside: row.inside_or_outside,
      emirates: row.emirates,
      address: row.address,
      comment: row.comment,
    },
  };
}
