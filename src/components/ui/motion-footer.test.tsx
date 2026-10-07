import { cleanup, fireEvent, render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CinematicFooter } from './motion-footer'

vi.mock('motion/react', () => ({ useReducedMotion: () => true }))
vi.mock('../../lib/gsap', () => ({ gsap: {}, ScrollTrigger: {} }))

const contacts = { email: 'jasconkembuan9@gmail.com', linkedin: 'https://www.linkedin.com/in/jascon-kembuan' }
const writeText = vi.fn()

beforeEach(() => {
  vi.useFakeTimers()
  writeText.mockReset().mockResolvedValue(undefined)
  vi.stubGlobal('navigator', { clipboard: { writeText } })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('cinematic contact footer', () => {
  it('directs visitors to the verified email and LinkedIn profile', () => {
    render(<CinematicFooter {...contacts} />)
    expect(screen.getByRole('contentinfo')).toHaveAccessibleName('Have an idea? Let’s talk.')
    expect(screen.getByRole('link', { name: 'Email Jascon' })).toHaveAttribute('href', `mailto:${contacts.email}`)
    const linkedin = screen.getByRole('link', { name: 'Connect on LinkedIn' })
    expect(linkedin).toHaveAttribute('href', contacts.linkedin)
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: contacts.email })).toBeVisible()
  })

  it('copies the email and clears its temporary confirmation', async () => {
    render(<CinematicFooter {...contacts} />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy email address' })) })
    expect(writeText).toHaveBeenCalledWith(contacts.email)
    expect(screen.getByRole('status')).toHaveTextContent('Email copied.')
    expect(screen.getByRole('button', { name: 'Email copied' })).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(3500) })
    expect(screen.getByRole('status')).not.toHaveTextContent('Email copied.')
  })

  it('keeps an actionable fallback when clipboard access is denied', async () => {
    writeText.mockRejectedValue(new Error('Clipboard denied'))
    render(<CinematicFooter {...contacts} />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy email address' })) })
    expect(screen.getByRole('status')).toHaveTextContent('You can select the email above to copy it')
    expect(screen.getByRole('link', { name: 'Email Jascon' })).toHaveAttribute('href', `mailto:${contacts.email}`)
    expect(screen.queryByRole('button', { name: 'Email copied' })).not.toBeInTheDocument()
  })

  it('reveals the fixed curtain when its contact controls receive keyboard focus', () => {
    render(<CinematicFooter {...contacts} />)
    const wrapper = document.getElementById('contact')!
    vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({ top: 900 } as DOMRect)
    wrapper.scrollIntoView = vi.fn()
    screen.getByRole('link', { name: 'Email Jascon' }).focus()
    expect(wrapper.scrollIntoView).toHaveBeenCalledWith({ block: 'end', behavior: 'instant' })
  })
})
