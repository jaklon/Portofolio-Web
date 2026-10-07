import { projects } from '../data/portfolio'
import type { ProjectCategory } from '../types/portfolio'

export type ProjectFilter = 'all' | ProjectCategory

export function isProjectFilter(value: string | null): value is ProjectFilter {
  return value === 'all' || value === 'freelance' || value === 'academic' || value === 'internship'
}

export function filterProjects(filter: ProjectFilter) {
  return filter === 'all' ? projects : projects.filter((project) => project.category === filter)
}

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug)
}
