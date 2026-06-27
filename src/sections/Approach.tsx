import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Container } from '../components/Container'
import { HairlineDraw } from '../components/HairlineDraw'
import { Reveal } from '../components/Reveal'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'
import { approach, type Step } from '../data/approach'

/**
 * Approach — the one tasteful pinned moment on the page. "How we work" as a
 * refined process sequence (Discovery → Design → Build → Run).
 *
 * Enhancement (desktop, motion allowed): a tall track holds a sticky
 * viewport-height stage. As you scroll the track, `useScroll` progress drives a
 * crossfade between the four step panels — the active step's big Fraunces title +
 * grotesk description rises and the others dim — while a thin oxblood rule fills
 * down a left rail whose 01–04 index highlights the current step. `position:
 * sticky` only — the page scrolls normally, nothing is scroll-jacked; if measure
 * never updates the worst case is the first step stays shown and the page still
 * scrolls.
 *
 * Fallback (reduced motion OR below lg OR jsdom): a static stacked <ol> of all
 * four steps with an oxblood-ticked rule — fully readable, no JS scroll
 * dependency, no pin. The pinned path is mounted only when it is genuinely an
 * enhancement, so its scroll hooks never run on the fallback.
 */
export function Approach() {
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pinned = isDesktop && !reduced

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative py-24 md:py-32"
    >
      <Container>
        {/* Section header — same eyebrow idiom as hero / work / services */}
        <div className="max-w-[46rem]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
              Approach
            </span>
          </div>
          <div className="mt-4 w-12">
            <HairlineDraw color="oxblood" />
          </div>
          <Reveal
            as="div"
            delay={0.05}
            className="mt-7 font-serif font-medium leading-[1.05] tracking-[-0.02em] text-ink text-[clamp(1.875rem,1.1rem+3vw,2.75rem)] [font-variation-settings:'opsz'_96,'SOFT'_25]"
          >
            <h2 id="approach-heading">
              From first call to running in production.
            </h2>
          </Reveal>
        </div>

        {!pinned && <ApproachStatic steps={approach} />}
      </Container>

      {pinned && <ApproachPinned steps={approach} />}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Pinned enhancement                                                  */
/* ------------------------------------------------------------------ */

function ApproachPinned({ steps }: { steps: Step[] }) {
  const total = steps.length
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Discrete active index for the rail highlight (the panels themselves
  // crossfade continuously via per-step transforms).
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))))
  })

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${total * 90}vh` }}
    >
      {/* Sticky stage — offset below the 5rem masthead so the nav never covers it */}
      <div className="sticky top-20 flex min-h-[calc(100vh-5rem)] items-center">
        <Container>
          <div className="grid grid-cols-12 items-center gap-x-10">
            {/* Left rail — a progress index; decorative, the panels carry semantics */}
            <div aria-hidden className="col-span-4">
              <div className="mb-7 flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 bg-oxblood" />
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint">
                  How we work
                </span>
              </div>
              <div className="relative pl-6">
                {/* faint full-height rule */}
                <span className="absolute left-0 top-0 h-full w-px bg-line" />
                {/* oxblood fill that draws down as you progress */}
                <motion.span
                  style={{ scaleY: scrollYProgress }}
                  className="absolute left-0 top-0 h-full w-px origin-top bg-oxblood"
                />
                <ul className="space-y-5">
                  {steps.map((s, i) => (
                    <li key={s.n} className="flex items-baseline gap-3">
                      <span
                        className={cx(
                          'font-mono text-xs tabular-nums transition-colors duration-300',
                          i === active ? 'text-oxblood' : 'text-ink-faint/45',
                        )}
                      >
                        {s.n}
                      </span>
                      <span
                        className={cx(
                          'text-[15px] transition-colors duration-300',
                          i === active ? 'text-ink' : 'text-ink-faint/45',
                        )}
                      >
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage — the four step panels stacked in one grid cell, crossfading */}
            <ol className="relative col-span-7 col-start-6 grid">
              {steps.map((s, i) => (
                <PinnedStep
                  key={s.n}
                  step={s}
                  index={i}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </div>
  )
}

function PinnedStep({
  step,
  index,
  total,
  progress,
}: {
  step: Step
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // All keyframe offsets MUST stay within [0,1] and strictly increase — motion
  // hands scroll-linked values to the browser's ScrollTimeline, which rejects
  // out-of-range or non-monotonic offsets. So the first step is "already shown"
  // at progress 0 (no enter phase) and the last "stays shown" at 1 (no exit).
  const seg = 1 / total
  const start = index * seg
  const end = start + seg
  // Short crossfades leave each step held solo for most of its segment, so the
  // sequence reads as crisp single steps rather than a constant blur.
  const fade = seg * 0.22
  const isFirst = index === 0
  const isLast = index === total - 1
  const inStart = Math.max(0, start - fade)
  const inEnd = start + fade
  const outStart = end - fade
  const outEnd = Math.min(1, end + fade)

  // Subtle rise on enter, subtler lift on exit (exits stay quieter than entrances).
  const range = isFirst
    ? [0, outStart, outEnd]
    : isLast
      ? [inStart, inEnd, 1]
      : [inStart, inEnd, outStart, outEnd]
  const opacityOut = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  const yOut = isFirst ? [0, 0, -12] : isLast ? [16, 0, 0] : [16, 0, 0, -12]
  const opacity = useTransform(progress, range, opacityOut)
  const y = useTransform(progress, range, yOut)

  return (
    <motion.li
      style={{ opacity, y }}
      className="[grid-area:1/1] max-w-[36rem]"
    >
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-oxblood">
        {step.n}
      </span>
      <h3 className="mt-5 font-serif font-medium leading-[1.02] tracking-[-0.02em] text-ink text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] [font-variation-settings:'opsz'_120,'SOFT'_25]">
        {step.title}
      </h3>
      <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] text-ink-soft md:text-lg">
        {step.desc}
      </p>
    </motion.li>
  )
}

/* ------------------------------------------------------------------ */
/* Static / reduced-motion / mobile fallback                          */
/* ------------------------------------------------------------------ */

function ApproachStatic({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mt-14 border-l border-line md:mt-16">
      {steps.map((s, i) => (
        <li
          key={s.n}
          className="relative pb-12 pl-8 last:pb-0 md:pb-16 md:pl-12"
        >
          {/* Oxblood node on the rule — the static stand-in for the progress mark */}
          <span
            aria-hidden
            className="absolute -left-[3px] top-1 inline-block h-[7px] w-[7px] bg-oxblood"
          />
          <Reveal delay={Math.min(i, 3) * 0.05}>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-oxblood">
              {s.n}
            </span>
            <h3 className="mt-4 font-serif font-medium leading-[1.04] tracking-[-0.02em] text-ink text-[clamp(1.75rem,1.2rem+2.4vw,2.75rem)] [font-variation-settings:'opsz'_96,'SOFT'_25]">
              {s.title}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-ink-soft md:text-[17px]">
              {s.desc}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

/* ------------------------------------------------------------------ */
/* Local media-query hook (matches the useReducedMotion pattern)       */
/* ------------------------------------------------------------------ */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }
    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [query])

  return matches
}
