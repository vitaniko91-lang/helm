import { cx } from '../lib/cx'

interface PaperGrainProps {
  className?: string
}

// Static fractal-noise tile, desaturated. Generated once as an inline SVG
// data-URI (no network request, no animation). Multiply-blended at very low
// opacity so it darkens only the speckle highs — a faint print/tactile grain.
const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#g)'/></svg>"

const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`

/**
 * Subtle, static paper grain overlay. Fixed, non-interactive, sits above the
 * page background but below content. No animation — purely tactile texture.
 */
export function PaperGrain({ className }: PaperGrainProps) {
  return (
    <div
      aria-hidden
      className={cx(
        'pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-multiply',
        className,
      )}
      style={{ backgroundImage: NOISE_URL, backgroundSize: '140px 140px' }}
    />
  )
}
