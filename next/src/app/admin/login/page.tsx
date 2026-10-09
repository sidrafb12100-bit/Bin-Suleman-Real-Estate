'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client';

const inputCls =
  'rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-on-surface placeholder:text-slate-400 focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/15 w-full';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Already signed in → go straight to the dashboard.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin');
    });
  }, [router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = getSupabase();
    if (!supabase) {
      setError('Supabase is not configured (see next/.env.local).');
      return;
    }
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace('/admin');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fed65b]/15 text-[#fed65b] text-xs uppercase font-bold tracking-wider">
          Restricted Desk
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-4">Listing Admin</h1>
        <p className="text-sm text-slate-400 mt-2">Sign in to manage live property listings.</p>
      </div>

      <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email *"
          className={inputCls}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password *"
          className={inputCls}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!isSupabaseConfigured() && (
          <p className="text-sm text-red-600">Supabase env vars are missing — see next/.env.example.</p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-1 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0b1329] text-[#fed65b] font-label-lg text-label-lg uppercase font-bold tracking-wide hover:bg-[#131d3d] active:scale-[0.99] transition-all disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">login</span>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
