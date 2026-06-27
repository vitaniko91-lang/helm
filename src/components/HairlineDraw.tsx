import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

type Tone = 'line' | 'ink' | 'oxblood'

const tone: Record<Tone, string> = {
  line: 'bg-line',
  ink: 'bg-ink',
  oxblood: 'bg-oxblood',
}

interface HairlineDrawProps {
  className?: string
  color?: Tone
  delay?: number
  /** Decorative by default; set false when it acts as a real <hr> separator. */
  decorative?: boolean
}

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Editorial divider / underline that draws in from the left (scaleX) on view.
 * Reduced motion → full width instantly. Animates transform only.
 */
export function HairlineDraw({
  className,
  color = 'line',
  delay = 0,
  decorative = true,
}: HairlineDrawProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const drawn = reduced || inView

  return (
    <motion.div
      ref={ref}
      role={decorative ? undefined : 'separator'}
      aria-hidden={decorative ? true : undefined}
      className={cx('h-px w-full origin-left', tone[color], className)}
      initial={reduced ? false : { scaleX: 0 }}
      animate={{ scaleX: drawn ? 1 : 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    />
  )
}
