import type { MouseEvent, ReactNode } from 'react'
import { cx } from '../lib/cx'

interface UnderlineLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (event: MouseEvent) => void
}

/**
 * Quiet editorial navigation link: ink text that warms to oxblood, with a single
 * oxblood hairline underline that grows from the left on hover/focus. Shared by
 * the Nav links and the Hero's secondary CTA so the underline idiom is identical
 * everywhere. focus-visible draws an oxblood ring (offset clears the underline).
 */
export function UnderlineLink({ href, children, className, onClick }: UnderlineLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        'group relative inline-block rounded-[2px] font-sans text-ink',
        'transition-colors duration-200 ease-out hover:text-oxblood',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-4',
        className,
      )}
    >
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-oxblood transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:duration-0"
        />
      </span>
    </a>
  )
}
