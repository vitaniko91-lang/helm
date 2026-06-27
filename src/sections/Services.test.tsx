import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Services } from './Services'
import { services } from '../data/services'

// The test setup stubs matchMedia to report prefers-reduced-motion = true, so every
// Reveal and HairlineDraw renders its final, static state.

describe('Services (capability index)', () => {
  it('renders each service title as a heading', () => {
    render(<Services />)
    for (const s of services) {
      expect(screen.getByRole('heading', { name: s.title })).toBeInTheDocument()
    }
  })

  it('renders each 01–04 index alongside its title', () => {
    render(<Services />)
    for (const s of services) {
      expect(screen.getByText(s.n)).toBeInTheDocument()
    }
  })
})
