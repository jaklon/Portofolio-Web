import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ToolkitSphere } from './ToolkitSphere'
import SphereImageGrid from './ui/img-sphere'

const preference = vi.hoisted(() => ({ reduced: false }))
vi.mock('motion/react', () => ({ useReducedMotion: () => preference.reduced }))

beforeEach(() => {
  preference.reduced = false
  vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1))
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('toolkit sphere', () => {
  it('filters the five user-confirmed security tools and returns to the complete toolkit', () => {
    render(<ToolkitSphere />)
    fireEvent.click(screen.getByRole('button', { name: 'Cybersecurity' }))
    expect(screen.getByRole('button', { name: 'Cybersecurity' })).toHaveAttribute('aria-pressed', 'true')
    const list = document.querySelector('.tool-sphere__list') as HTMLElement
    expect(within(list).getAllByRole('button', { hidden: true }).map(button => button.textContent)).toEqual(['Gophish', 'Tenable', 'Trend Micro', 'Microsoft LAPS', 'CyberArk PAM'])
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(document.querySelectorAll('.tool-sphere__node')).toHaveLength(34)
    expect(document.querySelector('summary')).toHaveTextContent('Browse all 34 tools')
  })

  it('respects reduced motion while retaining manual keyboard rotation', () => {
    preference.reduced = true
    render(<ToolkitSphere />)
    expect(requestAnimationFrame).not.toHaveBeenCalled()
    const stage = screen.getByRole('group', { name: /Technology logo sphere/ })
    const node = document.querySelector('.tool-sphere__node') as HTMLElement
    const initial = node.style.transform
    fireEvent.keyDown(stage, { key: 'ArrowRight' })
    expect(node.style.transform).not.toBe(initial)
    expect(requestAnimationFrame).not.toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: /tool sphere rotation/ })).not.toBeInTheDocument()
  })

  it('continues automatic rotation when the sphere is hovered or focused', () => {
    let nextFrame: FrameRequestCallback = () => undefined
    vi.mocked(requestAnimationFrame).mockImplementation(callback => { nextFrame = callback; return 1 })
    render(<ToolkitSphere />)
    const stage = screen.getByRole('group', { name: /Technology logo sphere/ })
    const node = document.querySelector('.tool-sphere__node') as HTMLElement
    const initial = node.style.transform
    fireEvent.pointerEnter(stage)
    stage.focus()
    nextFrame(100)
    expect(node.style.transform).not.toBe(initial)
    const firstFrame = node.style.transform
    nextFrame(117)
    expect(node.style.transform).not.toBe(firstFrame)
    expect(screen.queryByRole('button', { name: /tool sphere rotation/ })).not.toBeInTheDocument()
  })

  it('opens details from the complete list, closes on Escape, and restores focus and page scrolling', () => {
    render(<ToolkitSphere />)
    const list = document.querySelector('details') as HTMLDetailsElement
    list.open = true
    fireEvent(list, new Event('toggle'))
    const trigger = within(list).getByRole('button', { name: 'CyberArk PAM' })
    trigger.focus()
    document.body.style.overflow = 'auto'
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'CyberArk PAM' })
    expect(within(dialog).getByText('Cybersecurity')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close tool details' })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('auto')
    document.body.style.overflow = ''
  })

  it('treats a pointer drag or cancelled gesture as rotation, and a short click as selection', () => {
    class TestPointerEvent extends MouseEvent { pointerId = 1 }
    vi.stubGlobal('PointerEvent', TestPointerEvent)
    render(<SphereImageGrid images={[{ id: 'test', src: '/logos/react.svg', alt: 'React icon', title: 'React' }]} />)
    const stage = screen.getByRole('group', { name: /Technology logo sphere/ })
    const node = document.querySelector('.tool-sphere__node') as HTMLButtonElement
    const initial = node.style.transform
    fireEvent.pointerDown(node, { clientX: 10, clientY: 10, button: 0 })
    fireEvent.pointerMove(stage, { clientX: 80, clientY: 15 })
    fireEvent.pointerUp(stage, { clientX: 80, clientY: 15 })
    expect(node.style.transform).not.toBe(initial)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.pointerDown(node, { clientX: 10, clientY: 10, button: 0 })
    fireEvent.pointerCancel(stage)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.pointerDown(node, { clientX: 10, clientY: 10, button: 0 })
    fireEvent.pointerUp(stage, { clientX: 11, clientY: 10 })
    expect(screen.getByRole('dialog', { name: 'React' })).toBeInTheDocument()
  })
})
