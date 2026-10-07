import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HeroScene } from './HeroScene'
import { createAvatarScene } from '../lib/avatar-scene'

const preference = vi.hoisted(() => ({ reduced: false }))
vi.mock('motion/react', () => ({ useReducedMotion: () => preference.reduced }))
vi.mock('../lib/avatar-scene', () => ({ createAvatarScene: vi.fn() }))

const create = vi.mocked(createAvatarScene)
const enabled = vi.fn()
const visible = vi.fn()
const dispose = vi.fn()

function successfulScene(host: HTMLElement, _url: string, options: Parameters<typeof createAvatarScene>[2]) {
  const canvas = document.createElement('canvas')
  host.appendChild(canvas)
  options.onLoad()
  return { setEnabled: enabled, setVisible: visible, dispose: () => { dispose(); canvas.remove() } }
}

beforeEach(() => {
  preference.reduced = false
  vi.clearAllMocks()
  create.mockImplementation(successfulScene)
})
afterEach(cleanup)

describe('personal 3D hero', () => {
  it('pauses and resumes movement without hiding or reloading the portrait, and cleans up on unmount', async () => {
    const view = render(<HeroScene />)
    const pause = await screen.findByRole('button', { name: 'Pause avatar movement' })
    await waitFor(() => expect(pause).toBeEnabled())
    const canvas = view.container.querySelector('canvas')
    fireEvent.click(pause)
    expect(screen.getByRole('button', { name: 'Enable avatar movement' })).toHaveAttribute('aria-pressed', 'false')
    expect(view.container.querySelector('canvas')).toBe(canvas)
    expect(enabled).toHaveBeenLastCalledWith(false)
    fireEvent.click(screen.getByRole('button', { name: 'Enable avatar movement' }))
    expect(enabled).toHaveBeenLastCalledWith(true)
    expect(create).toHaveBeenCalledTimes(1)
    view.unmount()
    expect(dispose).toHaveBeenCalledTimes(1)
  })

  it('loads a still portrait for reduced-motion users until they explicitly enable movement', async () => {
    preference.reduced = true
    render(<HeroScene />)
    const play = await screen.findByRole('button', { name: 'Enable avatar movement' })
    await waitFor(() => expect(play).toBeEnabled())
    expect(create.mock.calls[0][2].enabled).toBe(false)
    fireEvent.click(play)
    expect(screen.getByRole('button', { name: 'Pause avatar movement' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('offers a working retry after a model or WebGL loading failure', async () => {
    create.mockImplementationOnce((_host, _url, options) => {
      options.onFailure()
      return { setEnabled: enabled, setVisible: visible, dispose }
    })
    const view = render(<HeroScene />)
    const retry = await screen.findByRole('button', { name: 'Try again' })
    expect(screen.getByRole('status')).toHaveTextContent("The avatar couldn't load.")
    fireEvent.click(retry)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Pause avatar movement' })).toBeEnabled())
    expect(view.container.querySelectorAll('canvas')).toHaveLength(1)
  })
})
