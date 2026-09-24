import Link from 'next/link';
import Icon from '@/components/Icon';

const cards = [
  {
    dark: false, icon: 'cottage', goal: 'Goal: Residence', title: 'For Your Family Home',
    cta: 'Request Residence Advisory',
    items: [
      ['Recommended Sectors:', 'Sector A, C, D or J for quick possession.'],
      ['Key Checkpoints:', 'Street elevation, proximity to 30+ kanal parks.'],
      ['Typical Holding:', '0 - 24 months before commencing gray structure.'],
    ],
  },
  {
    dark: true, icon: 'trending_up', goal: 'Goal: Wealth Multiplication', title: 'For Long-Term Investment',
    cta: 'Consult Growth Strategy',
    items: [
      ['Recommended Sectors:', 'Sector K, L, Q or R active zones.'],
      ['Value Driver:', 'Substantial capital leap when official gazette publishes.'],
      ['Target Horizon:', '2 to 4 years for 40% - 75% equity expansion.'],
    ],
  },
  {
    dark: false, icon: 'storefront', goal: 'Goal: Rental Yield', title: 'For Commercial Cashflow',
    cta: 'Book Commercial Advisory',
    items: [
      ['Recommended Sectors:', 'Main Boulevard, Sector E & Q CCAs.'],
      ['High Footfall:', '4 Marla & 8 Marla multi-tenant commercial.'],
      ['Yield Profile:', 'Generational leases with corporate retail brands.'],
    ],
  },
];

export default function Matrix() {
  return (
    <section className="w-full bg-surface py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
            Strategic Investor Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
            Not sure which property is right for you?
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
            Compare objectives side-by-side to align your budget with the highest return and family security.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
          {cards.map((c) => (
            <div key={c.goal} className={`p-5 sm:p-7 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden border ${c.dark ? 'bg-primary-container text-on-primary border-white/10' : 'bg-white border-slate-200/80 shadow-sm'}`}>
              {c.dark && <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-secondary-container/10 rounded-full blur-2xl" />}
              <div className="flex flex-col gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.dark ? 'bg-secondary-container text-on-secondary-fixed' : 'bg-slate-900 text-white'}`}>
                  <Icon name={c.icon} className="text-2xl" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${c.dark ? 'text-secondary-container' : 'text-secondary'}`}>{c.goal}</span>
                  <h3 className={`text-lg sm:text-xl font-bold ${c.dark ? 'text-white' : 'text-on-surface'}`}>{c.title}</h3>
                </div>
                <ul className={`space-y-3 text-xs sm:text-sm ${c.dark ? 'text-slate-300' : 'text-on-surface-variant'}`}>
                  {c.items.map(([b, r]) => (
                    <li key={b} className="flex items-start gap-2">
                      <Icon name="check_circle" className="text-secondary-container text-base shrink-0 mt-0.5" />
                      <span><strong>{b}</strong> {r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="#consultation-desk" className={`mt-6 w-full py-3 rounded-full text-xs sm:text-sm font-bold transition-all relative z-10 text-center flex items-center justify-center gap-1 min-h-[44px] ${c.dark ? 'bg-gradient-to-r from-secondary-container to-secondary-fixed-dim text-on-secondary-fixed shadow-lg' : 'bg-slate-100 hover:bg-secondary-fixed text-on-surface'}`}>
                <span>{c.cta}</span>
                <Icon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}