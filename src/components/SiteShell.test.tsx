import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, Link } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SiteShell } from './SiteShell'
import { HeroCarousel } from './ui/hero-carousel'
import { homeWallpapers } from '../data/home-wallpapers'
import { useHomeBackground } from '../hooks/useHomeBackground'

vi.mock('./ui/motion-footer', () => ({ CinematicFooter: () => <footer id="contact">Contact</footer> }))

function Picker() {
  const { index, select } = useHomeBackground()
  return <HeroCarousel items={homeWallpapers} index={index} onIndexChange={select} compact showBackground={false} label="Choose the Home background" />
}

function renderSite(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><SiteShell><Routes>
    <Route path="/" element={<Picker />} />
    <Route path="/about" element={<main>About content</main>} />
    <Route path="/projects" element={<main><Link to="/projects/example">Open a case study</Link></main>} />
    <Route path="/projects/example" element={<main>Case study content</main>} />
    <Route path="*" element={<main>Page not found</main>} />
  </Routes></SiteShell></MemoryRouter>)
}

afterEach(() => { cleanup(); window.localStorage.clear(); vi.useRealTimers() })

describe('private story entry', () => {
  it('does not expose a story link in normal navigation or the mobile menu', () => {
    renderSite('/about')
    expect(screen.queryByRole('link', { name: /JV Story/ })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.queryByRole('link', { name: /JV Story/ })).not.toBeInTheDocument()
  })

  it('reveals the entry after holding the brand without navigating away', () => {
    vi.useFakeTimers()
    renderSite('/about')
    const brand = screen.getByRole('link', { name: 'Jascon Kembuan home' })
    fireEvent.pointerDown(brand, { button: 0 })
    act(() => vi.advanceTimersByTime(2000))
    fireEvent.pointerUp(brand)
    fireEvent.click(brand)
    expect(screen.getByText('About content')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /JV Story/ })).toHaveAttribute('href', '/jv-story/')
    fireEvent.keyDown(screen.getByRole('link', { name: /JV Story/ }), { key: 'Escape' })
    expect(screen.queryByRole('link', { name: /JV Story/ })).not.toBeInTheDocument()
    expect(brand).toHaveFocus()
  })

  it('keeps ordinary brand clicks working and cancels interrupted holds', () => {
    vi.useFakeTimers()
    renderSite('/about')
    const brand = screen.getByRole('link', { name: 'Jascon Kembuan home' })
    fireEvent.pointerDown(brand, { button: 0 })
    act(() => vi.advanceTimersByTime(500))
    fireEvent.pointerCancel(brand)
    act(() => vi.advanceTimersByTime(2000))
    expect(screen.queryByRole('link', { name: /JV Story/ })).not.toBeInTheDocument()
    fireEvent.click(brand)
    expect(screen.getByRole('button', { name: 'City after the rain' })).toBeInTheDocument()
  })

  it('supports the shortcut and closes the entry when changing pages', () => {
    renderSite('/about')
    fireEvent.keyDown(window, { ctrlKey: true, altKey: true, code: 'KeyJ' })
    expect(screen.getByRole('link', { name: /JV Story/ })).toHaveFocus()
    fireEvent.click(screen.getByRole('link', { name: 'Work' }))
    expect(screen.queryByRole('link', { name: /JV Story/ })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.queryByRole('link', { name: /JV Story/ })).not.toBeInTheDocument()
  })
})

describe('shared site wallpaper', () => {
  it('keeps the Home selection and the same backdrop across About, Work, and case studies', () => {
    renderSite()
    fireEvent.click(screen.getByRole('button', { name: 'City after the rain' }))
    const backdrop = document.querySelector('.home-background')
    const expectCity = () => {
      expect(document.querySelector('.home-background')).toBe(backdrop)
      expect(backdrop?.querySelector('img[src="/wallpapers/zpv8ry.webp"]')).toBeInTheDocument()
    }
    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByText('About content')).toBeInTheDocument()
    expectCity()
    fireEvent.click(screen.getByRole('link', { name: 'Work' }))
    fireEvent.click(screen.getByRole('link', { name: 'Open a case study' }))
    expect(screen.getByText('Case study content')).toBeInTheDocument()
    expectCity()
    fireEvent.click(screen.getByRole('link', { name: 'Home' }))
    expect(screen.getByRole('button', { name: 'City after the rain' })).toHaveAttribute('aria-current', 'true')
  })

  it('restores the saved wallpaper on direct visits to inner pages and missing routes', () => {
    window.localStorage.setItem('jascon-home-wallpaper', 'lygzqq')
    for (const path of ['/about', '/projects', '/projects/example', '/missing']) {
      const view = renderSite(path)
      expect(document.querySelector('.home-background img[src="/wallpapers/lygzqq.webp"]')).toBeInTheDocument()
      expect(view.container.querySelector('.site-shell--studio')).toBeInTheDocument()
      view.unmount()
    }
  })
})
