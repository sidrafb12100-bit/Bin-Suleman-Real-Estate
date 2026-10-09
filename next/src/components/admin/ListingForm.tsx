'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase/client';
import type { PhotoRow } from '@/lib/listings';
import PhotoUploader, { type PendingPhoto } from '@/components/admin/PhotoUploader';

export type FormValues = {
  ref: string;
  block: string;
  title: string;
  subtitle: string;
  category: string;
  collection: string;
  location: string;
  /** Raw input; '' means "On Request" (null in the DB). */
  demand: string;
  /** Raw <input type=date> value; '' means no recorded date. */
  demand_date: string;
  is_final: boolean;
  featured: boolean;
  published: boolean;
  sort_order: number;
  description: string;
};

const cls =
  'rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-on-surface placeholder:text-slate-400 focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/15 w-full';
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5';
const checkCls = 'rounded border-slate-300 text-[#d4af37] focus:ring-[#d4af37]/40 h-4 w-4';

const CATEGORIES = ['residential plot', 'commercial plot', 'pair plot', 'file'];

export default function ListingForm({
  listingId,
  initial,
  initialPhotos,
}: {
  listingId: string | null;
  initial: FormValues;
  initialPhotos: PhotoRow[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initial);
  const [existing, setExisting] = useState<PhotoRow[]>(initialPhotos);
  const [pending, setPending] = useState<PendingPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }
    setBusy(true);
    setError(null);

    const demand = values.demand.trim();
    const payload = {
      ref: values.ref.trim(),
      block: values.block.trim(),
      title: values.title.trim(),
      subtitle: values.subtitle.trim(),
      category: values.category.trim() || 'residential plot',
      collection: values.collection,
      location: values.location.trim(),
      demand: demand === '' ? null : Math.round(Number(demand)),
      demand_date: values.demand_date || null,
      is_final: values.is_final,
      featured: values.featured,
      published: values.published,
      sort_order: Number.isFinite(values.sort_order) ? values.sort_order : 0,
      description: values.description,
    };

    if (payload.demand !== null && (!Number.isFinite(payload.demand) || payload.demand <= 0)) {
      setError('Demand must be a positive number in PKR, or left blank for "On Request".');
      setBusy(false);
      return;
    }

    let id = listingId;
    try {
      if (id) {
        const { error: updErr } = await supabase.from('listings').update(payload).eq('id', id);
        if (updErr) throw updErr;
      } else {
        const { data, error: insErr } = await supabase
          .from('listings')
          .insert(payload)
          .select('id')
          .single();
        if (insErr) throw insErr;
        id = data.id as string;
      }

      if (pending.length) {
        const base = existing.length;
        const rows = pending.map((photo, i) => ({
          listing_id: id,
          storage_path: photo.path,
          position: base + i,
        }));
        const { error: photoErr } = await supabase.from('listing_photos').insert(rows);
        if (photoErr) throw photoErr;
        setPending([]);
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-slate-900">
          {listingId ? 'Edit Listing' : 'New Listing'}
        </h2>
        <a
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-[#d4af37] transition-colors"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_back</span>
          Back to listings
        </a>
      </div>

      {/* Identity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="f-ref">Plot Reference *</label>
          <input id="f-ref" required className={cls} placeholder="A-356 / F-23+24 / 46+47"
            value={values.ref} onChange={(e) => set('ref', e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-block">Block Badge *</label>
          <input id="f-block" required className={cls} placeholder="A Block / M Block"
            value={values.block} onChange={(e) => set('block', e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-title">Card Title *</label>
          <input id="f-title" required className={cls} placeholder="Plot A-356"
            value={values.title} onChange={(e) => set('title', e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-subtitle">Card Subtitle</label>
          <input id="f-subtitle" className={cls} placeholder="Direct plot / Contiguous plot pair"
            value={values.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
        </div>
      </div>

      {/* Classification */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls} htmlFor="f-collection">Section *</label>
          <select id="f-collection" required className={cls}
            value={values.collection} onChange={(e) => set('collection', e.target.value)}>
            <option value="prism9">DHA Phase 9 Prism</option>
            <option value="phase5">DHA Phase 5</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="f-category">Category</label>
          <input id="f-category" list="category-options" className={cls} placeholder="residential plot"
            value={values.category} onChange={(e) => set('category', e.target.value)} />
          <datalist id="category-options">
            {CATEGORIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div>
          <label className={labelCls} htmlFor="f-sort">Sort Order</label>
          <input id="f-sort" type="number" className={cls}
            value={values.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="f-location">Location</label>
        <input id="f-location" className={cls}
          placeholder="DHA Phase 9 Prism, Lahore"
          value={values.location} onChange={(e) => set('location', e.target.value)} />
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="f-demand">Demand (PKR)</label>
          <input id="f-demand" type="number" min="1" step="1" className={cls}
            placeholder="Blank = On Request"
            value={values.demand} onChange={(e) => set('demand', e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-date">Demand Recorded Date</label>
          <input id="f-date" type="date" className={cls}
            value={values.demand_date} onChange={(e) => set('demand_date', e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="f-desc">Internal Description</label>
        <textarea id="f-desc" rows={3} className={cls} placeholder="Notes (not shown on cards)"
          value={values.description} onChange={(e) => set('description', e.target.value)} />
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {(
          [
            ['published', 'Published (visible publicly)'],
            ['featured', 'Featured (orange border)'],
            ['is_final', 'Final demand'],
          ] as const
        ).map(([key, text]) => (
          <label key={key} className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" className={checkCls} checked={values[key]} onChange={(e) => set(key, e.target.checked)} />
            {text}
          </label>
        ))}
      </div>

      <PhotoUploader
        existing={existing}
        pending={pending}
        onExistingChange={setExisting}
        onPendingChange={setPending}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0b1329] text-[#fed65b] font-label-lg text-label-lg uppercase font-bold tracking-wide hover:bg-[#131d3d] active:scale-[0.99] transition-all disabled:opacity-60"
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">save</span>
        {busy ? 'Saving…' : listingId ? 'Save Changes' : 'Create Listing'}
      </button>
    </form>
  );
}

