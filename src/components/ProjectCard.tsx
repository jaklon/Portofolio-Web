import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../types/portfolio'
import { ProjectVisual } from './ProjectVisual'

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <Link to={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <div className="project-card__preview">
          <div className="project-card__browser">
            {project.logo ? <span className="project-card__logo"><img src={project.logo} alt={`${project.client} logo`} width="90" height="32" loading="lazy" /></span> : <span className="project-card__study">PROJECT STUDY</span>}
            <span className="project-card__domain">{project.externalUrl ? new URL(project.externalUrl).hostname.replace(/^www\./, '') : project.confidential ? 'PUBLIC OVERVIEW' : 'ACADEMIC COLLECTION'}</span>
            <span className="project-card__dots" aria-hidden="true"><i /><i /><i /></span>
          </div>
          <ProjectVisual project={project} />
        </div>
        <div className="project-card__body">
          <div className="project-card__meta"><span>{project.category}</span><span>{project.period}</span></div>
          <div className="project-card__heading"><h3>{project.title}</h3><span className="project-card__arrow"><ArrowUpRight size={21} aria-hidden="true" /></span></div>
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__stack">{project.stack.slice(0, 3).map(tool => <span key={tool}>{tool}</span>)}</div>
          <div className="project-card__footer"><span>{project.client}</span>{project.confidential ? <span className="confidential-label"><LockKeyhole size={12} aria-hidden="true" /> Confidential</span> : <span>{project.status}</span>}</div>
        </div>
      </Link>
    </article>
  )
}
