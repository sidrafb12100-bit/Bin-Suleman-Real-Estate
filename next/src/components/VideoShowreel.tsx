'use client';

import { useState } from 'react';
import { site } from '@/content/site';

/**
 * Click-to-play YouTube facade — same behaviour as the live site:
 * thumbnail stays mounted (defines box height), iframe overlays it on click.
 */
export default function VideoShowreel() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="w-full py-12 sm:py-16 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
              Official Showreel
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Experience DHA Phase 9 Prism.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
            A guided visual tour of Lahore&apos;s most ambitious master-planned community — presented by Bin Suleman Real Estate &amp; Builders.
          </p>
        </div>
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#0b1329] border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.poster}
            alt="DHA Phase 9 Prism official showreel thumbnail"
            className="w-full h-auto max-h-[80vh] object-cover"
          />
          {playing ? (
            <iframe
              title="DHA Phase 9 Prism showreel"
              src={`https://www.youtube.com/embed/${site.videoId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0 z-10"
            />
          ) : (
            <button
              type="button"
              aria-label="Play the DHA Phase 9 Prism showreel on YouTube"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full flex items-center justify-center group cursor-pointer"
              style={{ border: 0, padding: 0, background: 'transparent' }}
            >
              <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary-container/95 shadow-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#0b1329]">play_arrow</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}