import Icon from '@/components/Icon';

const phases = [
  { n: '01', icon: 'psychology_alt', title: 'Strategic Consultation', phase: 'Phase: Discovery', desc: 'Objectives, budget corridor, and sector shortlisting are mapped against verified ground realities and your possession timeline.' },
  { n: '02', icon: 'fact_check', title: 'Escrow & Documentation', phase: 'Phase: Title Clearance', desc: 'Pay-orders are routed through verified escrow channels; every allotment document is authenticated at DHA before any money deposited into trust.' },
  { n: '03', icon: 'counter_1', title: 'Official DHA Transfer', phase: 'Phase: Title Handover', desc: 'In-person biometric DHA Lahore Transfer Officer appointment or Overseas Pakistani embassy-attested POA recording. Pay-orders exchanged inside DHA premises.' },
  { n: '04', icon: 'foundation', title: 'Architectural Groundbreaking', phase: 'Phase: Turnkey Delivery', desc: 'Topographic survey, floor plans submission to DHA Building Control branch, issuance of official digging permit, and turnkey construction mobilization.' },
];

export default function ServicesTimeline() {
  return (
    <section id="timeline" className="w-full bg-surface-container-low border-y border-slate-200/70 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
            Structured Acquisition Path
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
            From First Call to Final Transfer
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 sm:mt-10">
          {phases.map((p) => (
            <div key={p.n} className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-secondary-container/70">{p.n}</span>
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Icon name={p.icon} className="text-xl" />
                </div>
              </div>
              <h3 className="text-base font-bold text-on-surface leading-snug">{p.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
              <span className="mt-auto inline-flex self-start px-2.5 py-0.5 rounded-full bg-secondary-container/25 text-[#745c00] text-[10px] uppercase font-bold tracking-wider">
                {p.phase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}