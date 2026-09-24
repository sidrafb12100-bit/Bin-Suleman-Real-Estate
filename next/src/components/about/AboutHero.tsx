import Link from 'next/link';
import Icon from '@/components/Icon';

const stats = [
  { v: '12+', l: 'Years in DHA Sector Mapping' },
  { v: 'PKR 18B+', l: 'Facilitated Transactions' },
  { v: '1,400+', l: 'Overseas Client Safe Filings' },
];

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a101d] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 border-b border-secondary/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a101d] via-[#0a101d]/80 to-[#0a101d]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-secondary-container/40 text-[11px] sm:text-xs text-secondary-container uppercase tracking-wider font-bold">
              <Icon name="verified_user" className="text-sm" /> DHA Lahore Authorized Advisory Desk
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <span className="text-secondary-container">Bin Suleman Heritage</span>
              <br />
              Local Knowledge. Personal Guidance.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed">
              Founded on transparency, integrity, and deep local insight into DHA Lahore&apos;s crowning masterplan —
              DHA Phase 9 Prism. We substitute high-pressure sales with institutional diligence and enduring family
              stewardship.
            </p>
            <Link
              href="#team"
              className="inline-flex items-center justify-center gap-2 self-start px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] font-label-lg text-label-lg font-bold shadow-xl hover:scale-105 transition-transform min-h-[44px]"
            >
              Meet The Principals <Icon name="arrow_forward" className="text-lg" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-secondary-container">
                <Icon name="verified_user" className="text-xl" />
                <span className="text-xs font-bold uppercase tracking-wider">DHA Verification Code</span>
              </div>
              {stats.map((s) => (
                <div key={s.l} className="border-t border-white/10 pt-3">
                  <p className="text-2xl font-extrabold text-secondary-container">{s.v}</p>
                  <p className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">{s.l}</p>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 flex items-center gap-3">
                <span className="font-headline-md text-headline-md font-extrabold text-white tracking-wide">BIN SULEMAN</span>
                <span className="text-[11px] text-slate-400">Real Estate &amp; Builders • Est. 2012</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}