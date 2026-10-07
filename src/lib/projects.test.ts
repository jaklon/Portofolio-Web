import { describe, expect, it } from 'vitest'
import { filterProjects, getProjectBySlug, isProjectFilter } from './projects'

describe('project data helpers', () => {
  it('filters the project catalogue by category', () => {
    expect(filterProjects('all')).toHaveLength(7)
    expect(filterProjects('freelance')).toHaveLength(4)
    expect(filterProjects('academic')).toHaveLength(2)
    expect(filterProjects('internship')).toHaveLength(1)
  })

  it('loads known slugs and returns undefined for unknown projects', () => {
    expect(getProjectBySlug('fire-detection-nlp-chatbot')?.client).toBe('Politeknik Negeri Jakarta')
    expect(getProjectBySlug('not-a-real-project')).toBeUndefined()
  })

  it('rejects unsupported query-string filters', () => {
    expect(isProjectFilter('freelance')).toBe(true)
    expect(isProjectFilter('secret')).toBe(false)
    expect(isProjectFilter(null)).toBe(false)
  })
})
