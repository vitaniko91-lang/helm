import { Container } from '../components/Container'
import { UnderlineLink } from '../components/UnderlineLink'

// Editorial sitemap + connect groups. Sitemap mirrors the Nav's in-page anchors;
// Connect carries the designer's real social links (X, LinkedIn) plus the
// fictional studio's demo email.
const sitemap = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
] as const

const connect = [
  { label: 'X', href: 'https://x.com/VitalinaN96916' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vitalina-nikulina-0a3088215/' },
  { label: 'Email', href: 'mailto:hello@helm.studio' },
] as const

// Shared treatment for the disclaimer's two real-looking anchors (designer site + X):
// quiet ink-soft text with a hairline underline that warms to oxblood on hover/focus.
const metaLink =
  'rounded-[1px] text-ink-soft underline decoration-line underline-offset-2 transition-colors duration-200 ease-out hover:text-oxblood hover:decoration-oxblood focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-2'

/**
 * Footer — the studio colophon. A semantic <footer> opened by a hairline top rule;
 * a big Fraunces wordmark + one-line descriptor on the left, two link columns
 * (Studio sitemap + Connect) on the right in the house underline-link idiom. Below
 * a second hairline: the required portfolio-concept disclaimer (with real-looking
 * anchors to Vitalina's site and X), a mono meta line (location · year in roman
 * numerals), and the © line. Mono labels, oxblood-only accent, calm and static —
 * no motion needed here.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* Wordmark + descriptor */}
          <div className="md:col-span-6">
            <a
              href="#top"
              className="rounded-[2px] font-serif text-4xl font-medium tracking-tight text-ink transition-colors duration-200 ease-out hover:text-oxblood focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-4 md:text-5xl"
              style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}
            >
              Helm
            </a>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-ink-soft">
              A boutique studio that designs and builds production AI agents, end to end.
            </p>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-10 md:col-span-6 md:justify-items-end"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint">
                Studio
              </p>
              <ul className="mt-5 space-y-3.5">
                {sitemap.map((link) => (
                  <li key={link.label}>
                    <UnderlineLink href={link.href} className="text-[15px]">
                      {link.label}
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-faint">
                Connect
              </p>
              <ul className="mt-5 space-y-3.5">
                {connect.map((link) => (
                  <li key={link.label}>
                    <UnderlineLink href={link.href} className="text-[15px]">
                      {link.label}
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Meta zone — disclaimer, location · year, copyright */}
        <div className="mt-14 border-t border-line pt-8 md:mt-16">
          <div className="flex flex-col gap-y-5 md:flex-row md:items-baseline md:justify-between">
            <p className="max-w-[62ch] font-mono text-[11px] leading-[1.8] tracking-[0.03em] text-ink-faint">
              Fictional studio — a portfolio concept by{' '}
              <a href="https://vitaniko91-lang.github.io/" className={metaLink}>
                Vitalina Nikulina
              </a>
              <span aria-hidden className="px-1.5">
                ·
              </span>
              <a href="https://x.com/VitalinaN96916" className={metaLink}>
                X<span aria-hidden> ↗</span>
              </a>
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
              Worldwide · MMXXVI
            </p>
          </div>
          <p className="mt-5 font-mono text-[11px] tracking-[0.03em] text-ink-faint">
            © 2026 Helm
          </p>
        </div>
      </Container>
    </footer>
  )
}
