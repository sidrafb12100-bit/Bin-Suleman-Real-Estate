import ContactForm from '@/components/contact/ContactForm';
import ContactSections from '@/components/contact/ContactSections';

export const metadata = {
  title: 'Contact Us | Bin Suleman Real Estate & Builders',
  description:
    'Schedule a consultation with Bin Suleman Real Estate & Builders at DHA Phase 9 Prism, Lahore — or reach the Overseas Pakistani concierge desk from anywhere.',
};

export default function ContactPage() {
  return (
    <main className="w-full bg-surface min-h-screen overflow-x-hidden">
      <ContactForm />
      <ContactSections />
    </main>
  );
}