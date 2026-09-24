import Icon from '@/components/Icon';

const steps = [
  {
    n: '01', icon: 'rate_review', title: 'Understand Your Needs',
    desc: 'We schedule an in-depth advisory session (in-person at our Prism office or via secure video call) to pinpoint timeline, preferred sector zoning, and financial parameters.',
  },
  {
    n: '02', icon: 'travel_explore', title: 'Explore Verified Options',
    desc: 'We review shortlisted plots with physical on-ground peg marking, elevation surveys, and DHA Master File legal verification ensuring clear non-encumbrance status.',
  },
  {
    n: '03', icon: 'handshake', title: 'On-Site Visit & Direct Transfer',
    desc: 'We guide you physically through the sector grounds, finalize token with the registered owner, and oversee DHA transfer documentation from start to finish.',
  },
];

export default function Protocol() {
  return (
    <section className="w-full py-10 sm:py-16 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
            Transparent Execution Protocol
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
            How Bin Suleman Protects Your Capital
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
            From first inquiry to the official DHA transfer counter signature, every milestone is structured for full
            transparency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
          {steps.map((p) => (
            <div key={p.n} className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-slate-200/70 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-secondary-container/70">{p.n}</span>
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Icon name={p.icon} className="text-xl" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface">{p.title}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}