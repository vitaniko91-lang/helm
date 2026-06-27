import { useRef, type ElementType, type ReactNode } from 'react'
import { motion, useInView, type Variants } from 'motion/react'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

type Tag = 'h1' | 'h2' | 'h3' | 'span' | 'p'

interface MaskRevealProps {
  /** Text to reveal. Split on "\n" so the designer controls line breaks. */
  text?: string
  /** Used when `text` is omitted. Strings are split on "\n"; nodes render as one line. */
  children?: ReactNode
  as?: Tag
  className?: string
  /** Per-line className (e.g. tracking/leading tweaks on the serif). */
  lineClassName?: string
  /** Begin when scrolled into view (default). False → reveal on mount. */
  startOnView?: boolean
  delay?: number
}

const EASE = [0.23, 1, 0.32, 1] as const

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
}

// Each line rises from fully below its own mask box into place — slow + weighty.
const line: Variants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.75, ease: EASE } },
}

function toLines(text: string | undefined, children: ReactNode): ReactNode[] {
  if (text != null) return text.split('\n')
  if (typeof children === 'string') return children.split('\n')
  return [children]
}

/**
 * THE hero signature. Renders an editorial headline that reveals line-by-line:
 * each line sits in an `overflow-hidden` mask and rises into view, staggered.
 * Reduced motion → text is rendered fully in place, instantly, no transform.
 */
export function MaskReveal({
  text,
  children,
  as = 'span',
  className,
  lineClassName,
  startOnView = true,
  delay = 0.05,
}: MaskRevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const play = reduced || !startOnView || inView
  // Polymorphic motion tag — cast to ElementType so the union of element refs
  // collapses to a single permissive signature.
  const Tag = motion[as] as ElementType
  const lines = toLines(text, children)

  return (
    <Tag
      ref={ref}
      className={className}
      variants={container}
      custom={delay}
      initial={reduced ? 'visible' : 'hidden'}
      animate={play ? 'visible' : 'hidden'}
    >
      {lines.map((content, i) => (
        // Mask box: small vertical padding gives serif descenders/ascenders room
        // so overflow-hidden never clips the resting glyphs.
        <span
          key={i}
          className={cx('block overflow-hidden pb-[0.08em] pt-[0.02em]', lineClassName)}
        >
          <motion.span className="block" variants={reduced ? undefined : line}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
