import Icon from '@/components/Icon';
import { site } from '@/content/site';

/** Listings page hero — mirrors the About/Services hero structure. */
export default function ListingsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary text-on-primary">
      {/* Ambient gold glow */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-xl lg:py-24">
        <span className="inline-flex items-center gap-2 self-start px-space-md py-space-xs rounded-full bg-secondary-container/15 text-secondary-container font-label-caps text-label-caps uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
          Live Inventory • DHA Phase 9 Prism
        </span>
        <h1 className="font-display-xl text-2xl sm:text-display-xl tracking-tight text-surface-bright mt-space-md leading-tight">
          Verified Plots, Files &amp; <span className="text-secondary-container">Commercial Listings</span>
        </h1>
        <p className="font-body-lg text-body-md sm:text-body-lg text-surface-variant max-w-2xl mt-space-sm">
          Every listing below is inspected on-ground and document-verified before it appears here — residential
          possession-ready plots, income commercial frontages and balloted DHA files with clean chain of custody.
        </p>
        <div className="flex flex-wrap gap-space-sm mt-space-lg">
          <a
            href="#listing-grid"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] font-label-lg text-label-lg font-bold hover:opacity-90 transition-opacity min-h-[44px]"
          >
            Browse Listings <Icon name="arrow_downward" className="text-xl" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-label-lg text-label-lg font-semibold hover:bg-white/20 transition-colors min-h-[44px]"
          >
            <Icon name="call" className="text-xl" /> Call an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}
