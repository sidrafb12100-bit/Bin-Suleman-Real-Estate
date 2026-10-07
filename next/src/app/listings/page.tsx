import ListingsSection from '@/components/listings/ListingsSection';

export const metadata = {
  title: 'Listings | Bin Suleman Real Estate & Builders',
  description:
    'Direct plot listings from Bin Suleman Real Estate & Builders: plot references, recorded demand dates and a full schedule of payments for direct booking.',
};

export default function ListingsPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-[#0b1329]">
      <ListingsSection />
    </main>
  );
}
