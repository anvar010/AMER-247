import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — created on first use, not at import time. A module-level
// createClient would throw during import when the env vars are missing,
// which takes down every API route that imports it (even the email path,
// which doesn't need Supabase at all). Lazy init confines a misconfigured
// environment to a logged saveSubmission failure instead.
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY)."
      );
    }
    // Server-only client — the secret key bypasses row-level security. Never
    // import this from client components; API routes only.
    client = createClient(url, key);
  }
  return client;
}
