import Icon from '@/components/Icon';

const steps = [
  {
    icon: 'psychology_alt',
    step: 'Step 01 • Strategy',
    title: 'Understand Your True Options',
    desc: "We don't push off-the-shelf listings. We map your specific capital window against sector road widths, high-tension lines, underground drainage contours, and verified DHA possession schedules.",
    tag: 'Objective Sector Pros & Cons',
  },
  {
    icon: 'compare_arrows',
    step: 'Step 02 • Plot Audit',
    title: 'Compare On-Ground Reality',
    desc: 'Park-facing corner vs standard boulevard? We break down plot frontage, soil compact tests, sun path orientation for architectural energy efficiency, and genuine recent transfer rate comps.',
    tag: 'Soil & Boundary Verification',
  },
  {
    icon: 'verified_user',
    step: 'Step 03 • Execution',
    title: 'Make an Informed Move',
    desc: 'Direct owner negotiations, zero artificial escalations, and total DHA transfer security. Every file is pre-verified at the DHA Phase 9 Prism Sub-Office before any financial commitment is requested.',
    tag: '100% Guaranteed Clear Title',
  },
];

export default function Advisory() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full" id="services">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
          Unbiased Institutional Advisory
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
          Finding a property is easy.{' '}
          <span className="bg-gradient-to-r from-[#8c7000] to-secondary-fixed-dim bg-clip-text text-transparent">
            Choosing the right one
          </span>{' '}
          takes more thought.
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
          In a mega-phase spanning 40,000 kanals with 16 distinct sectors, uninformed decisions cost millions in
          delayed possession and sub-optimal plot placements. We protect your equity.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
        {steps.map((s) => (
          <div
            key={s.step}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Icon name={s.icon} className="text-2xl" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wide">{s.step}</span>
              <h3 className="text-lg font-bold text-on-surface">{s.title}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-on-surface">
              <Icon name="trending_flat" className="text-base text-secondary" />
              {s.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}