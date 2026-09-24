import Link from 'next/link';
import Icon from '@/components/Icon';

const disciplines = [
  {
    icon: 'villa', tag: '5M · 10M · 1K · 2K', title: 'Residential Plot Advisory & Acquisition',
    desc: 'Navigate Sectors A through R with verified ground elevations, contour analysis, sewerage trunk alignments, and direct seller allocations.',
    items: ['Ground Elevation Vetting: Avoiding low-lying or depression plots', 'Sector Comparative Data: Price volatility & possession timelines', 'Category Premium Audits: Corner, park-facing, and 150ft boulevard premiums'],
    footer: 'Key Focus Sectors', footerv: 'Sectors A, B, C, D, J, K, Q', link: 'Consult Plots',
  },
  {
    icon: 'domain', tag: '4 Marla & 8 Marla Commercial', title: 'Commercial Investment & File Trading',
    desc: 'High-yield strategic positioning along the Main Civic Centre, Oval Complex, and the monumental 150-ft Ring Road connecting corridors.',
    items: ['ROI Forecaster: 24-month capital gains models for corporate portfolios', 'File Authenticity Seal: Zero dispute open/allocation file transfer guarantees', 'Corporate Plazas & Strip Retail: Joint venture architectural frameworks'],
    footer: 'Target Corridors', footerv: 'Zone-1, Zone-2 & Ring Road Front', link: 'Commercial Portfolio',
  },
  {
    icon: 'gavel', tag: 'DHA Office Verified', title: 'Document Verification & Legal Transfer',
    desc: 'Ironclad transaction security. We escort you through every step at the DHA Lahore Main Office Complex, resolving dues, NDCs, and POAs.',
    items: ['NDC & Surcharge Clearance: Audit of pending DHA development charges', 'Overseas Client Desk: Embassy-attested Power of Attorney execution', 'FBR / Tax Filer Advisory: Minimizing stamp duties & capital gains tax legally'],
    footer: 'Assistance Timeline', footerv: '7 to 10 Working Days (Direct)', link: 'Transfer Desk',
  },
  {
    icon: 'architecture', tag: 'Builders Division', title: 'Architectural Design & Turnkey Construction',
    desc: 'Bin Suleman Builders designs and constructs high-end custom villas adhering strictly to DHA Phase 9 Prism building bye-laws and structural guidelines.',
    items: ['Grey Structure & Turnkey: Grade-60 steel, OPC cement, Italian porcelain', 'DHA Map Approvals: Full architectural submission, MEF & structure drawing vetting', 'Fixed Price Contracts: Transparent BOQ with zero escalation'],
    footer: 'Delivery Model', footerv: 'Turnkey · Grey Structure', link: 'Build With Us',
  },
];

export default function ServiceSpectrum() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
          Master Service Spectrum
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
          Four Disciplines. Total Precision.
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-4">
          Bespoke representation whether you are purchasing high-altitude residential parcels, commercial avenues, or
          executing grey structure villa construction.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10">
        {disciplines.map((d) => (
          <div key={d.title} className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Icon name={d.icon} className="text-2xl" />
              </div>
              <span className="inline-flex px-2.5 py-0.5 rounded-full bg-secondary-container/25 text-[#745c00] text-[10px] uppercase font-bold tracking-wider">
                {d.tag}
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface leading-snug">{d.title}</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{d.desc}</p>
            <ul className="flex flex-col gap-2.5">
              {d.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-on-surface-variant">
                  <Icon name="check_circle" className="text-secondary text-base shrink-0 mt-0.5" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface-variant uppercase tracking-wide">{d.footer}</span>
              <span className="font-bold text-on-surface">{d.footerv}</span>
            </div>
            <Link href="#booking-section" className="text-sm font-bold text-secondary hover:text-on-surface transition-colors flex items-center gap-1">
              {d.link} <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}