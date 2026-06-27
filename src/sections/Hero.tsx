import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { HairlineDraw } from '../components/HairlineDraw'
import { MaskReveal } from '../components/MaskReveal'
import { Reveal } from '../components/Reveal'
import { UnderlineLink } from '../components/UnderlineLink'

/**
 * The editorial signature. Asymmetric, paper-forward, left-aligned: a mono
 * eyebrow + short oxblood rule, an oversized Fraunces statement that rises
 * line-by-line via the kinetic mask reveal (one key phrase in oxblood), a
 * restrained grotesk sub on a narrower measure, a single oxblood text CTA plus
 * a quiet secondary, and a fine mono meta line. The wide Container gutters leave
 * the living-margin contours room to breathe on either side; nothing here paints
 * an opaque full-bleed background, so the ambient layer reads through the page.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20 md:min-h-[calc(100svh-5rem)] md:py-24">
        {/* Eyebrow + short oxblood rule */}
        <div className="flex items-center gap-3">
          <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
            AI Agent Studio
          </span>
        </div>
        <div className="mt-4 w-12">
          <HairlineDraw color="oxblood" />
        </div>

        {/* Kinetic serif statement — the centerpiece */}
        <h1
          id="hero-heading"
          className="mt-7 max-w-[64rem] font-serif font-medium leading-[1.04] tracking-[-0.02em] text-ink text-[clamp(2.125rem,0.9rem+5vw,5.25rem)] md:mt-9"
          style={{ fontVariationSettings: '"opsz" 120, "SOFT" 25' }}
        >
          <MaskReveal as="span" className="block" startOnView={false} delay={0.12}>
            We design and build
          </MaskReveal>
          <MaskReveal as="span" className="block" startOnView={false} delay={0.26}>
            the agents that <span className="text-oxblood">run</span>
          </MaskReveal>
          <MaskReveal as="span" className="block" startOnView={false} delay={0.4}>
            <span className="text-oxblood">your business.</span>
          </MaskReveal>
        </h1>

        {/* Restrained grotesk sub on a narrower measure */}
        <Reveal as="p" delay={0.52} className="mt-8 max-w-[33rem] text-[17px] leading-[1.6] text-ink-soft md:mt-10 md:text-lg">
          A boutique studio that designs and builds production AI agents
          end-to-end — agent design, orchestration, evals, and the deployment
          that keeps them running.
        </Reveal>

        {/* One oxblood CTA + a quiet secondary */}
        <Reveal as="div" delay={0.62} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
          <Button variant="link" href="#contact" className="text-[15px] md:text-base">
            Start a project
          </Button>
          <UnderlineLink href="#work" className="text-[15px] font-medium md:text-base">
            See our work
          </UnderlineLink>
        </Reveal>

        {/* Fine editorial meta line */}
        <Reveal as="p" delay={0.74} className="mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint md:mt-20">
          Est. 2026 &nbsp;·&nbsp; Working worldwide &nbsp;·&nbsp; Agents, end-to-end
        </Reveal>
      </Container>
    </section>
  )
}
