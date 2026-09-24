import Icon from '@/components/Icon';

const sectors = [
  { title: 'Sectors A, B, C & D', tag: 'First Possession', desc: 'High ground elevation, nearest to Main Grand Entrance Gate. Home to championship golf course perimeter and community clubs.' },
  { title: 'Sectors J, K, L & P', tag: 'Rapid Growth', desc: 'The sweet spot for mid-term capital multiplication. Asphalt laying and underground utility electrification nearing completion.' },
  { title: 'Sectors Q & R', tag: 'Maximum ROI', desc: 'Positioned right by secondary Southern Ring Road interchange. Prime destination for institutional files and commercial strips.' },
];

export default function Masterplan() {
  return (
    <section className="w-full bg-surface-container-low border-y border-slate-200/70 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
              Masterplan Analysis
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
              Get to Know DHA Phase 9 Prism, Lahore
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
              The largest, most ambitious phase ever developed by Defence Housing Authority Lahore. Spanning
              strategically between Lahore Ring Road, Ferozepur Road, and Bedian Road.
            </p>
            <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Icon name="explore" className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Prime Arterial Tri-Junction</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Direct Ring Road Interchange Connectivity — Only 8 minutes from Allama Iqbal International Airport,
                  10 minutes from Phase 5 &amp; 6, and 15 minutes from Gulberg via Ring Road Expressway.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {sectors.map((s) => (
              <div
                key={s.title}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
              >
                <div className="flex-1">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full bg-secondary-container/25 text-[#745c00] text-[10px] uppercase font-bold tracking-wider">
                    {s.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface mt-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}