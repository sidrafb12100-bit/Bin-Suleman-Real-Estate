'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import { getSupabase } from '@/lib/supabase/client';
import { formatPKR } from '@/lib/format';
import type { ListingRow } from '@/lib/listings';

type Row = ListingRow & {
  /** Raw `listing_photos(count)` aggregate returned by the select. */
  listing_photos?: { count: number }[];
  photo_count?: number;
};

function Dashboard() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error: err } = await supabase
      .from('listings')
      .select('*, listing_photos(count)')
      .order('collection', { ascending: true })
      .order('sort_order', { ascending: true });
    if (err) {
      setError(err.message);
      return;
    }
    setRows(
      (data as unknown as Row[]).map((r) => ({
        ...r,
        photo_count: Array.isArray(r.listing_photos) ? Number(r.listing_photos[0]?.count ?? 0) : 0,
      })),
    );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const togglePublished = async (row: Row) => {
    const supabase = getSupabase();
    if (!supabase || busy) return;
    setBusy(true);
    const { error: err } = await supabase.from('listings').update({ published: !row.published }).eq('id', row.id);
    setBusy(false);
    if (err) setError(err.message);
    else await load();
  };

  const remove = async (row: Row) => {
    const supabase = getSupabase();
    if (!supabase || busy) return;
    if (!window.confirm(`Delete ${row.title} permanently (including its photos)?`)) return;
    setBusy(true);
    setError(null);
    const { data: photos } = await supabase.from('listing_photos').select('storage_path').eq('listing_id', row.id);
    if (photos?.length) {
      await supabase.storage.from('listings').remove(photos.map((p) => p.storage_path));
    }
    const { error: err } = await supabase.from('listings').delete().eq('id', row.id);
    setBusy(false);
    if (err) setError(err.message);
    else await load();
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Listings</h1>
          <p className="text-sm text-slate-400 mt-1">
            {rows ? `${rows.length} total · changes go live instantly` : 'Loading…'}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/editor"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#fed65b] text-[#0b1329] text-sm font-bold uppercase tracking-wide hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">add</span>
            New Listing
          </Link>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-600 text-slate-300 text-sm font-bold uppercase tracking-wide hover:border-[#fed65b]/50 hover:text-[#fed65b] transition-all"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">logout</span>
            Sign Out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {rows === null && (
          <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-8 text-center text-slate-400 text-sm">
            Loading listings…
          </div>
        )}
        {rows?.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-8 text-center text-slate-400 text-sm">
            No listings yet — create your first one.
          </div>
        )}
        {rows?.map((row) => (
          <div key={row.id} className="rounded-2xl bg-white p-4 sm:p-5 flex flex-wrap items-center gap-4 shadow-lg">
            <div className="flex-1 min-w-[220px]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-[#d3820f] text-white text-[10px] font-bold uppercase tracking-wider">
                  {row.collection === 'phase5' ? 'Phase 5' : 'Prism 9'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{row.ref}</span>
                {row.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e07b0c]">★ Featured</span>
                )}
              </div>
              <p className="font-bold text-slate-900 mt-1">{row.title}</p>
              <p className="text-xs text-slate-500">
                {row.block} · {row.demand != null ? `PKR ${formatPKR(row.demand)}` : 'On Request'}
                {row.photo_count ? ` · ${row.photo_count} photo${row.photo_count > 1 ? 's' : ''}` : ''}
              </p>
            </div>

            <span
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                row.published
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}
            >
              {row.published ? 'Published' : 'Draft'}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => togglePublished(row)}
                disabled={busy}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-bold uppercase tracking-wide text-slate-600 hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-50"
              >
                {row.published ? 'Unpublish' : 'Publish'}
              </button>
              <Link
                href={`/admin/editor?id=${row.id}`}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-bold uppercase tracking-wide text-slate-600 hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
              >
                Edit
              </Link>
              <button
                onClick={() => remove(row)}
                disabled={busy}
                className="px-3.5 py-2 rounded-lg border border-red-200 text-xs font-bold uppercase tracking-wide text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}

