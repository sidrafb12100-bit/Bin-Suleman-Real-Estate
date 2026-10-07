export type Listing = {
  ref: string;
  title: string;
  /** 'residential' | 'commercial' | 'file' — used by the filter tabs. */
  type: 'residential' | 'commercial' | 'file';
  sector: string;
  size: string;
  price: string;
  status: string;
  statusTone: 'gold' | 'green' | 'blue';
  blurb: string;
  image: string;
};

/**
 * Listings shown on the /listings page.
 * Replace these placeholder entries with the live inventory — the cards,
 * filters and counts all derive from this array.
 */
export const listings: Listing[] = [
  {
    ref: 'BSR-R-101',
    title: '10 Marla Residential Plot',
    type: 'residential',
    sector: 'Sector A — Possession Ready',
    size: '10 Marla (200 sq yd)',
    price: 'PKR 2.65 Cr',
    status: 'Possession Ready',
    statusTone: 'green',
    blurb: 'High ground elevation on a 40ft street, park-facing corner. Clear title, NDC verified, ready for immediate transfer.',
    image: '/images/img-10-ab6axubgmm7f.jpg',
  },
  {
    ref: 'BSR-R-102',
    title: '1 Kanal Residential Plot',
    type: 'residential',
    sector: 'Sector J — Central Boulevard',
    size: '1 Kanal (450 sq yd)',
    price: 'PKR 5.90 Cr',
    status: 'New Listing',
    statusTone: 'gold',
    blurb: 'Prime boulevard-adjacent parcel with direct park sightlines. Ideal for a custom villa build under DHA building controls.',
    image: '/images/img-17-ab6axuc64igh.jpg',
  },
  {
    ref: 'BSR-R-103',
    title: '5 Marla Residential Plot',
    type: 'residential',
    sector: 'Sector Q — Growth Zone',
    size: '5 Marla (125 sq yd)',
    price: 'PKR 1.35 Cr',
    status: 'Possession Ready',
    statusTone: 'green',
    blurb: 'Entry-size plot on a quiet internal street near the sector park. Verified documentation with zero encumbrances.',
    image: '/images/img-18-ab6axucdzpct.jpg',
  },
  {
    ref: 'BSR-C-201',
    title: 'Main Commercial Avenue Parcel',
    type: 'commercial',
    sector: 'Main Commercial Avenue',
    size: '4 Marla Commercial',
    price: 'PKR 8.20 Cr',
    status: 'High Yield',
    statusTone: 'gold',
    blurb: 'Frontage on the principal avenue with heavy daily traffic. Suited for retail flagship, clinic or branded food outlet.',
    image: '/images/img-21-ab6axucmkmqe.jpg',
  },
  {
    ref: 'BSR-C-202',
    title: 'Boulevard Commercial Strip',
    type: 'commercial',
    sector: 'Sector K — Commercial Hub',
    size: '2 Marla Commercial',
    price: 'PKR 3.40 Cr',
    status: 'Rental Demand',
    statusTone: 'blue',
    blurb: 'Compact income-producing frontage opposite the sector market. Existing lease in place at a market-rate yield.',
    image: '/images/img-22-ab6axucpsm4v.jpg',
  },
  {
    ref: 'BSR-F-301',
    title: 'DHA Phase 9 Prism File (1 Kanal)',
    type: 'file',
    sector: 'Balloted File — Sector allotment on possession',
    size: '1 Kanal File',
    price: 'PKR 4.15 Cr',
    status: 'Verified File',
    statusTone: 'blue',
    blurb: 'Full chain-of-custody file with original DHA receipt set. Transfer handled end-to-end at the DHA transfer center.',
    image: '/images/img-23-ab6axucyk1m8.jpg',
  },
];

export const listingFilters: Array<{ id: Listing['type'] | 'all'; label: string }> = [
  { id: 'all', label: 'All Listings' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'file', label: 'Files' },
];
