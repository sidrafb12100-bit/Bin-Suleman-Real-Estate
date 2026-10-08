import ListingsSection from '@/components/listings/ListingsSection';

export const metadata = {
  title: 'Listings | Bin Suleman Real Estate & Builders',
  description:
    'DHA Prism 9 Plots and DHA Phase 5 requirements from Bin Suleman Real Estate & Builders: plot references, recorded demand dates, a full schedule of payments and one-tap WhatsApp enquiry.',
};

export default function ListingsPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-[#0b1329]">
      <ListingsSection />
    </main>
  );
}
