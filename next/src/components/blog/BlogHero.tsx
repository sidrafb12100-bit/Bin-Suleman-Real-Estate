/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function BlogHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a101d] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 border-b border-secondary/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a101d] via-[#0a101d]/85 to-[#0a101d]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <span className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-secondary-container/40 text-[11px] sm:text-xs text-secondary-container uppercase tracking-wider font-bold">
            Authoritative Research &amp; Data • Vol. 24 / Issue 08
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            DHA Phase 9 Prism <span className="text-secondary-container">Market Intelligence</span> &amp; News
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
            Unbiased, factual reports on infrastructure progress, possession updates, balloting results, and sector
            price trends curated directly by licensed engineers and registered DHA consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-5 py-4">
              <p className="text-xl font-extrabold text-secondary-container">142 Plots</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Phase 9 Volume — Registered this month</p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-5 py-4">
              <p className="text-xl font-extrabold text-secondary-container">8 Min Deep Read</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Special Cover Report</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-[11px] text-slate-400">
            <Icon name="calendar_month" className="text-base text-secondary-container" /> Nov 2024 - Q1 2025 Edition •
            <Icon name="verified" className="text-base text-secondary-container" /> Verified Field Audit
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 h-full flex flex-col gap-4">
            <span className="inline-flex self-start px-2.5 py-0.5 rounded-full bg-secondary-container text-[#0b1329] text-[10px] uppercase font-bold tracking-wider">
              Featured Audit
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              DHA Phase 9 Prism 2024–2025 Development &amp; Possession Roadmap: Which Sectors Are Ready for Home
              Construction First?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              An authoritative on-site progress assessment of Sectors A, B, C, and D. Unpacking trunk sewerage line
              completion, underground grid station energization, and the massive valuation catalyst following the
              newly opened Lahore Ring Road (SL-3) interchange.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <span className="rounded-xl bg-white/10 px-3 py-2"><strong className="text-secondary-container">Sector A &amp; B Possession Target</strong> • 92% Ready</span>
              <span className="rounded-xl bg-white/10 px-3 py-2">Asphalt Carpeting: Complete</span>
              <span className="rounded-xl bg-white/10 px-3 py-2">Water Filtration Plant: Installed</span>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary-container text-[#0b1329] flex items-center justify-center text-xs font-bold">BS</span>
                <div>
                  <p className="text-sm font-bold">Engr. Suleman Tariq</p>
                  <p className="text-[11px] text-slate-400">Principal Advisory Lead</p>
                </div>
              </div>
              <Link href="/contact" className="text-xs sm:text-sm font-bold text-secondary-container hover:text-white transition-colors flex items-center gap-1">
                Read Full Audit <Icon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}