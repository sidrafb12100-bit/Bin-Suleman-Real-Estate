'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { rowToListing, type ListingRow, type PublicListing } from '@/lib/listings';

export type ListingsResult = {
  /** True while the first Supabase fetch has not resolved yet. */
  loading: boolean;
  /** Live rows from Supabase; null until first successful fetch (or on failure). */
  listings: PublicListing[] | null;
  /** True when Supabase is not configured or the fetch failed (render static data). */
  usingFallback: boolean;
};

/**
 * Loads published listings + their photo URLs from Supabase in the browser
 * (static export has no server) and keeps them fresh via Postgres realtime.
 * On any failure the hook stays silent and exposes `usingFallback` so the
 * caller can render the hardcoded seed data instead.
 */
export function useListings(): ListingsResult {
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured());
  const [listings, setListings] = useState<PublicListing[] | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data: rows, error } = await supabase
      .from('listings')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error || !rows) {
      // RLS/network failure → caller keeps rendering the static fallback.
      console.warn('[listings] Supabase fetch failed, using fallback:', error?.message);
      if (mounted.current) setLoading(false);
      return;
    }

    const listingRows = rows as ListingRow[];

    // Second pass: photos for exactly the listings we're about to render.
    const photosByListing: Record<string, string[]> = {};
    const ids = listingRows.map((r) => r.id);
    if (ids.length) {
      const { data: photoRows } = await supabase
        .from('listing_photos')
        .select('listing_id, storage_path, position')
        .in('listing_id', ids)
        .order('position', { ascending: true });
      for (const photo of photoRows ?? []) {
        const { data } = supabase.storage.from('listings').getPublicUrl(photo.storage_path);
        (photosByListing[photo.listing_id] ??= []).push(data.publicUrl);
      }
    }

    if (mounted.current) {
      setListings(listingRows.map((row) => rowToListing(row, photosByListing[row.id] ?? [])));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    // Refetch when the tab regains focus — realtime safety net.
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => {
      mounted.current = false;
      window.removeEventListener('focus', onFocus);
    };
  }, [load]);

  // Realtime: any INSERT/UPDATE/DELETE on listings refreshes the public page.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    const channel = supabase
      .channel('public-listings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'listings' }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  return {
    loading,
    listings,
    usingFallback: listings === null,
  };
}
