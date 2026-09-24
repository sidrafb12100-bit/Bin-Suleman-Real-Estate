import Link from 'next/link';
import Icon from '@/components/Icon';

export default function AboutCta() {
  return (
    <section className="w-full bg-surface py-space-xl lg:py-24">
      <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter">
        <div className="relative rounded-3xl overflow-hidden bg-primary-container p-space-md sm:p-space-xl lg:p-20 text-on-primary shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-xs rounded-full bg-surface-container-highest/10 text-secondary-container font-label-caps text-label-caps uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-secondary-container" /> On-Site Office • Sector K Commercial Hub
              </div>
              <h2 className="font-display-xl text-2xl sm:text-display-xl tracking-tight text-surface-bright leading-tight break-words">
                Meet Our Advisors at DHA Phase 9 Prism.
              </h2>
              <p className="font-body-lg text-body-md sm:text-body-lg text-surface-variant max-w-xl">
                Step into our on-ground advisory suite for fresh coffee, authentic DHA market ledgers, and an
                accompanied site inspection of your preferred sector.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                <div className="flex items-start gap-space-xs">
                  <Icon name="location_on" className="text-secondary-container text-xl mt-0.5 shrink-0" />
                  <div>
                    <span className="font-label-lg text-label-lg text-surface-bright font-bold">Suite 104, Main Commercial</span>
                    <p className="font-body-sm text-body-sm text-surface-variant">DHA Phase 9 Prism, Lahore, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-xs">
                  <Icon name="schedule" className="text-secondary-container text-xl mt-0.5 shrink-0" />
                  <div>
                    <span className="font-label-lg text-label-lg text-surface-bright font-bold">Mon - Sat: 10:00 - 19:00</span>
                    <p className="font-body-sm text-body-sm text-surface-variant">Overseas Zoom desk open 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-space-md py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] font-label-lg text-label-lg font-bold shadow-xl hover:scale-105 transition-transform min-h-[44px]"
              >
                Schedule a Confidential Desk Briefing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}