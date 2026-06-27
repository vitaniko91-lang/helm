import { useEffect, useRef } from 'react'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

interface LivingMarginProps {
  className?: string
}

// --- Tuning -----------------------------------------------------------------
const LINES = 16 // fine contour count (kept low for perf)
const STEP = 18 // px between sampled points along a contour
const BASE_ALPHA = 0.06 // ~6% oxblood — within the 5–7% editorial brief
const OX = '123, 45, 38' // oxblood #7B2D26 as rgb
const POINTER_RADIUS = 150 // px — cursor influence falloff
const POINTER_SHIFT = 16 // px — max vertical "parting" near the cursor
const DPR_CAP = 2

type Debounced = { (): void; cancel: () => void }

function debounce(fn: () => void, ms: number): Debounced {
  let id: ReturnType<typeof setTimeout> | undefined
  const wrapped = () => {
    if (id) clearTimeout(id)
    id = setTimeout(fn, ms)
  }
  wrapped.cancel = () => {
    if (id) clearTimeout(id)
  }
  return wrapped
}

/**
 * The "alive" signature, editorial register. A fixed full-viewport canvas drawing
 * slow-drifting fine contour/topographic lines in oxblood (~6% opacity),
 * concentrated toward the wide left/right margins via a per-side alpha gradient
 * that fades to zero across the central reading column — so text is never touched.
 * Subtly cursor-aware: contours part and brighten slightly near the pointer.
 *
 * Perf: rAF loop, 16 lines × 2 single strokes/frame, DPR capped at 2, paused on
 * hidden tab, debounced resize, full cleanup on unmount. Transform/canvas only.
 * Reduced motion → ONE static contour frame, no loop, no pointer listener.
 */
export function LivingMargin({ className }: LivingMarginProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      ctx = null
    }
    if (!ctx) return // jsdom / unsupported — render nothing, start no loop
    const context = ctx

    let width = 0
    let height = 0
    let raf = 0
    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const t = time * 0.00012 // slow drift
      const center = width / 2
      const innerHalf = Math.min(width * 0.3, 420) // central reading column kept clear
      const innerLeft = center - innerHalf
      const innerRight = center + innerHalf

      context.lineWidth = 1
      context.lineCap = 'round'

      for (let i = 0; i < LINES; i++) {
        const baseY = ((i + 0.5) / LINES) * height
        const phase = i * 0.7

        // Per-line brightening when the cursor is near this contour's band.
        const prox = pointer.active
          ? Math.max(0, 1 - Math.abs(baseY - pointer.y) / 280)
          : 0
        const alpha = BASE_ALPHA * (1 + prox * 0.9)

        const sampleY = (x: number) => {
          let y =
            baseY +
            10 * Math.sin(x * 0.0016 + t * 1.1 + phase) +
            6 * Math.sin(x * 0.0039 - t * 0.7 + phase * 1.7)
          if (pointer.active) {
            const dx = x - pointer.x
            const dy = baseY - pointer.y
            const infl = Math.exp(-(dx * dx + dy * dy) / (2 * POINTER_RADIUS * POINTER_RADIUS))
            y += -Math.sign(dy || 1) * infl * POINTER_SHIFT
          }
          return y
        }

        const stroke = (from: number, end: number, leftSide: boolean) => {
          if (end - from < STEP) return
          const grad = context.createLinearGradient(from, 0, end, 0)
          const strong = `rgba(${OX}, ${alpha})`
          const clear = `rgba(${OX}, 0)`
          grad.addColorStop(0, leftSide ? strong : clear)
          grad.addColorStop(1, leftSide ? clear : strong)
          context.strokeStyle = grad
          context.beginPath()
          for (let x = from; x <= end; x += STEP) {
            const y = sampleY(x)
            if (x === from) context.moveTo(x, y)
            else context.lineTo(x, y)
          }
          context.stroke()
        }

        stroke(0, innerLeft, true) // left margin: strong at edge → clear at center
        stroke(innerRight, width, false) // right margin: clear at center → strong at edge
      }
    }

    const loop = (time: number) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    resize()

    const onResize = debounce(() => {
      resize()
      if (reduced) draw(0)
    }, 150)
    window.addEventListener('resize', onResize)

    let onPointer: ((e: PointerEvent) => void) | undefined
    let onVisibility: (() => void) | undefined

    if (reduced) {
      draw(0) // single static frame, no loop
    } else {
      onPointer = (e: PointerEvent) => {
        pointer.x = e.clientX
        pointer.y = e.clientY
        pointer.active = true
      }
      window.addEventListener('pointermove', onPointer, { passive: true })

      onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(raf)
          raf = 0
        } else if (!raf) {
          raf = requestAnimationFrame(loop)
        }
      }
      document.addEventListener('visibilitychange', onVisibility)

      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      onResize.cancel()
      window.removeEventListener('resize', onResize)
      if (onPointer) window.removeEventListener('pointermove', onPointer)
      if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cx('pointer-events-none fixed inset-0 z-0 h-full w-full', className)}
    />
  )
}
