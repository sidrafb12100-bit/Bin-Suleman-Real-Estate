'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import type { PhotoRow } from '@/lib/listings';

/** A photo uploaded during the current form session (row created on save). */
export type PendingPhoto = { path: string; url: string };

/**
 * Multi-photo picker backed by the public `listings` Storage bucket.
 * - New files upload immediately (path kept until Save inserts the rows).
 * - Removing an already-saved photo deletes its DB row + storage object now.
 */
export default function PhotoUploader({
  existing,
  pending,
  onExistingChange,
  onPendingChange,
}: {
  existing: PhotoRow[];
  pending: PendingPhoto[];
  onExistingChange: (photos: PhotoRow[]) => void;
  onPendingChange: (photos: PendingPhoto[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const supabase = getSupabase();
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!supabase || !files.length) return;
    setBusy(true);
    setError(null);
    const uploaded: PendingPhoto[] = [];
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('listings').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (upErr) {
        setError(`Upload failed for ${file.name}: ${upErr.message}`);
        break;
      }
      const { data } = supabase.storage.from('listings').getPublicUrl(path);
      uploaded.push({ path, url: data.publicUrl });
    }
    if (uploaded.length) onPendingChange([...pending, ...uploaded]);
    setBusy(false);
  };

  const removePending = async (photo: PendingPhoto) => {
    const supabase = getSupabase();
    onPendingChange(pending.filter((p) => p.path !== photo.path));
    if (supabase) await supabase.storage.from('listings').remove([photo.path]);
  };

  const removeExisting = async (photo: PhotoRow) => {
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    const [{ error: rowErr }] = await Promise.all([
      supabase.from('listing_photos').delete().eq('id', photo.id),
      supabase.storage.from('listings').remove([photo.storage_path]),
    ]);
    setBusy(false);
    if (rowErr) {
      setError(rowErr.message);
      return;
    }
    onExistingChange(existing.filter((p) => p.id !== photo.id));
  };

  const thumb = (key: string, url: string, onRemove: () => void) => (
    <div key={key} className="relative w-28 h-20 rounded-lg overflow-hidden border border-slate-200 group">
      <img src={url} alt="" className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={onRemove}
        disabled={busy}
        className="absolute inset-0 flex items-center justify-center bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
        aria-label="Remove photo"
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-sm font-bold text-slate-700">
          Photos <span className="font-normal text-slate-400">({existing.length + pending.length})</span>
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-bold uppercase tracking-wide text-slate-600 hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            {busy ? 'progress_activity' : 'add_photo_alternate'}
          </span>
          {busy ? 'Uploading…' : 'Add Photos'}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFiles}
        disabled={busy}
      />

      {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

      {existing.length + pending.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {existing.map((p) =>
            thumb(p.id, getSupabase()?.storage.from('listings').getPublicUrl(p.storage_path).data.publicUrl ?? '', () =>
              removeExisting(p),
            ),
          )}
          {pending.map((p) => thumb(p.path, p.url, () => removePending(p)))}
        </div>
      ) : (
        <p className="text-xs text-slate-400">No photos yet. The first photo is shown as the card header.</p>
      )}
    </div>
  );
}
