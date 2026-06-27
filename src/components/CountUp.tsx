import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '../lib/useReducedMotion'

interface CountUpProps {
  /** Target value to count to. */
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  /** Group thousands (e.g. 12,500). */
  group?: boolean
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function format(value: number, decimals: number, group: boolean): string {
  if (group) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }
  return value.toFixed(decimals)
}

/**
 * Counts a number from 0 to `to` once when scrolled into view, via rAF + easeOut.
 * Reduced motion → the final value is shown instantly with no rAF.
 * The accessible label always reflects the final value (the animating digits are
 * hidden from assistive tech so screen readers hear "92%", not every frame).
 */
export function CountUp({
  to,
  duration = 1500,
  prefix = '',
  suffix = '',
  decimals = 0,
  group = false,
  className,
}: CountUpProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(reduced ? to : 0)
  const started = useRef(false)

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return
    }
    if (!inView || started.current) return
    started.current = true

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(to * easeOutCubic(t))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setValue(to)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, to, duration])

  const finalLabel = `${prefix}${format(to, decimals, group)}${suffix}`
  const display = `${prefix}${format(value, decimals, group)}${suffix}`

  return (
    <span ref={ref} className={className} aria-label={finalLabel}>
      <span aria-hidden>{display}</span>
    </span>
  )
}
