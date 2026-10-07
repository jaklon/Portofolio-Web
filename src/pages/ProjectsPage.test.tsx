import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { ProjectsPage } from './ProjectsPage'

describe('ProjectsPage', () => {
  it('reads the selected category from the URL and updates it through the filter controls', () => {
    render(
      <MemoryRouter initialEntries={['/projects?category=academic']}>
        <ProjectsPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('02 visible')).toBeInTheDocument()
    expect(screen.getByText('Fire Detection NLP Chatbot')).toBeInTheDocument()
    expect(screen.queryByText('Circular Waste Company Profile')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Freelance' }))

    expect(screen.getByText('04 visible')).toBeInTheDocument()
    expect(screen.getByText('Circular Waste Company Profile')).toBeInTheDocument()
    expect(screen.queryByText('Fire Detection NLP Chatbot')).not.toBeInTheDocument()
  })
})
