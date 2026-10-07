'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { listings, listingFilters, type Listing } from '@/content/listings';

const toneClasses: Record<Listing['statusTone'], string> = {
  gold: 'bg-secondary-container/20 text-[#745c00]',
  green: 'bg-emerald-100 text-emerald-800',
  blue: 'bg-blue-100 text-blue-800',
};

/** Filterable listing cards grid (client component — filter state is local). */
export default function ListingsGrid() {
  const [active, setActive] = useState<Listing['type'] | 'all'>('all');
  const shown = active === 'all' ? listings : listings.filter((l) => l.type === active);

  return (
    <section id="listing-grid" className="w-full bg-surface py-space-xl lg:py-24">
      <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-space-md py-space-xs rounded-full bg-secondary-container/20 text-[#745c00] font-label-caps text-label-caps uppercase font-bold tracking-wider">
            Current Inventory
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
            Available Right Now
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Filter by category — every card shows size, sector, asking price and verification status.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-space-xs mt-space-lg" role="tablist" aria-label="Listing filters">
          {listingFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active === f.id}
              onClick={() => setActive(f.id)}
              className={
                active === f.id
                  ? 'px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] font-label-md text-label-md font-bold transition-all'
                  : 'px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold transition-all border border-surface-container-high'
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-space-lg">
          {shown.map((l) => (
            <article
              key={l.ref}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full bg-surface-container-high overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt={`${l.title} — ${l.sector}, DHA Phase 9 Prism`}
                  src={l.image}
                  loading="lazy"
                />
                <span
                  className={`absolute top-space-sm left-space-sm px-space-sm py-1 rounded-full font-label-caps text-label-caps uppercase font-bold ${toneClasses[l.statusTone]}`}
                >
                  {l.status}
                </span>
                <span className="absolute bottom-space-sm right-space-sm bg-primary/90 backdrop-blur-md px-space-sm py-1 rounded-full font-label-md text-label-md text-secondary-container font-semibold">
                  {l.ref}
                </span>
              </div>
              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
                    {l.sector}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">{l.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">{l.blurb}</p>
                </div>
                <div className="pt-space-sm border-t border-surface-container-high flex items-center justify-between gap-space-xs">
                  <span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface-variant">
                    <Icon name="straighten" className="text-base" /> {l.size}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{l.price}</span>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors"
                >
                  Request Details <Icon name="arrow_forward" className="text-base" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-lg">
            No listings in this category right now — call the advisory desk and we will notify you the moment one lands.
          </p>
        )}
      </div>
    </section>
  );
}
