/**
 * Material Symbols icon (font-based, same glyph set as the original site).
 * Kept as a font (not SVGs) for 1:1 visual parity; subsetting is a
 * documented follow-up optimisation.
 */
export default function Icon({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true">
      {name}
    </span>
  );
}