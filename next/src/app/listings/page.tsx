import ListingsHero from '@/components/listings/ListingsHero';
import ListingsGrid from '@/components/listings/ListingsGrid';
import ListingsCta from '@/components/listings/ListingsCta';

export const metadata = {
  title: 'Listings | Bin Suleman Real Estate & Builders',
  description:
    'Live inventory for DHA Phase 9 Prism Lahore: possession-ready residential plots, commercial avenue parcels and verified DHA files, inspected on-ground by Bin Suleman Real Estate & Builders.',
};

export default function ListingsPage() {
  return (
    <main className="w-full bg-surface min-h-screen overflow-x-hidden">
      <ListingsHero />
      <ListingsGrid />
      <ListingsCta />
    </main>
  );
}
