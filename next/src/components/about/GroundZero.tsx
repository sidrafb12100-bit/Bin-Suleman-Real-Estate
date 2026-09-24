import Icon from '@/components/Icon';

const checks = [
  'Precision Soil and Fill Analysis: Eliminating surprise foundation construction costs of PKR 1.5M - 3.0M for villa buyers.',
  'Boulevard & Park Facing Premium Validations: Direct confirmation that green belts and roundabouts are formally codified with DHA engineering.',
  'Ring Road (SL-3) Strategic Corridor Access: Real-time valuation models tracking proximity to the operational interchange.',
];

export default function GroundZero() {
  return (
    <section className="w-full bg-[#0a101d] text-white py-12 sm:py-20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-container text-[10px] uppercase font-bold tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" /> Field Inspection Log • Live
          </span>
          <p className="font-headline-sm text-headline-sm font-bold">Sector J • 1 Kanal Cluster</p>
          <p className="text-[11px] uppercase tracking-widest text-secondary-container font-bold">Coordinates Verified</p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div><p className="text-slate-400">Coordinates</p><p className="font-bold">31.4285° N, 74.4530° E</p></div>
            <div><p className="text-slate-400">Elevation Delta</p><p className="font-bold">+1.8m Natural Fill</p></div>
            <div><p className="text-slate-400">Sewer Trench</p><p className="font-bold">100% Laid</p></div>
            <div><p className="text-slate-400">Underground Grid</p><p className="font-bold">Substation 4</p></div>
            <div><p className="text-slate-400">Possession</p><p className="font-bold text-secondary-container">Verified</p></div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            <span className="text-secondary-container">Ground-Zero Mastery</span> We Don&apos;t Trade From Distance. We
            Walk Every Kanal.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-4">
            DHA Phase 9 Prism spans over 40,000 kanals with 16 distinct residential and commercial sectors. A plot
            that looks pristine on an AutoCAD master map may possess terrain depressions, electrical pylon shadows,
            or delayed infrastructure handovers.
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
            Bin Suleman maintains daily ground patrols across Sectors A through R. We cross-reference official DHA
            Lahore GIS records with actual physical elevation, asphalt road readiness, and high-tension cable
            clearances before recommending an allocation to our private clientele.
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                <Icon name="check_circle" className="text-secondary-container text-base shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}