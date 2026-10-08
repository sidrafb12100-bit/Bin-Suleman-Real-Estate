import { listings, formatPKR, scheduleOf, type Listing } from '@/content/listings';
import { site } from '@/content/site';

/** One pricing-style plot card (mirrors the design mock). */
function ListingCard({ listing }: { listing: Listing }) {
  const { downPayment, monthlyInstallment, ballot, balloon, possession } = scheduleOf(listing.demand);
  const pkr = (n: number) => `PKR ${formatPKR(n)}`;

  return (
    <article
      className={
        listing.featured
          ? 'flex flex-col bg-white rounded-3xl border-2 border-[#e07b0c] p-6 sm:p-7 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)]'
          : 'flex flex-col bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.5)]'
      }
    >
      {/* Block badge + recorded date */}
      <div className="flex items-start justify-between gap-3">
        <span className="inline-block px-4 py-2 rounded-full bg-[#d3820f] text-white font-label-caps text-label-caps uppercase tracking-wider text-center">
          {listing.block}
        </span>
        <span className="font-label-caps text-label-caps uppercase text-slate-400 pt-1.5 shrink-0">
          {listing.date}
        </span>
      </div>

      {/* Title + total price */}
      <div className="flex items-start justify-between gap-4 mt-5">
        <div className="min-w-0">
          <h3 className="font-headline-md text-headline-md text-slate-900 leading-tight break-words">
            {listing.title}
          </h3>
          <p className="font-body-sm text-body-sm text-slate-500 mt-1">{listing.subtitle}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="block font-label-caps text-label-caps uppercase text-slate-400">Total Price</span>
          <span className="block font-headline-sm text-headline-sm font-extrabold text-[#e07b0c] mt-0.5">PKR</span>
          <span className="block font-headline-md text-headline-md font-extrabold text-[#e07b0c] leading-tight">
            {formatPKR(listing.demand)}
          </span>
        </div>
      </div>

      {/* Down payment / monthly installment box */}
      <div className="mt-5 rounded-2xl bg-[#fdf7ea] border border-[#f3e2c0] grid grid-cols-2 divide-x divide-[#f0e2c6]">
        <div className="p-4">
          <span className="block font-label-caps text-label-caps uppercase text-slate-500 leading-relaxed">
            Down Payment (20%)
          </span>
          <span className="block mt-2 font-headline-sm text-headline-sm font-bold text-[#e07b0c]">
            {pkr(downPayment)}
          </span>
        </div>
        <div className="p-4">
          <span className="block font-label-caps text-label-caps uppercase text-slate-500 leading-relaxed">
            Monthly Installment
          </span>
          <span className="block mt-2 font-headline-sm text-headline-sm font-bold text-slate-900">
            {pkr(monthlyInstallment)}
          </span>
          <span className="block font-body-sm text-body-sm text-slate-400">(1%)</span>
        </div>
      </div>

      {/* Schedule rows */}
      <div className="mt-5 pt-5 border-t border-slate-200 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-4">
          <span className="font-body-md text-body-md text-slate-500">Ballot Payment (10%):</span>
          <span className="font-label-lg text-label-lg font-bold text-slate-900 text-right">{pkr(ballot)}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="font-body-md text-body-md text-slate-500">4 Balloon Payments (5%):</span>
          <span className="font-label-lg text-label-lg font-bold text-slate-900 text-right">{pkr(balloon)} ea</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="font-body-md text-body-md text-slate-500">Possession (20%):</span>
          <span className="font-label-lg text-label-lg font-bold text-slate-900 text-right">{pkr(possession)}</span>
        </div>
      </div>

      <a
        href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
          `I'm interested in the ${listing.ref} plot, DHA Phase 9 Prism. Please share details.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#25D366] text-[#062b16] font-label-lg text-label-lg uppercase font-bold tracking-wide hover:bg-[#1ebe57] active:scale-[0.99] transition-all"
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">chat</span>
        Contact on WhatsApp
      </a>
    </article>
  );
}

/** The Listings page's single section — DHA Prism 9 Plots (all active listings). */
export default function ListingsSection() {
  return (
    <section id="listing-grid" aria-label="DHA Prism 9 Plots" className="relative w-full overflow-hidden bg-[#0b1329] py-space-xl lg:py-24">
      {/* Ambient glows */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-16 h-[420px] w-[420px] rounded-full bg-[#e07b0c]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-gutter-mobile sm:px-gutter">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-space-md py-space-xs rounded-full bg-secondary-container/15 text-secondary-container font-label-caps text-label-caps uppercase tracking-wider">
            Current Inventory &bull; Direct Plots
          </span>
          <h2 className="font-headline-lg text-headline-lg text-surface-bright mt-space-xs">
            DHA Prism 9 Plots
          </h2>
          <p className="font-body-md text-body-md text-slate-300 mt-space-sm">
            All active listings currently on our desk &mdash; every card shows the plot reference, the date the
            demand was recorded, and the full schedule of payments &mdash; 20% down payment, 1% monthly
            installment, 10% ballot, four 5% balloon payments and 20% on possession. Tap the WhatsApp button on
            any plot to reach us directly with a pre-filled enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mt-space-lg items-start">
          {listings.map((listing) => (
            <ListingCard key={listing.ref} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}