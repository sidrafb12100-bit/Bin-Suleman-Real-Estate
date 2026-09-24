import Icon from '@/components/Icon';

const fees = [
  { label: 'DHA Official Transfer Fee', note: 'Payable directly to DHA Lahore via Bank Pay Order', value: 'PKR 145,000' },
  { label: 'Advance Tax (FBR 236K) · Active Filer Rate', note: 'Calculated at statutory FBR DC valuation rate', value: '3% of Valuation' },
  { label: 'Punjab Govt Stamp Duty & TMA Tax', note: 'Local government e-stamping generation fee', value: '1% of DC Rate' },
  { label: 'Cantt Board Tax (CBT) & IT Charges', note: 'Administrative stamp and verification clearance', value: 'PKR 12,500' },
  { label: 'Bin Suleman Comprehensive Service Guarantee', note: 'Includes contour survey, NDC processing & DHA escort', value: '1.0% Fixed' },
];

export default function ServicesFees() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
          Absolute Transparency
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
          DHA Transfer Expenses &amp; Fee Breakdown
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
          We operate with zero covert surcharges or hidden commissions. Review the standard statutory fee obligations
          required by DHA Lahore and the Federal Board of Revenue (FBR).
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-slate-200/70">
          <Icon name="info" className="text-secondary text-xl shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-on-surface-variant"><strong className="text-on-surface">Filer vs Non-Filer Status:</strong> Active tax filers enjoy 50% to 75% reductions on FBR 236K (Advance Tax) rates at transfer execution.</p>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-slate-200/70">
          <Icon name="verified" className="text-secondary text-xl shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-on-surface-variant"><strong className="text-on-surface">Fixed Dealer Commission:</strong> Standard 1% broker advisory fee across direct plot purchase with full legal indemnification.</p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <p className="font-bold text-sm sm:text-base">Standard DHA 1 Kanal Transfer Schedule</p>
          <span className="text-[10px] uppercase tracking-widest text-secondary-container font-bold">Updated Q1 2025</span>
        </div>
        {fees.map((f, i) => (
          <div key={f.label} className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${i % 2 ? 'bg-white' : 'bg-surface-container-low/60'}`}>
            <div>
              <p className="text-sm font-bold text-on-surface">{f.label}</p>
              <p className="text-xs text-on-surface-variant">{f.note}</p>
            </div>
            <p className="text-sm sm:text-base font-extrabold text-[#745c00] whitespace-nowrap">{f.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}