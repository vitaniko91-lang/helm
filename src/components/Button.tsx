import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

type Variant = 'link' | 'solid' | 'ghost'

interface ButtonProps {
  variant?: Variant
  /** Renders an <a> when present, otherwise a <button type="button">. */
  href?: string
  children: ReactNode
  className?: string
  /** Trailing "→". Defaults on for `link` (the editorial CTA), off otherwise. */
  arrow?: boolean
  /** Subtle pull-toward-cursor. Defaults on for `link`/`solid`, off for `ghost`. */
  magnetic?: boolean
  onClick?: (event: MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  target?: string
  rel?: string
  'aria-label'?: string
}

const ringFocus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  // Oxblood text CTA — the underline grows from the left on hover/focus.
  link: cx(
    'group relative inline-flex items-center gap-1.5 font-sans font-medium text-oxblood',
    'transition-colors duration-200 ease-out hover:text-oxblood-soft rounded-[2px]',
    ringFocus,
  ),
  // Filled oxblood — quiet, with a press-scale and a soft hover tint.
  solid: cx(
    'inline-flex items-center gap-1.5 rounded-[3px] bg-oxblood px-5 py-3 font-sans text-sm font-medium text-paper-base',
    'transition-[background-color,transform] duration-200 ease-out hover:bg-oxblood-soft',
    'active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100',
    ringFocus,
  ),
  // Ink text that warms to oxblood on hover.
  ghost: cx(
    'inline-flex items-center gap-1.5 rounded-[3px] px-5 py-3 font-sans text-sm font-medium text-ink',
    'transition-[color,transform] duration-200 ease-out hover:text-oxblood',
    'active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100',
    ringFocus,
  ),
}

const SPRING = { stiffness: 170, damping: 17, mass: 0.1 }
const STRENGTH = 0.22
const MAX_OFFSET = 8

export function Button({
  variant = 'link',
  href,
  children,
  className,
  arrow,
  magnetic,
  onClick,
  type = 'button',
  target,
  rel,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const reduced = useReducedMotion()
  const wrapperRef = useRef<HTMLSpanElement>(null)

  // Magnetic offset — always declared (hooks must be unconditional), only wired
  // up when motion is allowed and the variant opts in.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0)`

  const showArrow = arrow ?? variant === 'link'
  const wantsMagnetic = magnetic ?? variant !== 'ghost'
  const enableMagnetic = wantsMagnetic && !reduced

  const clamp = (value: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value))

  const handleMove = (event: { clientX: number; clientY: number }) => {
    const el = wrapperRef.current
    if (!enableMagnetic || !el) return
    const rect = el.getBoundingClientRect()
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * STRENGTH))
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * STRENGTH))
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const label =
    variant === 'link' ? (
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:duration-0"
        />
      </span>
    ) : (
      children
    )

  const content = (
    <>
      {label}
      {showArrow && (
        <span
          aria-hidden
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          →
        </span>
      )}
    </>
  )

  const classes = cx(variants[variant], className)

  const element = href ? (
    <a href={href} className={classes} target={target} rel={rel} aria-label={ariaLabel} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {content}
    </button>
  )

  if (!enableMagnetic) return element

  return (
    <motion.span
      ref={wrapperRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ transform }}
      className="inline-flex align-middle"
    >
      {element}
    </motion.span>
  )
}
