import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import { WorkGallery } from './WorkGallery'

afterEach(cleanup)

describe('project coverflow', () => {
  it('keeps the caption and case-study link in sync with keyboard and pagination selection', () => {
    render(<MemoryRouter><WorkGallery /></MemoryRouter>)
    const browse = screen.getByLabelText('Drag to browse projects, or use the left and right arrow keys')
    fireEvent.keyDown(browse, { key: 'ArrowRight' })
    expect(screen.getByRole('heading', { name: 'Mining Company Profile' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View Mining Company Profile case study' })).toHaveAttribute('href', '/projects/lippi-mining-company-profile')
    fireEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }))
    expect(screen.getByRole('link', { name: 'View Carbon Treat One-page Site case study' })).toHaveAttribute('href', '/projects/carbon-treat-one-page-site')
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toHaveAttribute('aria-current', 'true')
  })

  it('loops from the first project to the last without losing its link', () => {
    render(<MemoryRouter><WorkGallery /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }))
    expect(screen.getByRole('link', { name: 'View Integrated Web & Mobile Applications case study' })).toHaveAttribute('href', '/projects/integrated-web-mobile-applications')
  })
})
