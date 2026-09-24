import ServicesHero from '@/components/services/ServicesHero';
import ServiceSpectrum from '@/components/services/ServiceSpectrum';
import ServicesTimeline from '@/components/services/ServicesTimeline';
import ServicesFees from '@/components/services/ServicesFees';
import ServicesConsult from '@/components/services/ServicesConsult';

export const metadata = {
  title: 'Services | Bin Suleman Real Estate & Builders',
  description:
    'Verified plot selection, DHA file transfer, legal documentation and turnkey architectural construction in DHA Phase 9 Prism, Lahore.',
};

export default function ServicesPage() {
  return (
    <main className="w-full bg-surface min-h-screen overflow-x-hidden">
      <ServicesHero />
      <ServiceSpectrum />
      <ServicesTimeline />
      <ServicesFees />
      <ServicesConsult />
    </main>
  );
}