import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App (nav + hero)', () => {
  it('renders the hero statement as the single h1', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('We design and build')
    expect(heading).toHaveTextContent('your business.')
  })

  it('renders the primary nav links', () => {
    render(<App />)
    // Scope to the masthead landmark — the Footer now mirrors these same anchors.
    const primary = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(primary).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
    expect(within(primary).getByRole('link', { name: 'Approach' })).toHaveAttribute(
      'href',
      '#approach',
    )
  })
})
