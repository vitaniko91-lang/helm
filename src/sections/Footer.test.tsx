import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from './Footer'

describe('Footer (colophon)', () => {
  it('carries the required portfolio-concept disclaimer', () => {
    render(<Footer />)
    expect(screen.getByText(/Fictional studio/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Vitalina Nikulina' })).toBeInTheDocument()
  })

  it('renders the sitemap nav links to their in-page anchors', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '#services')
    expect(screen.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '#approach')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('links the Connect group, including a mailto email', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:hello@helm.studio',
    )
  })
})
