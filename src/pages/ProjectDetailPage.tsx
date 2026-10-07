import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { PageTransition } from '../components/PageTransition'
import { ProjectVisual } from '../components/ProjectVisual'
import { projects } from '../data/portfolio'
import { usePageTitle } from '../hooks/usePageTitle'
import { getProjectBySlug } from '../lib/projects'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  usePageTitle(project?.title ?? 'Project not found')

  if (!project) return <NotFoundPage embedded />

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length]
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <PageTransition>
      <main id="main-content" className="page-shell page-width project-detail-page">
        <header className="project-detail-hero">
          <Link className="back-link" to="/projects"><ArrowLeft size={17} aria-hidden="true" /> All projects</Link>
          <div className="project-detail-hero__meta">
            <span>{project.category}</span>
            <span>{project.period}</span>
            <span>{project.status}</span>
          </div>
          <h1>{project.title}</h1>
          <div className="project-detail-hero__foot">
            <div>
              <p>{project.client}</p>
              <span>{project.role}</span>
            </div>
            <p>{project.summary}</p>
          </div>
        </header>

        <section className="project-detail-visual" aria-label="Project overview visual">
          <ProjectVisual project={project} />
          {project.confidential ? (
            <div className="confidential-notice">
              <LockKeyhole aria-hidden="true" />
              <div>
                <strong>Public-safe case study</strong>
                <p>This page intentionally excludes internal media, architecture, data, workflows, and credentials.</p>
              </div>
            </div>
          ) : null}
        </section>

        <section className="case-study-grid">
          <div className="case-study-section">
            <p className="case-study-section__label">01 / Overview</p>
            <h2>Context</h2>
            <p>{project.overview}</p>
          </div>
          <div className="case-study-section case-study-section--contributions">
            <p className="case-study-section__label">02 / Contribution</p>
            <h2>What I worked on</h2>
            <ol>
              {project.contributions.map((contribution, index) => (
                <li key={contribution}><span>{String(index + 1).padStart(2, '0')}</span><p>{contribution}</p></li>
              ))}
            </ol>
          </div>
          <div className="case-study-section">
            <p className="case-study-section__label">03 / Technology</p>
            <h2>Tools and systems</h2>
            <div className="tag-list tag-list--large">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="case-study-section">
            <p className="case-study-section__label">04 / Delivery</p>
            <h2>Working context</h2>
            <p>{project.deliveryContext}</p>
          </div>
        </section>

        {project.externalUrl || project.repoUrl ? (
          <div className="project-links">
            {project.externalUrl ? <a className="button button--primary" href={project.externalUrl} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={18} aria-hidden="true" /></a> : null}
            {project.repoUrl ? <a className="button button--quiet" href={project.repoUrl} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={18} aria-hidden="true" /></a> : null}
          </div>
        ) : null}

        <nav className="project-pagination" aria-label="Project navigation">
          <Link to={`/projects/${previous.slug}`}>
            <ArrowLeft aria-hidden="true" />
            <span><small>Previous</small>{previous.title}</span>
          </Link>
          <Link to={`/projects/${next.slug}`}>
            <span><small>Next</small>{next.title}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </nav>
      </main>
    </PageTransition>
  )
}
