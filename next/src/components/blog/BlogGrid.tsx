import Icon from '@/components/Icon';

const cats = ['Sector Analysis', 'Possession & Infrastructure', 'Overseas Pakistani Guides', 'Construction & Architecture', 'Price Trends & Valuations'];

const articles = [
  { icon: 'analytics', badge: 'Price Delta: PKR 65 Lacs', meta: 'By Investment Desk • 6 min read', title: 'The Ultimate Guide to Buying a 1 Kanal Plot in Sector J vs. Sector C: Pros, Cons & Price Gap', desc: 'Sector C offers direct connectivity to the Phase 9 Main Boulevard and Ring Road, while Sector J features peaceful perimeter living near the civic center. We evaluate yield horizons, ground elevation levels, and realistic possession timing.', tag: 'Direct Plots Available', cat: 'Sector Comparative' },
  { badge: 'High Importance', meta: 'By DHA Transfer Advisory • 5 min read', title: 'Avoiding Common Pitfalls When Buying Open DHA Files vs. Allocated Plots', desc: 'Understand the direct legal difference between un-balloted file affidavits, allocation letters, and possession plots. Learn how to verify DHA verification slips, avoid counterfeit NDVP forms, and lock safe transfer fees.', tag: 'Risk Management', cat: 'Risk Management' },
  { icon: 'trending_up', badge: 'Commercial Zone Hub', meta: 'By Infrastructure Desk • 7 min read', title: 'How the New Ring Road Interchange Impacts Commercial Plot Valuations in Phase 9', desc: 'The operational commissioning of the Southern Loop connection slashes transit times to Allama Iqbal International Airport to 12 minutes. Why commercial boulevard plots along 150-ft main roads are experiencing high corporate demand.', tag: 'Commercial Sector', cat: 'Infrastructure Impact' },
  { badge: 'Overseas Desk #1', meta: 'By Overseas Desk • 9 min read', title: 'Step-by-Step Guide to DHA Lahore Property Transfers for Non-Resident Pakistanis', desc: 'Complete walkthrough for buyers in the UK, UAE, USA, and Canada. How special power of attorney (SPA), embassy attestation, Roshan Digital Account (RDA) payments, and remote DHA sub-office transfers work seamlessly.', tag: 'Overseas Protocol', cat: 'Overseas Protocol' },
  { badge: 'Villa Builders', meta: 'By Construction Desk • 8 min read', title: 'Turnkey Villa Construction Cost Guide: Material Rates & DHA By-Laws', desc: 'Understand DG/Maple Leaf cement price fluctuations, DHA Lahore by-laws, and architectural vetting procedures before groundbreaking.', tag: 'Construction & Architecture', cat: 'Construction & Architecture' },
  { icon: 'insights', badge: 'Projected 3-Yr ROI +44% to +58%', meta: 'By Investment Desk • 6 min read', title: 'DHA Phase 9 Prism Sector Classification: Tier 1 vs Tier 2 Plots for 36-Month Capital Gain', desc: 'Where to park capital right now. We segment low-density park-facing residential plots in Sector E & F against commercial clusters in Zone 2 to maximize ROI ahead of full possession handovers.', tag: 'Risk Factor: Low (DHA Regulated)', cat: 'Monthly Barometer' },
];
export default function BlogGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
            Field Directives
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Essential Investor Intelligence &amp; Blueprints
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <Icon name="search" className="text-lg text-secondary" /> Sort: <span className="font-bold text-on-surface">Most Recent</span>
          <Icon name="expand_more" className="text-lg" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {cats.map((c) => (
          <span key={c} className="px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface-variant cursor-pointer hover:border-[#d4af37] transition-colors">
            {c}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8">
        {articles.map((a) => (
          <article key={a.title} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              {a.icon ? <Icon name={a.icon} className="text-2xl text-secondary" /> : <span className="inline-flex px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">{a.cat}</span>}
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#745c00] bg-secondary-container/25 px-2 py-0.5 rounded-full text-right">{a.badge}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant uppercase tracking-wide font-semibold">{a.meta}</p>
            <h3 className="text-base font-bold text-on-surface leading-snug">{a.title}</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">{a.desc}</p>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">{a.tag}</span>
              <span className="text-xs font-bold text-on-surface flex items-center gap-1 cursor-pointer hover:text-secondary transition-colors">
                Read Guide <Icon name="arrow_forward" className="text-sm" />
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="text-center text-xs text-on-surface-variant mt-8">
        Showing 6 of 28 authoritative Phase 9 Prism reports
      </p>
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm"><Icon name="chevron_left" className="text-base" /></span>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer ${n === 1 ? 'bg-secondary-container text-[#0b1329]' : 'bg-surface-container-low border border-slate-200 text-on-surface-variant'}`}>{n}</span>
        ))}
        <span className="w-9 h-9 rounded-full bg-surface-container-low border border-slate-200 text-on-surface-variant flex items-center justify-center text-sm"><Icon name="chevron_right" className="text-base" /></span>
      </div>
    </section>
  );
}
