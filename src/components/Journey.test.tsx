import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Journey } from './Journey'

afterEach(cleanup)

it('lets a visitor select a milestone and read its matching experience', () => {
  render(<Journey />)
  expect(screen.getByRole('heading', { name: 'PT Mandiri Sekuritas' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '2022 The foundation' }))
  expect(screen.getByRole('heading', { name: 'CEP — CCIT FTUI' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '2022 The foundation' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Now A security perspective' })).toHaveAttribute('aria-pressed', 'false')
})
