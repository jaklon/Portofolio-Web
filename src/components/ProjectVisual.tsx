import type { Project } from '../types/portfolio'

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const media = compact ? (project.cover ?? project.media[0]) : project.media[0]
  return (
    <figure className={`project-visual project-visual--${project.visual} ${compact ? 'project-visual--compact' : ''} ${compact && project.cover ? 'project-visual--cover' : ''}`}>
      <img src={media?.src ?? `/covers/${project.visual}.svg`} alt={media?.alt ?? `Illustrated concept cover for ${project.title}`} width={media?.width ?? 640} height={media?.height ?? 640} loading="lazy" />
      {!media && <figcaption>{project.confidential ? 'Concept cover · confidential work' : 'Illustrated project cover'}</figcaption>}
    </figure>
  )
}
