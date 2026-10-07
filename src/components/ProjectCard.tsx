import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../types/portfolio'
import { ProjectVisual } from './ProjectVisual'

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <Link to={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <ProjectVisual project={project} compact={!featured} />
        <div className="project-card__body">
          <div className="project-card__meta"><span>{project.category}</span><span>{project.period}</span></div>
          <div className="project-card__heading"><h3>{project.title}</h3><span className="project-card__arrow"><ArrowUpRight size={21} aria-hidden="true" /></span></div>
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__footer"><span>{project.client}</span>{project.confidential && <span className="confidential-label"><LockKeyhole size={12} aria-hidden="true" /> Confidential</span>}</div>
        </div>
      </Link>
    </article>
  )
}
