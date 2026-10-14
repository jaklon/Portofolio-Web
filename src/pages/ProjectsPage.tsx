import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { ProjectCard } from '../components/ProjectCard'
import { PageTransition } from '../components/PageTransition'
import { usePageTitle } from '../hooks/usePageTitle'
import { filterProjects, isProjectFilter, type ProjectFilter } from '../lib/projects'
import { projects } from '../data/portfolio'

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
      <main id="main-content" className="page-shell page-width projects-page studio-page">
        <header className="work-intro">
          <div>
            <p className="eyebrow"><span className="status-dot" /> SELECTED WORK / ALWAYS EVOLVING</p>
            <h1>Built with purpose.<br /><span>Made to be used.</span></h1>
          </div>
          <div className="work-intro__aside">
            <p>Client websites, applied AI, and security work. A closer look at the things I've built, the problems behind them, and what I contributed.</p>
            <dl><div><dt>Projects & case studies</dt><dd>{String(projects.length).padStart(2, '0')}</dd></div><div><dt>Client websites</dt><dd>{String(projects.filter(project => project.category === 'freelance').length).padStart(2, '0')}</dd></div></dl>
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
