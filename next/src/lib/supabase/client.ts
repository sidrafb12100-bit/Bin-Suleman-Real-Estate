import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * True only when both public env vars are present (they are inlined at build
 * time by Next). When false the app renders its static fallback data and the
 * admin routes show a configuration notice instead of crashing.
 */
export const isSupabaseConfigured = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

let client: SupabaseClient | null = null;

/**
 * Browser-side Supabase client (anon/publishable key only — never a service
 * role key). Session tokens persist in localStorage; all writes are
 * authorised by RLS, so this client is safe to expose to visitors.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      { auth: { persistSession: true, autoRefreshToken: true } },
    );
  }
  return client;
}
