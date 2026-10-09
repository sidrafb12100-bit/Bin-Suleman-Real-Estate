import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Bin Suleman Real Estate & Builders',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen bg-[#0b1329] py-space-lg">
      <div className="max-w-5xl mx-auto px-gutter-mobile sm:px-gutter">{children}</div>
    </main>
  );
}
