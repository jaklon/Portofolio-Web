import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { AboutPage } from './AboutPage'

vi.mock('../components/HeroScene', () => ({ HeroScene: () => <div>Personal 3D portrait</div> }))

describe('About profile', () => {
  it('presents the verified profile in one section with routes to work and contact', () => {
    render(<MemoryRouter><AboutPage /></MemoryRouter>)
    expect(screen.getByRole('main').querySelectorAll('section')).toHaveLength(1)
    expect(screen.getByText(/I'm Jascon Johanest Kembuan/)).toBeInTheDocument()
    expect(screen.getByText('CISO Intern')).toBeInTheDocument()
    expect(screen.getByText('Politeknik Negeri Jakarta')).toBeInTheDocument()
    expect(screen.getByText('Certified LLM Security Expert')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore my work' })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: "Let's connect" })).toHaveAttribute('href', '#contact')
  })
})
