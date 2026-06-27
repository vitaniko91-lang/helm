import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Approach } from './Approach'
import { approach } from '../data/approach'

// The test setup stubs matchMedia to report prefers-reduced-motion = true (and no
// other query matches, so the min-width gate is false too) — Approach renders its
// static stacked fallback, with every Reveal/HairlineDraw in its final state.

describe('Approach (process sequence)', () => {
  it('covers the four-step sequence in order', () => {
    expect(approach.map((s) => s.title)).toEqual([
      'Discovery',
      'Design',
      'Build',
      'Run',
    ])
  })

  it('renders each step title as a heading', () => {
    render(<Approach />)
    for (const s of approach) {
      expect(screen.getByRole('heading', { name: s.title })).toBeInTheDocument()
    }
  })

  it('renders each 01–04 index and its description', () => {
    render(<Approach />)
    for (const s of approach) {
      expect(screen.getByText(s.n)).toBeInTheDocument()
      expect(screen.getByText(s.desc)).toBeInTheDocument()
    }
  })
})
