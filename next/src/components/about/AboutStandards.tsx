import Icon from '@/components/Icon';

const features = [
  { icon: 'history_edu', title: 'Zero Hidden Fees', desc: 'Strict DHA fee schedule transparency: CVT, Stamp Duty, Transfer fee breakdown down to the exact rupee.' },
  { icon: 'speed', title: '48-Hr Verification', desc: 'Guaranteed fast-track official DHA National Database registry check on any open or balloted plot file.' },
  { icon: 'trending_up', title: 'Algorithmic Comps', desc: 'Quarterly price index models based on actual realized transfers, not inflated WhatsApp group whispers.' },
  { icon: 'construction', title: 'Post-Sale Support', desc: 'Seamless handover to our construction wing for soil testing, boundary demarcation, and site grading.' },
];

export default function AboutStandards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full">
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-slate-200/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-[#0b1329] flex items-center justify-center shrink-0">
              <Icon name="verified" className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">Institutional Accreditation</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                <strong className="text-on-surface">Authorized Member:</strong> DHA Lahore Property Dealers
                Association
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Registration Certificate # DHA-LHR-AD-2015-894 • Direct Corporate Seat at DHA Transfer Complex
                (Phase 6)
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-container/25 text-[#745c00] text-[11px] uppercase font-bold tracking-wider">
            Direct Owner Listings Only
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {features.map((f) => (
            <div key={f.title} className="p-4 rounded-2xl bg-white border border-slate-200/80 flex flex-col gap-2">
              <Icon name={f.icon} className="text-2xl text-secondary" />
              <h3 className="text-sm font-bold text-on-surface">{f.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}