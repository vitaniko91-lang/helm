import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Proof } from './Proof'
import { clients, proof } from '../data/proof'

// The test setup stubs matchMedia to report prefers-reduced-motion = true, so every
// Reveal and HairlineDraw renders its final, static state.

describe('Proof (testimonial)', () => {
  it('renders the full pull-quote from the data', () => {
    const { container } = render(<Proof />)
    const blockquote = container.querySelector('blockquote')
    expect(blockquote).not.toBeNull()
    expect(blockquote).toHaveTextContent(proof.quote)
  })

  it('attributes the quote to the author and role', () => {
    render(<Proof />)
    expect(screen.getByText(proof.author)).toBeInTheDocument()
    expect(screen.getByText(proof.role)).toBeInTheDocument()
  })

  it('lists the (fictional) clients in an honest trusted-by row', () => {
    render(<Proof />)
    expect(screen.getByText(/trusted by/i)).toBeInTheDocument()
    for (const name of clients) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
