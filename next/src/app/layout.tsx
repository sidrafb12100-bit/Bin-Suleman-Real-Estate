import type { Metadata } from 'next';
import { site } from '@/content/site';
import SiteHeader from '@/components/SiteHeader';
import PageWipe from '@/components/PageWipe';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: {
    icon: [{ url: '/images/favicon.ico' }],
    apple: [{ url: '/images/bsr-logo.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased">
        <SiteHeader />
        {children}
        <Footer />
        <WhatsAppFloat />
        <PageWipe />
      </body>
    </html>
  );
}