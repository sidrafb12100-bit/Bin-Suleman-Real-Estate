import Icon from '@/components/Icon';

const pillars = [
  {
    icon: 'flight_land',
    title: 'Overseas Pakistani Investor Protection',
    desc: 'From North America, the Gulf Cooperation Council, and the UK, expatriates trust us to manage end-to-end DHA power-of-attorney transfers, verified bank escrows, and live satellite progress reporting without requiring emergency flights home.',
    tag: 'Direct Consular & POA Protocol',
  },
  {
    icon: 'apartment',
    title: 'From Raw Plot to Turnkey Luxury Villa',
    desc: 'We are not merely realtors; we are master builders. Our in-house engineering and architectural division drafts structural blueprints adhering precisely to DHA Lahore by-laws, managing grey-structure to Italian finishings under one accountable roof.',
    tag: 'Turnkey EPC Framework',
  },
  {
    icon: 'policy',
    title: 'Absolute Document & Title Verification',
    desc: 'Every allotment letter, allocation certificate, and transfer slip undergoes forensic verification at DHA Lahore Main Office (Phase 6) prior to token deposit. Zero disputed files, zero surprises, 100% legal clarity.',
    tag: 'DHA Verification Seal Guarantee',
  },
];

export default function AboutPillars() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
          The Stewardship Principle
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
          A Radical Commitment to Fiduciary Real Estate
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
          The property market in Lahore has historically suffered from informational asymmetry and speculative
          hyperbole. Bin Suleman Real Estate was established to operate like a private wealth office: objective,
          meticulous, and bound by duty to your generational capital.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
        {pillars.map((p) => (
          <div key={p.title} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Icon name={p.icon} className="text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface leading-snug">{p.title}</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-on-surface">
              {p.tag}
              <Icon name="chevron_right" className="text-base text-secondary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}