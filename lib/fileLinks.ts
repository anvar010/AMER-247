import { createHmac, timingSafeEqual } from "crypto";

const ORIGIN = "https://amer247.com";

function sign(path: string, exp: number): string {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) throw new Error("Missing SUPABASE_SECRET_KEY for file links.");
  return createHmac("sha256", secret).update(`${path}|${exp}`).digest("base64url");
}

export function makeFileLink(path: string, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const qs = new URLSearchParams({ p: path, e: String(exp), s: sign(path, exp) });
  return `${ORIGIN}/api/file?${qs.toString()}`;
}

export function verifyFileLink(path: string, exp: number, sig: string): boolean {
  if (!path || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(sign(path, exp));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function makeDocsLink(table: string, referenceId: string, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const qs = new URLSearchParams({ t: table, r: referenceId, e: String(exp), s: sign(`docs:${table}:${referenceId}`, exp) });
  return `${ORIGIN}/api/documents?${qs.toString()}`;
}

export function verifyDocsLink(table: string, referenceId: string, exp: number, sig: string): boolean {
  return verifyFileLink(`docs:${table}:${referenceId}`, exp, sig);
}

export function makeZipLink(table: string, referenceId: string, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const qs = new URLSearchParams({ t: table, r: referenceId, e: String(exp), s: sign(`zip:${table}:${referenceId}`, exp) });
  return `${ORIGIN}/api/file-zip?${qs.toString()}`;
}

export function verifyZipLink(table: string, referenceId: string, exp: number, sig: string): boolean {
  return verifyFileLink(`zip:${table}:${referenceId}`, exp, sig);
}
