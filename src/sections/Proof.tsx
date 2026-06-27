import { HairlineDraw } from '../components/HairlineDraw'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { clients, proof } from '../data/proof'

// One phrase of the pull-quote carries the value, set in oxblood. Split out of
// the data string (rather than hardcoded) so the rendered blockquote stays a
// faithful, drift-free copy of proof.quote — if the wording ever changes and the
// phrase is no longer found, the quote simply renders without an accent.
const ACCENT = 'an agent we actually trust in production'

/**
 * Proof — a quiet editorial testimonial moment on a recessed `paper.sink` band,
 * echoing the Manifesto's POV band so the page bookends on the same quiet surface.
 * One fictional pull-quote, set LARGE in Fraunces with a single oxblood phrase,
 * hung off an oversized decorative oxblood quote mark; attribution below in grotesk
 * `<cite>` + a mono role. Beneath a drawn hairline, an honest "Trusted by" row
 * lists the (fictional) client names as plain editorial text separated by oxblood
 * middots — a logo wall without fake logos. The header keeps the house eyebrow
 * idiom (oxblood tick + mono label + drawn oxblood rule). Entrances use the
 * reduced-motion-safe primitives (Reveal / HairlineDraw); accent stays oxblood-only.
 */
export function Proof() {
  const at = proof.quote.indexOf(ACCENT)
  const before = at >= 0 ? proof.quote.slice(0, at) : proof.quote
  const accent = at >= 0 ? ACCENT : ''
  const after = at >= 0 ? proof.quote.slice(at + ACCENT.length) : ''

  return (
    <Section id="proof" bg="sink">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10">
        {/* Marginal kicker — same eyebrow idiom as the hero / manifesto */}
        <div className="md:col-span-3 md:pt-2">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
              In their words
            </span>
          </div>
          <div className="mt-4 w-12">
            <HairlineDraw color="oxblood" />
          </div>
        </div>

        {/* The pull-quote, offset into the right columns */}
        <figure className="relative md:col-span-8 md:col-start-5">
          {/* Oversized hanging quote mark — decorative editorial anchor */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1 -top-7 select-none font-serif font-medium leading-none text-oxblood/20 text-[6.5rem] [font-variation-settings:'opsz'_144] md:-left-10 md:-top-12 md:text-[9rem]"
          >
            &ldquo;
          </span>

          <Reveal>
            <blockquote className="relative max-w-[24ch] font-serif font-medium leading-[1.28] tracking-[-0.01em] text-ink text-[clamp(1.5rem,1.05rem+1.9vw,2.5rem)] [font-variation-settings:'opsz'_72,'SOFT'_25]">
              {before}
              {accent ? <span className="text-oxblood">{accent}</span> : null}
              {after}
            </blockquote>
          </Reveal>

          <Reveal delay={0.12}>
            <figcaption className="mt-8 flex items-center gap-4 md:mt-10">
              <span aria-hidden className="h-px w-8 shrink-0 bg-oxblood" />
              <span className="text-[15px] text-ink">
                <cite className="font-sans font-medium not-italic">{proof.author}</cite>
                <span aria-hidden className="mx-2 text-ink-faint">
                  ·
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  {proof.role}
                </span>
              </span>
            </figcaption>
          </Reveal>
        </figure>
      </div>

      {/* Trusted-by row — honest "logo wall" of fictional names, no fake logos */}
      <div className="mt-20 md:mt-28">
        <HairlineDraw color="line" decorative={false} />
        <div className="mt-10 grid grid-cols-1 gap-y-6 md:grid-cols-12 md:items-baseline md:gap-x-10">
          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
              Trusted by
            </span>
          </div>
          <Reveal as="div" delay={0.05} className="md:col-span-9">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-3">
              {clients.map((name, i) => (
                <li key={name} className="flex items-center gap-x-3">
                  {i > 0 && (
                    <span aria-hidden className="text-oxblood/50">
                      ·
                    </span>
                  )}
                  <span className="text-[15px] text-ink-faint md:text-base">{name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
