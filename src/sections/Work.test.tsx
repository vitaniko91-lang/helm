import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Work } from './Work'
import { work } from '../data/work'

// The test setup stubs matchMedia to report prefers-reduced-motion = true, so the
// MaskReveal metric, CountUp, and every Reveal render their final, static state.

describe('Work (selected work)', () => {
  it('renders each engagement client name as a heading', () => {
    render(<Work />)
    for (const c of work) {
      expect(screen.getByRole('heading', { name: c.client })).toBeInTheDocument()
    }
  })

  it('renders each result label', () => {
    render(<Work />)
    for (const c of work) {
      expect(screen.getByText(c.result.label)).toBeInTheDocument()
    }
  })
})
