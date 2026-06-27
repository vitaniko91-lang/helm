import { HairlineDraw } from '../components/HairlineDraw'
import { MaskReveal } from '../components/MaskReveal'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

/**
 * The manifesto / positioning band — the studio's point of view, set as one
 * large editorial statement on a quiet `paper.sink` inset so the rhythm shifts
 * after the open, paper-base hero. The layout is an asymmetric two-column spread:
 * a marginal mono kicker ("WHY HELM" — oxblood tick + drawn hairline, the same
 * idiom as the hero eyebrow) holds a narrow left column, and the statement is
 * offset into the right columns. The lead rises line-by-line via the kinetic mask
 * (ink, no accent — restraint); the standfirst follows in a smaller serif with
 * three oxblood key phrases carrying the POV. Motion is reduced-motion safe via
 * the primitives.
 */
export function Manifesto() {
  return (
    <Section id="manifesto" bg="sink">
      <div className="grid grid-cols-1 gap-y-9 md:grid-cols-12 md:gap-x-10">
        {/* Marginal kicker — family resemblance to the hero eyebrow */}
        <div className="md:col-span-3 md:pt-1.5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
              Why Helm
            </span>
          </div>
          <div className="mt-4 w-12">
            <HairlineDraw color="oxblood" />
          </div>
        </div>

        {/* The statement, offset into the right columns */}
        <div className="md:col-span-8 md:col-start-5">
          <MaskReveal
            as="h2"
            text={'A demo proves nothing.\nProduction is the job.'}
            className="max-w-[16ch] font-serif font-medium leading-[1.05] tracking-[-0.02em] text-ink text-[clamp(1.875rem,1.1rem+3vw,2.75rem)] [font-variation-settings:'opsz'_96,'SOFT'_25]"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="mt-7 max-w-[60ch] font-serif text-[clamp(1.125rem,1rem+0.55vw,1.375rem)] leading-[1.55] text-ink-soft [font-variation-settings:'opsz'_32] md:mt-9"
          >
            We build agents that{' '}
            <span className="text-oxblood">survive contact with production</span> —
            measured against <span className="text-oxblood">real evals</span>, wired into
            the systems you already run, and watched long after they ship. No theatre.
            Just agents that <span className="text-oxblood">do the work</span>.
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
