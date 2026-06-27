import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Contact } from './Contact'

// The test setup stubs matchMedia to report prefers-reduced-motion = true, so the
// MaskReveal / Reveal primitives render their final, static state and the email
// link renders as a plain <a> (magnetic disabled under reduced motion).

describe('Contact (closing CTA)', () => {
  it('is the page #contact target', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('#contact')).not.toBeNull()
  })

  it('offers the email as the primary action', () => {
    render(<Contact />)
    const email = screen.getByRole('link', { name: /hello@helm\.studio/ })
    expect(email).toHaveAttribute('href', 'mailto:hello@helm.studio')
  })

  it('renders the serif invitation as the section heading', () => {
    render(<Contact />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Let’s build something')
    expect(heading).toHaveTextContent('that ships.')
  })
})
