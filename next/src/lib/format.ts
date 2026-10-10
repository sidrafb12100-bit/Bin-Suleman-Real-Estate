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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format a `YYYY-MM-DD` date string (Postgres `date` column) exactly like the
 * hand-written ledger dates: '2026-10-05' -> '05 Oct 2026'. Parsed manually
 * (no `new Date`) so timezones can never shift the day.
 */
export const formatDbDate = (iso: string | null): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return '';
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
};

/**
 * Inverse of formatDbDate: '05 Oct 2026' → '2026-10-05' (for newest/oldest
 * sorting of entries that only carry a display date). Returns '' when the
 * string can't be parsed.
 */
export const parseDisplayDate = (display: string): string => {
  const parts = display.trim().split(/\s+/);
  if (parts.length !== 3) return '';
  const [dRaw, monRaw, yRaw] = parts;
  const m = MONTHS.findIndex((name) => name.toLowerCase() === monRaw.slice(0, 3).toLowerCase()) + 1;
  const y = Number(yRaw);
  const d = Number(dRaw);
  if (!m || !y || !d) return '';
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};
