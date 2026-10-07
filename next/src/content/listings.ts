export type Listing = {
  /** Plot reference from the ledger, e.g. 'A-356'. */
  ref: string;
  /** Block badge shown top-left on the card, e.g. 'A Block'. */
  block: string;
  title: string;
  subtitle: string;
  /** Owner's asking demand in PKR (recorded ledger value). */
  demand: number;
  /** Date the demand was recorded, formatted for display. */
  date: string;
  /** True when the owner marked the demand as final (non-negotiable). */
  final?: boolean;
  /** Highlighted card — orange border in the design. */
  featured?: boolean;
};

/**
 * Direct plots currently on the desk (source: handwritten demand ledger,
 * "Direct plots with date"). Units from the ledger: "cr" = crore,
 * plain numbers / "lac" = lakh. The cards, derived schedule of payments
 * and totals all compute from this array.
 */
export const listings: Listing[] = [
  {
    ref: 'A-356',
    block: 'A Block',
    title: 'Plot A-356',
    subtitle: 'Direct plot',
    demand: 40_000_000,
    date: '05 Oct 2026',
    featured: true,
  },
  {
    ref: 'A-1043',
    block: 'A Block',
    title: 'Plot A-1043',
    subtitle: 'Direct plot',
    demand: 40_000_000,
    date: '02 Oct 2026',
  },
  {
    ref: 'F-23+24',
    block: 'F Block — Pair',
    title: 'Plots F-23 + F-24',
    subtitle: 'Contiguous plot pair',
    demand: 90_000_000,
    date: '05 Oct 2026',
  },
  {
    ref: 'F-820',
    block: 'F Block',
    title: 'Plot F-820',
    subtitle: "Owner's final demand",
    demand: 43_500_000,
    date: '02 Oct 2026',
    final: true,
  },
  {
    ref: 'Q-820',
    block: 'Q Block',
    title: 'Plot Q-820',
    subtitle: "Owner's final demand",
    demand: 36_000_000,
    date: '02 Oct 2026',
    final: true,
  },
  {
    ref: 'Q-1262',
    block: 'Q Block',
    title: 'Plot Q-1262',
    subtitle: 'Direct plot',
    demand: 13_000_000,
    date: '25 Nov 2026',
  },
  {
    ref: 'F-1843',
    block: 'F Block',
    title: 'Plot F-1843',
    subtitle: "Owner's final demand",
    demand: 30_500_000,
    date: '22 Nov 2026',
    final: true,
  },
  {
    ref: 'L-1434',
    block: 'L Block',
    title: 'Plot L-1434',
    subtitle: 'Direct plot',
    demand: 17_000_000,
    date: '18 Nov 2026',
  },
];

/** Format a PKR amount with western grouping: 40000000 -> '40,000,000'. */
export const formatPKR = (amount: number): string =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/** Schedule-of-payment splits derived from a demand (mirrors the card design). */
export const scheduleOf = (demand: number) => ({
  downPayment: Math.round(demand * 0.2),
  monthlyInstallment: Math.round(demand * 0.01),
  ballot: Math.round(demand * 0.1),
  balloon: Math.round(demand * 0.05),
  possession: Math.round(demand * 0.2),
});