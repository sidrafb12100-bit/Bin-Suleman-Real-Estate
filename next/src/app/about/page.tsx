import AboutHero from '@/components/about/AboutHero';
import AboutPillars from '@/components/about/AboutPillars';
import GroundZero from '@/components/about/GroundZero';
import LeaderCard from '@/components/LeaderCard';
import AboutStandards from '@/components/about/AboutStandards';
import AboutTestimonials from '@/components/about/AboutTestimonials';
import AboutCta from '@/components/about/AboutCta';
import { leaders } from '@/content/team';

export const metadata = {
  title: 'About Us | Bin Suleman Real Estate & Builders',
  description:
    'Bin Suleman Real Estate & Builders — fiduciary DHA Lahore advisory built on transparency, on-ground verification and document diligence.',
};

export default function AboutPage() {
  return (
    <main className="w-full bg-surface min-h-screen overflow-x-hidden">
      <AboutHero />
      <AboutPillars />
      <GroundZero />
      <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">
            Architects of Trust
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
            Executive Advisory Leadership
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
          {leaders.map((l) => (
            <LeaderCard key={l.name} leader={l} />
          ))}
        </div>
      </section>
      <AboutStandards />
      <AboutTestimonials />
      <AboutCta />
    </main>
  );
}