import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { ProjectCard } from '../components/ProjectCard'
import { PageTransition } from '../components/PageTransition'
import { usePageTitle } from '../hooks/usePageTitle'
import { filterProjects, isProjectFilter, type ProjectFilter } from '../lib/projects'

const filters: { label: string; value: ProjectFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Academic', value: 'academic' },
  { label: 'Internship', value: 'internship' },
]

export function ProjectsPage() {
  usePageTitle('Projects')
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedFilter = searchParams.get('category')
  const activeFilter: ProjectFilter = isProjectFilter(requestedFilter) ? requestedFilter : 'all'
  const visibleProjects = useMemo(() => filterProjects(activeFilter), [activeFilter])

  const setFilter = (filter: ProjectFilter) => {
    setSearchParams(filter === 'all' ? {} : { category: filter }, { replace: true })
  }

  return (
    <PageTransition>
      <main id="main-content" className="page-shell page-width projects-page">
        <header className="page-hero page-hero--projects">
          <p className="eyebrow">THE WORK / 07 PROJECTS</p>
          <h1>Ideas made<br /><em>into something real.</em></h1>
          <div className="page-hero__foot">
            <p>
              Client websites, applied AI, and security work. A collection of projects,
              collaborations, and things learned along the way.
            </p>
          </div>
        </header>

        <section className="project-browser" aria-labelledby="project-browser-title">
          <div className="project-filter-row">
            <div>
              <p id="project-browser-title">Filter projects</p>
              <span aria-live="polite">{visibleProjects.length.toString().padStart(2, '0')} visible</span>
            </div>
            <div className="project-filters" role="group" aria-label="Project category">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  className={filter.value === activeFilter ? 'is-active' : undefined}
                  aria-pressed={filter.value === activeFilter}
                  onClick={() => setFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
