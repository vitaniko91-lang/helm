import { Fragment } from 'react'
import { Container } from '../components/Container'
import { CountUp } from '../components/CountUp'
import { HairlineDraw } from '../components/HairlineDraw'
import { MaskReveal } from '../components/MaskReveal'
import { Reveal } from '../components/Reveal'
import { cx } from '../lib/cx'
import { work } from '../data/work'

/**
 * Selected Work — a ruled editorial ledger, not a feature grid. The header keeps
 * the studio idiom (oxblood tick + mono eyebrow + a drawn oxblood rule, then a
 * short Fraunces line). Each engagement is a full-width row bracketed by drawn
 * hairlines with generous air; the row is an asymmetric 12-col split whose anchor
 * is the oversized oxblood Fraunces metric. The metric side ALTERNATES per row
 * (flush-right, flush-left, flush-right) so the giant figures zig-zag across the
 * spread — the rhythm that keeps this off-grid and editorial.
 *
 * Motion: the text block Reveals on view; the metric rises behind a mask
 * (MaskReveal — the refined cover-wipe) while CountUp runs once; the divider rules
 * and the short rule under each figure draw in. Every effect is reduced-motion
 * safe via the primitives, which render their final state instantly.
 */
export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-24 md:py-32"
    >
      <Container>
        {/* Section header — same eyebrow idiom as the hero / manifesto */}
        <div className="max-w-[46rem]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
              Selected Work
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
            <h2 id="work-heading">A few engagements.</h2>
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-ink-soft md:text-[17px]"
          >
            Problems companies brought us — and the agents we shipped to put them
            to rest.
          </Reveal>
        </div>

        {/* The ledger */}
        <div className="mt-16 md:mt-20">
          {work.map((c, i) => {
            const metricLeft = i % 2 === 1
            return (
              <Fragment key={c.client}>
                <HairlineDraw color="line" decorative={false} />
                <article className="grid grid-cols-1 gap-y-9 py-12 md:grid-cols-12 md:items-center md:gap-x-10 md:py-16 lg:py-20">
                  {/* Text block — DOM order stays reading order; grid places it */}
                  <div
                    className={cx(
                      'md:col-span-6 md:row-start-1',
                      metricLeft ? 'md:col-start-7' : 'md:col-start-1',
                    )}
                  >
                    <Reveal>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 bg-oxblood"
                        />
                        <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink-faint">
                          {c.sector}
                        </span>
                      </div>
                      <h3 className="mt-4 font-serif font-medium leading-[1.08] tracking-[-0.01em] text-ink text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] [font-variation-settings:'opsz'_72,'SOFT'_25]">
                        {c.client}
                      </h3>
                      <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-ink-soft md:text-[17px]">
                        {c.problem}
                      </p>
                      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                        What we built
                      </p>
                      <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-ink md:text-[17px]">
                        {c.built}
                      </p>
                    </Reveal>
                  </div>

                  {/* Metric block — the anchor; flush to the outer margin */}
                  <div
                    className={cx(
                      'md:col-span-5 md:row-start-1',
                      metricLeft ? 'md:col-start-1' : 'md:col-start-8 md:text-right',
                    )}
                  >
                    <MaskReveal
                      as="span"
                      className="block font-serif font-medium leading-[1.1] tracking-[-0.02em] text-oxblood tabular-nums text-[clamp(3rem,1.5rem+8vw,7rem)] [font-variation-settings:'opsz'_144]"
                    >
                      <CountUp
                        to={c.result.value}
                        prefix={c.result.prefix}
                        suffix={c.result.suffix}
                        group={c.result.value >= 1000}
                      />
                    </MaskReveal>
                    <Reveal delay={0.15}>
                      <div
                        className={cx('mt-6 w-16', !metricLeft && 'md:ml-auto')}
                      >
                        <HairlineDraw color="oxblood" />
                      </div>
                      <p
                        className={cx(
                          'mt-4 max-w-[26ch] text-[13px] leading-[1.5] text-ink-soft md:text-sm',
                          !metricLeft && 'md:ml-auto',
                        )}
                      >
                        {c.result.label}
                      </p>
                    </Reveal>
                  </div>
                </article>
              </Fragment>
            )
          })}
          <HairlineDraw color="line" decorative={false} />
        </div>
      </Container>
    </section>
  )
}
