'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client';

/**
 * Client-side session gate for /admin. Note: under `output: 'export'` there is
 * no server, so this guard is UX only — actual write protection comes from
 * Supabase RLS (`is_admin()`), which the guard can never bypass.
 */
export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'authed' | 'guest' | 'unconfigured'>('loading');

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setStatus('unconfigured');
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus('authed');
      else {
        setStatus('guest');
        router.replace('/admin/login');
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/admin/login');
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  if (status === 'authed') return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      {status === 'unconfigured' ? (
        <>
          <p className="text-sm text-slate-300 max-w-md">
            Supabase is not configured. Copy <code className="text-[#fed65b]">next/.env.example</code> to{' '}
            <code className="text-[#fed65b]">next/.env.local</code> and fill in your project URL and anon key.
          </p>
        </>
      ) : (
        <span className="material-symbols-outlined text-4xl text-[#fed65b] animate-spin">progress_activity</span>
      )}
    </div>
  );
}
