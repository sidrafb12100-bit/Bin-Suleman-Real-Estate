export const site = {
  brand: 'Bin Suleman',
  brandSuffix: 'Real Estate & Builders',
  phoneDisplay: '+92 42 111 277 999',
  phoneDisplayShort: '(042) 111-277-999',
  phoneHref: 'tel:+9242111277999',
  /** Real WhatsApp (mobile) number of the owner, E.164 without '+'. */
  whatsappNumber: '923244459815',
  whatsappDisplay: '+92 324 4459815',
  get whatsappHref() {
    return 'https://wa.me/' + this.whatsappNumber;
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Listings', href: '/listings' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
  socials: {
    facebook: 'https://www.facebook.com/BinSulemanRealEstateOfficial',
    youtube: 'https://www.youtube.com/@BinSulemanRealEstate',
    tiktok: 'https://www.tiktok.com/@binsulemanrealestate?is_from_webapp=1&sender_device=pc',
    instagram: 'https://www.instagram.com/binsulemanrealestate/',
  },
  address: 'Suite 104, Main Commercial Boulevard, DHA Phase 9 Prism, Lahore, Pakistan.',
  hours: 'Mon – Sat: 10:00 AM – 7:00 PM',
  videoId: 'oKLqG8-YquY',
  poster: '/images/img-9-ab6axub5xgvc.jpg',
  logo: '/images/bsr-logo.png',
  title: 'Bin Suleman Real Estate & Builders | DHA Phase 9 Prism Lahore',
  description:
    'Official sales partner for DHA Phase 9 Prism Lahore. Verified residential and commercial plots, file transfers and turnkey construction with institutional diligence.',
} as const;

export type SiteConfig = typeof site;