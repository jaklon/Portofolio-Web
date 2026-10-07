import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  it('provides a clear fallback and a route home', () => {
    render(
      <MemoryRouter>
        <NotFoundPage embedded />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'This route is outside the map.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back home/i })).toHaveAttribute('href', '/')
  })
})
