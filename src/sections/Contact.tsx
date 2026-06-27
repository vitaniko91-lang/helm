import { Container } from '../components/Container'
import { HairlineDraw } from '../components/HairlineDraw'
import { MaskReveal } from '../components/MaskReveal'
import { Reveal } from '../components/Reveal'
import { UnderlineLink } from '../components/UnderlineLink'

const EMAIL = 'hello@helm.studio'

/**
 * Contact — the closing CTA and the page's #contact target (nav + hero CTAs point
 * here). The strong final beat is carried by SCALE on open paper, not by inverting
 * to ink: that keeps oxblood-on-paper — the brand thesis — singing at the single
 * most important action, and is the cleanest WCAG / "no dark theme" choice. The
 * surface lifts from Proof's recessed sink back to open base and the serif jumps to
 * the largest size on the page after the hero, so the crescendo reads through air
 * and type rather than contrast inversion.
 *
 * A two-line Fraunces invitation rises via the kinetic mask (one oxblood phrase), a
 * short grotesk line follows, then the signature action: the email address itself
 * set as a big oxblood Fraunces statement-link with the house growing underline —
 * the address becomes part of the editorial voice. A quiet "Book a call" secondary
 * and a fine mono footnote close it out. Motion is reduced-motion safe via the
 * primitives; accent stays oxblood-only.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-28 md:py-40"
    >
      <Container>
        {/* Section header — same eyebrow idiom as the rest of the page */}
        <div className="flex items-center gap-3">
          <span aria-hidden className="inline-block h-1.5 w-1.5 bg-oxblood" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint md:text-xs">
            Start a project
          </span>
        </div>
        <div className="mt-4 w-12">
          <HairlineDraw color="oxblood" />
        </div>

        {/* The invitation — the largest serif on the page after the hero */}
        <h2
          id="contact-heading"
          className="mt-8 max-w-[18ch] font-serif font-medium leading-[1.02] tracking-[-0.02em] text-ink text-[clamp(2.25rem,1.3rem+4vw,4.75rem)] [font-variation-settings:'opsz'_120,'SOFT'_25] md:mt-10"
        >
          <MaskReveal as="span" className="block">
            Let&rsquo;s build something
          </MaskReveal>
          <MaskReveal as="span" className="block" delay={0.16}>
            <span className="text-oxblood">that ships.</span>
          </MaskReveal>
        </h2>

        {/* Short grotesk line */}
        <Reveal
          as="p"
          delay={0.3}
          className="mt-8 max-w-[52ch] text-[17px] leading-[1.6] text-ink-soft md:mt-9 md:text-lg"
        >
          Tell us what you&rsquo;re trying to put into production. We&rsquo;ll tell you
          honestly whether an agent is the right tool — and what it would take to ship
          one you can trust.
        </Reveal>

        {/* Primary action: the email as a big oxblood serif statement-link */}
        <Reveal as="div" delay={0.42} className="mt-10 md:mt-12">
          <a
            href={`mailto:${EMAIL}`}
            className="group relative inline-block rounded-[2px] font-serif font-medium text-oxblood transition-colors duration-200 ease-out text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] [font-variation-settings:'opsz'_72] hover:text-oxblood-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-4"
          >
            <span className="relative inline-block">
              {EMAIL}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:duration-0"
              />
            </span>
          </a>

          {/* Quiet secondary */}
          <div className="mt-7">
            <UnderlineLink href="#" className="text-[15px] font-medium md:text-base">
              Book a call
              <span aria-hidden> →</span>
            </UnderlineLink>
          </div>
        </Reveal>

        {/* Fine editorial footnote */}
        <Reveal
          as="p"
          delay={0.52}
          className="mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint md:mt-16"
        >
          Replies within two business days &nbsp;·&nbsp; Working worldwide
        </Reveal>
      </Container>
    </section>
  )
}
