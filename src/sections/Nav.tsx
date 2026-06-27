import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { cx } from '../lib/cx'
import { Button } from '../components/Button'
import { UnderlineLink } from '../components/UnderlineLink'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
] as const

/**
 * Sticky editorial masthead. Transparent over the paper hero; past ~8px of
 * scroll it gains a translucent paper wash + a hairline bottom rule (a cheap
 * class toggle driven by one passive scroll listener). Serif wordmark left,
 * quiet grotesk links + a single oxblood CTA right. Below md the links collapse
 * into an accessible disclosure menu (aria-expanded/-controls, Esc to close).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={cx(
        'sticky top-0 z-50 transition-colors duration-300 ease-out',
        scrolled || open
          ? 'border-b border-line bg-paper-base/80 backdrop-blur'
          : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 md:h-20 md:px-12 lg:px-20"
      >
        <a
          href="#top"
          onClick={close}
          className="rounded-[2px] font-serif text-2xl font-medium tracking-tight text-ink transition-colors duration-200 ease-out hover:text-oxblood focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-4"
          style={{ fontVariationSettings: '"opsz" 40, "SOFT" 30' }}
        >
          Helm
        </a>

        {/* Desktop links + CTA */}
        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <UnderlineLink href={link.href} className="text-[15px]">
                  {link.label}
                </UnderlineLink>
              </li>
            ))}
          </ul>
          <Button variant="solid" href="#contact" className="text-[13px]">
            Start a project
          </Button>
        </div>

        {/* Mobile disclosure trigger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 rounded-[3px] p-2 text-ink transition-colors duration-200 ease-out hover:text-oxblood focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-2 md:hidden"
        >
          <Icon icon={open ? 'lucide:x' : 'lucide:menu'} width={24} height={24} aria-hidden />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-paper-base/95 backdrop-blur md:hidden"
        >
          <ul className="mx-auto flex max-w-content flex-col gap-5 px-6 py-7">
            {links.map((link) => (
              <li key={link.href}>
                <UnderlineLink href={link.href} onClick={close} className="text-lg">
                  {link.label}
                </UnderlineLink>
              </li>
            ))}
            <li className="pt-1">
              <Button variant="solid" href="#contact" magnetic={false} onClick={close}>
                Start a project
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
