import Icon from '@/components/Icon';
import { site } from '@/content/site';

/** Bottom CTA band for the Listings page. */
export default function ListingsCta() {
  return (
    <section className="w-full bg-primary text-on-primary py-space-xl lg:py-24">
      <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter">
        <div className="relative rounded-3xl overflow-hidden bg-primary-container p-space-md sm:p-space-xl lg:p-20 shadow-2xl">
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 self-start px-space-md py-space-xs rounded-full bg-surface-container-highest/10 text-secondary-container font-label-caps text-label-caps uppercase tracking-wider">
                <Icon name="location_on" className="text-base" /> On-Site Office • Sector K Commercial Hub
              </span>
              <h2 className="font-headline-lg text-headline-lg text-surface-bright mt-space-sm leading-tight">
                Don&apos;t see the right plot? We source off-market too.
              </h2>
              <p className="font-body-md text-body-md text-surface-variant max-w-xl mt-space-sm">
                Tell us your budget and sector preference — our advisory desk matching it against private inventory
                and upcoming DHA releases within 24 hours.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-space-sm lg:justify-end">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] font-label-lg text-label-lg font-bold hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Request a Sourcing Match <Icon name="arrow_forward" className="text-xl" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-label-lg text-label-lg font-semibold hover:bg-white/20 transition-colors min-h-[44px]"
              >
                <Icon name="call" className="text-xl" /> {site.phoneDisplayShort}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
