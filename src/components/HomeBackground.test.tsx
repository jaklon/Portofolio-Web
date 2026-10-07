import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HomeBackground, HomeBackgroundProvider } from './HomeBackground'
import { HeroCarousel } from './ui/hero-carousel'
import { useHomeBackground } from '../hooks/useHomeBackground'
import { homeWallpapers } from '../data/home-wallpapers'

function WallpaperPicker() {
  const { index, select } = useHomeBackground()
  return <><HomeBackground /><HeroCarousel items={homeWallpapers} index={index} onIndexChange={select} compact showBackground={false} label="Choose the Home background" /></>
}

function renderPicker() {
  return render(<HomeBackgroundProvider><WallpaperPicker /></HomeBackgroundProvider>)
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.localStorage.clear()
})

describe('Home wallpaper selection', () => {
  it('changes the background and attribution together, then restores the selection on remount', () => {
    const first = renderPicker()
    fireEvent.click(screen.getByRole('button', { name: 'City after the rain' }))
    expect(screen.getByRole('status')).toHaveTextContent('Background 3 of 5: City after the rain')
    expect(screen.getByRole('link', { name: 'Image source' })).toHaveAttribute('href', 'https://wallhaven.cc/w/zpv8ry')
    expect(document.querySelector('.home-background img[src="/wallpapers/zpv8ry.webp"]')).toBeInTheDocument()
    expect(window.localStorage.getItem('jascon-home-wallpaper')).toBe('zpv8ry')

    first.unmount()
    renderPicker()
    expect(screen.getByRole('button', { name: 'City after the rain' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('Background 3 of 5')
  })

  it('falls back to the first wallpaper when a previously saved image no longer exists', () => {
    window.localStorage.setItem('jascon-home-wallpaper', 'removed-wallpaper')
    renderPicker()
    expect(screen.getByRole('status')).toHaveTextContent('Background 1 of 5: Fuji at dusk')
    expect(screen.getByRole('button', { name: 'Previous background' })).toBeDisabled()
  })

  it('supports arrow, Home, and End keys without moving beyond the available backgrounds', () => {
    renderPicker()
    const carousel = screen.getByRole('group', { name: 'Choose the Home background' })
    fireEvent.keyDown(carousel, { key: 'End' })
    expect(screen.getByRole('status')).toHaveTextContent('Background 5 of 5: Alpine stillness')
    expect(screen.getByRole('button', { name: 'Next background' })).toBeDisabled()
    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    expect(screen.getByRole('status')).toHaveTextContent('Background 5 of 5')
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
    expect(screen.getByRole('status')).toHaveTextContent('Background 4 of 5: A little beyond')
    fireEvent.keyDown(carousel, { key: 'Home' })
    expect(screen.getByRole('button', { name: 'Fuji at dusk' })).toHaveAttribute('aria-current', 'true')
    expect(carousel).toHaveFocus()
  })

  it('allows vertical page scrolling while using horizontal wheel gestures to change scenes', () => {
    renderPicker()
    const carousel = screen.getByRole('group', { name: 'Choose the Home background' })
    expect(fireEvent.wheel(carousel, { deltaY: 100, cancelable: true })).toBe(true)
    expect(screen.getByRole('status')).toHaveTextContent('Background 1 of 5')
    expect(fireEvent.wheel(carousel, { deltaX: 100, cancelable: true })).toBe(false)
    expect(screen.getByRole('status')).toHaveTextContent('Background 2 of 5: An imagined kingdom')
    fireEvent.keyDown(carousel, { key: 'End' })
    expect(fireEvent.wheel(carousel, { deltaX: 100, cancelable: true })).toBe(true)
  })

  it('keeps selection usable when the browser blocks local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked') })
    renderPicker()
    fireEvent.click(screen.getByRole('button', { name: 'Next background' }))
    expect(screen.getByRole('status')).toHaveTextContent('Background 2 of 5: An imagined kingdom')
  })
})
