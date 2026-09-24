import Hero from '@/components/home/Hero';
import Advisory from '@/components/home/Advisory';
import Masterplan from '@/components/home/Masterplan';
import Matrix from '@/components/home/Matrix';
import Protocol from '@/components/home/Protocol';
import VideoShowreel from '@/components/VideoShowreel';
import HomeConsult from '@/components/home/HomeConsult';

export default function HomePage() {
  return (
    <main className="w-full bg-surface min-h-screen overflow-x-hidden">
      <Hero />
      <Advisory />
      <Masterplan />
      <Matrix />
      <Protocol />
      <VideoShowreel />
      <HomeConsult />
    </main>
  );
}