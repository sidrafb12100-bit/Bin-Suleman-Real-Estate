import Link from 'next/link';
import Icon from '@/components/Icon';

const stats = [
  { v: '1,420+ Plots', l: 'Transfer Record' },
  { v: '85+ Delivered', l: 'Turnkey Villas' },
  { v: 'Fully Cleared', l: 'FBR / DHA Status', icon: 'verified' },
];

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a101d] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 border-b border-secondary/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a101d] via-[#0a101d]/85 to-[#0a101d]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-6">
        <span className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-secondary-container/40 text-[11px] sm:text-xs text-secondary-container uppercase tracking-wider font-bold">
          <Icon name="location_on" className="text-sm" /> Main Entrance Monument, DHA Phase 9 Prism
        </span>
        <div className="max-w-3xl">
          <span className="text-[11px] text-secondary font-bold uppercase tracking-wide">Pillar Foundations</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-2">
            Engineered Security, <span className="text-secondary-container">Direct Transfer Legitimacy</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed mt-4">
            DHA Phase 9 Prism is Lahore&apos;s largest mega-subdivision, sprawling over 40,000 kanals with 16 distinct
            sectors. We remove speculative risk by providing ground surveys, elevation maps, and institutional DHA
            legal vetting before capital is committed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="#booking-section" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] font-label-lg text-label-lg font-bold shadow-xl hover:scale-105 transition-transform min-h-[44px]">
              Book Direct Advisory <Icon name="north_east" className="text-lg" />
            </Link>
            <Link href="#timeline" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-label-lg text-label-lg font-semibold hover:bg-white/20 transition-colors min-h-[44px]">
              View Acquisition Process
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-5 py-4">
              <p className="text-xl sm:text-2xl font-extrabold text-secondary-container flex items-center gap-2">
                {s.icon ? <Icon name={s.icon} className="text-xl" /> : null} {s.v}
              </p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}