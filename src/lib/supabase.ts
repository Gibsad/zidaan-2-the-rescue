import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Lazily creates a Supabase client from the public env vars. Both are safe to
 * expose to the browser because inserts are governed by Row Level Security
 * (see supabase/schema.sql) — the anon key can only append RSVP rows, never
 * read them back.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }

  return cachedClient;
}
