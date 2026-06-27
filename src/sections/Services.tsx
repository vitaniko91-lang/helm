import { Fragment } from 'react'
import { Container } from '../components/Container'
import { HairlineDraw } from '../components/HairlineDraw'
import { Reveal } from '../components/Reveal'
import { services } from '../data/services'

/**
 * Services / Capabilities — a numbered editorial capability index, read like the
 * contents page of a studio monograph rather than a feature grid. The header keeps
 * the house idiom (oxblood tick + mono eyebrow + a drawn oxblood rule, then a short
 * Fraunces line). Each discipline is a full-width row bracketed by drawn `line`
 * hairlines: an asymmetric 12-col split whose LEFT edge stays fixed — a dim, thin
 * mono index (01–04) beside the big Fraunces title — while the grotesk description
 * is offset into the right columns. That stable left column is what makes the list
 * scan as a table of contents, the deliberate counterpoint to Work's zig-zagging
 * metric ledger. Oxblood is spent only on the tick and on the per-row title hover.
 *
 * Motion: each row Reveals on view with one gentle stagger; the divider rules draw
 * in (HairlineDraw). Every effect is reduced-motion safe via the primitives, which
 * render their final state instantly. Accent stays oxblood-only.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 md:py-32"
    >
      <Container>
        {/* Section header — same eyebrow idiom as the hero / manifesto / work */}
        <div className="max-w-[46rem]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
              Services
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
            <h2 id="services-heading">Four disciplines, one team.</h2>
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-ink-soft md:text-[17px]"
          >
            What we do, end to end — from the first scoping conversation to a system
            that’s live and watched.
          </Reveal>
        </div>

        {/* The capability index */}
        <div className="mt-16 md:mt-20">
          {services.map((s, i) => (
            <Fragment key={s.n}>
              <HairlineDraw color="line" decorative={false} />
              <Reveal
                as="div"
                delay={Math.min(i, 3) * 0.06}
                className="group grid grid-cols-1 gap-y-4 py-10 md:grid-cols-12 md:items-baseline md:gap-x-10 md:py-14 lg:py-16"
              >
                {/* Index + title — the fixed left column that carries the ToC read */}
                <div className="flex items-baseline gap-5 md:col-span-6 md:gap-7">
                  <span className="shrink-0 font-mono font-light leading-none tabular-nums text-ink-faint text-[clamp(1.125rem,0.85rem+0.9vw,1.625rem)]">
                    {s.n}
                  </span>
                  <h3 className="font-serif font-medium leading-[1.05] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-oxblood text-[clamp(1.625rem,1.2rem+1.6vw,2.375rem)] [font-variation-settings:'opsz'_72,'SOFT'_25]">
                    {s.title}
                  </h3>
                </div>

                {/* Description — offset into the right columns */}
                <div className="md:col-span-5 md:col-start-8">
                  <p className="max-w-[46ch] text-[16px] leading-[1.6] text-ink-soft md:text-[17px]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            </Fragment>
          ))}
          <HairlineDraw color="line" decorative={false} />
        </div>
      </Container>
    </section>
  )
}
