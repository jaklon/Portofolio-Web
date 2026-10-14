import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GlowCard } from './spotlight-card'

let preference: MediaQueryList
let frames: Map<number, FrameRequestCallback>
let frameId: number

beforeEach(() => {
  frames = new Map()
  frameId = 0
  preference = Object.assign(new EventTarget(), { matches: true }) as MediaQueryList
  vi.stubGlobal('matchMedia', vi.fn(() => preference))
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    frames.set(++frameId, callback)
    return frameId
  }))
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => frames.delete(id)))
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

function move(x: number, y: number, pointerType = 'mouse') {
  const event = new MouseEvent('pointermove', { clientX: x, clientY: y, bubbles: true })
  Object.defineProperty(event, 'pointerType', { value: pointerType })
  fireEvent(document, event)
}
function flushFrames() {
  const pending = [...frames.values()]
  frames.clear()
  pending.forEach(callback => callback(16))
}
function setPreference(matches: boolean) {
  Object.assign(preference, { matches })
  preference.dispatchEvent(new Event('change'))
}
function renderCard() {
  const result = render(<GlowCard customSize aria-label="Web products"><h3>Web that works.</h3></GlowCard>)
  const card = screen.getByRole('article', { name: 'Web products' })
  vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({ left: 100, top: 100, right: 400, bottom: 400, width: 300, height: 300 } as DOMRect)
  return { ...result, card }
}

describe('glow card interaction', () => {
  it('uses the latest pointer position once per frame, follows scrolling, and cancels work on unmount', () => {
    const { card, unmount } = renderCard()
    move(130, 140)
    move(170, 180)
    expect(frames.size).toBe(1)
    flushFrames()
    expect(card.style.getPropertyValue('--glow-x')).toBe('70.00px')
    expect(card.style.getPropertyValue('--glow-y')).toBe('80.00px')
    vi.mocked(card.getBoundingClientRect).mockReturnValue({ left: 100, top: 80, right: 400, bottom: 380, width: 300, height: 300 } as DOMRect)
    fireEvent.scroll(window)
    flushFrames()
    expect(card.style.getPropertyValue('--glow-y')).toBe('100.00px')
    move(200, 210)
    expect(frames.size).toBe(1)
    unmount()
    expect(frames.size).toBe(0)
    move(220, 230)
    expect(frames.size).toBe(0)
  })

  it('keeps content visible without tracking touch or a disabled motion preference, including live changes', () => {
    setPreference(false)
    const { card } = renderCard()
    move(130, 140)
    expect(frames.size).toBe(0)
    expect(screen.getByRole('heading', { name: 'Web that works.' })).toBeVisible()
    setPreference(true)
    move(130, 140, 'touch')
    expect(frames.size).toBe(0)
    move(130, 140)
    flushFrames()
    expect(card.style.getPropertyValue('--glow-opacity')).toBe('1')
    move(150, 160)
    setPreference(false)
    expect(frames.size).toBe(0)
    expect(card.style.getPropertyValue('--glow-opacity')).toBe('0')
    move(130, 140)
    expect(frames.size).toBe(0)
  })
})
