import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogRadar from '@/components/blog/BlogRadar';

export const metadata = {
  title: 'Market Intelligence & News | Bin Suleman Real Estate & Builders',
  description:
    'DHA Phase 9 Prism market intelligence: infrastructure progress, possession updates, balloting results and sector price trends from licensed engineers and registered DHA consultants.',
};

export default function BlogPage() {
  return (
    <main className="w-full bg-surface min-h-screen overflow-x-hidden">
      <BlogHero />
      <BlogGrid />
      <BlogNewsletter />
      <BlogRadar />
    </main>
  );
}