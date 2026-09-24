import Icon from '@/components/Icon';

const quotes = [
  {
    initials: 'MK',
    name: 'Dr. M. Kamran Siddiqui',
    role: 'Consultant Surgeon • Manchester, UK (Owner, 1 Kanal Sector C)',
    quote:
      'Living in Manchester, investing in DHA Phase 9 Prism felt like a high-risk gamble until I engaged Bin Suleman. Suleman Bhai provided drone footage of Sector C, verified the direct owner transfer at DHA Phase 6, and orchestrated the entire transaction via biometric embassy attestation without a single glitch.',
  },
  {
    initials: 'TA',
    name: 'Tariq & Asad Mansoor',
    role: 'Directors, Alpha Logistics Group • Lahore / Dubai',
    quote:
      "What sets Bin Suleman apart from typical DHA agents is their architectural integration. They didn't just sell us two commercial 4-marla plots in Prism Boulevard; their engineering team calculated the rental yield on a 6-storey plaza and handled soil tests before we signed the contract.",
  },
];

export default function AboutTestimonials() {
  return (
    <section className="w-full bg-surface-container-low border-y border-slate-200/70 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
            What Our Overseas &amp; Resident Partners Say
          </h2>
          <p className="text-xs uppercase tracking-widest text-secondary font-bold mt-2">
            Real Buyers • Verified DHA Allocations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-8">
          {quotes.map((q) => (
            <div key={q.name} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-0.5 text-secondary-container">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" className="text-lg" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">“{q.quote}”</p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100">
                <span className="w-10 h-10 rounded-full bg-slate-900 text-secondary-container flex items-center justify-center text-xs font-bold">
                  {q.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-on-surface">{q.name}</p>
                  <p className="text-[11px] text-on-surface-variant">{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}