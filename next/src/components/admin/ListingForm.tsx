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

/* ---------------------------------------------------------------------------
 * Choice controls — the form mixes the three input styles on purpose:
 *  - Segmented  → small fixed sets (section, category, flags)
 *  - Select     → longer lists (block, location) with a "Custom…" escape hatch
 *  - Text input → free-form values (ref, title, demand, notes)
 * ------------------------------------------------------------------------- */

const SECTIONS = [
  { value: 'prism9', label: 'Prism 9' },
  { value: 'phase5', label: 'Phase 5' },
] as const;

const CATEGORIES = [
  { value: 'residential plot', label: 'Residential' },
  { value: 'commercial plot', label: 'Commercial' },
  { value: 'pair plot', label: 'Pair Plot' },
  { value: 'file', label: 'File' },
] as const;

/** Known blocks; "Custom…" reveals a free-typing input. */
const BLOCK_OPTIONS = ['A Block', 'F Block', 'Q Block', 'L Block', 'M Block'];
const LOCATION_OPTIONS = ['DHA Phase 9 Prism, Lahore', 'DHA Phase 5, Lahore'];

const segBtn = (active: boolean) =>
  `px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all ${
    active
      ? 'bg-[#0b1329] text-[#fed65b] border-[#0b1329] shadow-md'
      : 'bg-white text-slate-500 border-slate-200 hover:border-[#d4af37] hover:text-[#d4af37]'
  }`;

/** Segmented button group — no typing, tap to choose. */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  allowCustom,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  allowCustom?: { isCustom: boolean; onCustom: () => void };
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={segBtn(value === o.value && !allowCustom?.isCustom)}
          >
            {o.label}
          </button>
        ))}
        {allowCustom && (
          <button
            type="button"
            aria-pressed={allowCustom.isCustom}
            onClick={allowCustom.onCustom}
            className={segBtn(allowCustom.isCustom)}
          >
            Custom…
          </button>
        )}
      </div>
    </div>
  );
}

