'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Port of the B1 page-wipe: intercepts internal link clicks, plays the gold
 * curtain (leaving), then routes. Replays the arrival lift after each
 * client-side navigation. Fully disabled under prefers-reduced-motion.
 */
export default function PageWipe() {
  const router = useRouter();
  const pathname = usePathname();
  const firstRender = useRef(true);

  /* arrival replay on route change */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const html = document.documentElement;
    html.classList.remove('bsr-leaving', 'bsr-go');
    const el = document.getElementById('bsr-wipe');
    if (el) {
      el.style.animation = 'none';
      void el.offsetHeight; // restart the CSS arrival animation
      el.style.animation = '';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  /* departure interception */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const a = (t && t.closest ? t.closest('a[href]') : null) as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#')) return;
      if (!href.startsWith('/') && !href.startsWith(window.location.origin)) return;
      e.preventDefault();
      const html = document.documentElement;
      html.classList.add('bsr-leaving');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          html.classList.add('bsr-go');
          setTimeout(() => {
            router.push(href.startsWith(window.location.origin) ? new URL(href).pathname : href);
          }, 380);
        });
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);

  return <div id="bsr-wipe" aria-hidden="true" />;
}