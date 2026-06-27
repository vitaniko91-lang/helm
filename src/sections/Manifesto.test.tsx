import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Manifesto } from './Manifesto'

// The test setup stubs matchMedia to report prefers-reduced-motion = true, so the
// MaskReveal lead and Reveal standfirst render their final, static text in place.

describe('Manifesto', () => {
  it('renders the editorial lead as the section h2', () => {
    render(<Manifesto />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Production is the job.')
  })

  it('marks the key positioning phrase in oxblood', () => {
    render(<Manifesto />)
    const phrase = screen.getByText('survive contact with production')
    expect(phrase).toBeInTheDocument()
    expect(phrase).toHaveClass('text-oxblood')
  })
})