/** Dropdown with a "Custom…" option that falls back to a typing input. */
function SelectWithCustom({
  label,
  options,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const isCustom = value !== '' && !options.includes(value);
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <select
        className={cls}
        value={isCustom ? '__custom__' : value}
        onChange={(e) => {
          if (e.target.value === '__custom__') onChange('');
          else onChange(e.target.value);
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
        <option value="__custom__">{isCustom ? 'Custom (typed below)' : 'Custom…'}</option>
      </select>
      {isCustom && (
        <input
          className={`${cls} mt-2`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a custom value"
        />
      )}
    </div>
  );
}

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
  /** Explicit mode so "Set Price" can be pressed before typing a number. */
  const [priceMode, setPriceMode] = useState<'request' | 'price'>(initial.demand === '' ? 'request' : 'price');

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

    const demand = priceMode === 'request' ? '' : values.demand.trim();
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

    if (!payload.ref) {
      setError('Plot reference is required.');
      setBusy(false);
      return;
    }
    if (!payload.block) {
      setError('Block is required — pick one from the dropdown or choose Custom…');
      setBusy(false);
      return;
    }
    if (payload.demand !== null && (!Number.isFinite(payload.demand) || payload.demand <= 0)) {
      setError('Demand must be a positive number in PKR, or choose "On Request".');
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
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl flex flex-col gap-6">
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

      {/* Classification — buttons, not typing */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 flex flex-col gap-5">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#d4af37]" aria-hidden="true">tune</span>
          Classification
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Segmented
            label="Section *"
            options={SECTIONS}
            value={values.collection as (typeof SECTIONS)[number]['value']}
            onChange={(v) => set('collection', v)}
          />
          <Segmented
            label="Category *"
            options={CATEGORIES}
            value={
              (CATEGORIES.find((c) => c.value === values.category)?.value as (typeof CATEGORIES)[number]['value']) ??
              'residential plot'
            }
            onChange={(v) => set('category', v)}
            allowCustom={{
              isCustom: !CATEGORIES.some((c) => c.value === values.category),
              onCustom: () => set('category', ''),
            }}
          />
        </div>
        {!CATEGORIES.some((c) => c.value === values.category) && (
          <div>
            <label className={labelCls} htmlFor="f-category-custom">Custom category</label>
            <input
              id="f-category-custom"
              className={cls}
              placeholder="e.g. farm house"
              value={values.category}
              onChange={(e) => set('category', e.target.value)}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectWithCustom
            label="Block *"
            options={BLOCK_OPTIONS}
            value={values.block}
            onChange={(v) => set('block', v)}
            placeholder="Choose a block"
          />
          <SelectWithCustom
            label="Location"
            options={LOCATION_OPTIONS}
            value={values.location}
            onChange={(v) => set('location', v)}
            placeholder="Choose a location"
          />
        </div>
      </section>

      {/* Identity — typing */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 flex flex-col gap-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#d4af37]" aria-hidden="true">sell</span>
          Plot Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="f-ref">Plot Reference *</label>
            <input id="f-ref" required className={cls} placeholder="A-356 / F-23+24 / 46+47"
              value={values.ref} onChange={(e) => set('ref', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-title">Card Title *</label>
            <input id="f-title" required className={cls} placeholder="Plot A-356"
              value={values.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-subtitle">Card Subtitle</label>
            <input id="f-subtitle" className={cls} list="subtitle-options"
              placeholder="Direct plot / Contiguous plot pair"
              value={values.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
            <datalist id="subtitle-options">
              <option value="Direct plot" />
              <option value="Contiguous plot pair" />
              <option value="Contiguous pair plots" />
              <option value="Owner's final demand" />
            </datalist>
          </div>
          <div>
            <label className={labelCls} htmlFor="f-sort">Sort Order</label>
            <input id="f-sort" type="number" className={cls}
              value={values.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} />
          </div>
        </div>
      </section>

      {/* Pricing — mode buttons + typing */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 flex flex-col gap-5">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#d4af37]" aria-hidden="true">currency_rupee</span>
          Demand
        </h3>
        <div>
          <span className={labelCls}>Pricing</span>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={priceMode === 'request'}
              onClick={() => { setPriceMode('request'); set('demand', ''); }}
              className={segBtn(priceMode === 'request')}>
              On Request
            </button>
            <button type="button" aria-pressed={priceMode === 'price'}
              onClick={() => setPriceMode('price')} className={segBtn(priceMode === 'price')}>
              Set Price
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="f-demand">Demand (PKR)</label>
            <input id="f-demand" type="number" min="1" step="1" className={cls}
              disabled={priceMode === 'request'}
              placeholder={priceMode === 'request' ? 'On Request' : 'e.g. 40000000'}
              value={values.demand} onChange={(e) => set('demand', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-date">Demand Recorded Date</label>
            <input id="f-date" type="date" className={cls}
              value={values.demand_date} onChange={(e) => set('demand_date', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Status flags — toggle buttons, not checkboxes */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 flex flex-col gap-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#d4af37]" aria-hidden="true">flag</span>
          Status
        </h3>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['published', 'Published'],
              ['featured', 'Featured'],
              ['is_final', 'Final Demand'],
            ] as const
          ).map(([key, text]) => (
            <button
              key={key}
              type="button"
              aria-pressed={values[key]}
              onClick={() => set(key, !values[key])}
              className={segBtn(values[key])}
            >
              {values[key] && <span aria-hidden="true">✓ </span>}
              {text}
            </button>
          ))}
        </div>
        <div>
          <label className={labelCls} htmlFor="f-desc">Internal Description</label>
          <textarea id="f-desc" rows={3} className={cls} placeholder="Notes (not shown on cards)"
            value={values.description} onChange={(e) => set('description', e.target.value)} />
        </div>
      </section>

      {/* Photos — its own section (available when creating AND updating) */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#d4af37]" aria-hidden="true">add_photo_alternate</span>
          Photos
          <span className="font-normal normal-case text-slate-400 text-xs">
            (upload here for both new and updated listings)
          </span>
        </h3>
        <PhotoUploader
          existing={existing}
          pending={pending}
          onExistingChange={setExisting}
          onPendingChange={setPending}
        />
      </section>

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



