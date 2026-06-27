import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'
import { MaskReveal } from './MaskReveal'
import { CountUp } from './CountUp'
import { LivingMargin } from './LivingMargin'

// The test setup stubs matchMedia to report prefers-reduced-motion = true, so
// every motion primitive renders its final/static state here.

describe('Button', () => {
  it('renders a <button> for the link variant without href', () => {
    render(<Button variant="link">Start a project</Button>)
    expect(screen.getByRole('button', { name: /start a project/i })).toBeInTheDocument()
  })

  it('renders a <button> for the solid variant', () => {
    render(<Button variant="solid">Send</Button>)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('renders an <a> with href when href is provided', () => {
    render(
      <Button variant="link" href="/contact">
        Contact
      </Button>,
    )
    const link = screen.getByRole('link', { name: /contact/i })
    expect(link).toHaveAttribute('href', '/contact')
  })
})

describe('MaskReveal', () => {
  it('renders its full text under reduced motion', () => {
    render(<MaskReveal as="h2" text="We design and build agents" />)
    expect(screen.getByText('We design and build agents')).toBeInTheDocument()
  })
})

describe('CountUp', () => {
  it('shows the final value instantly under reduced motion', () => {
    render(<CountUp to={92} suffix="%" />)
    expect(screen.getByText('92%')).toBeInTheDocument()
  })
})

describe('LivingMargin', () => {
  it('renders a canvas and starts no animation loop under reduced motion', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    const { container } = render(<LivingMargin />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(raf).not.toHaveBeenCalled()
    raf.mockRestore()
  })
})
