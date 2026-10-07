import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { projects } from '../data/portfolio'
import { CoverflowCarousel } from './ui/coverflow-carousel'

const galleryProjects = [
  ...projects.filter(project => project.cover),
  ...projects.filter(project => !project.cover && project.featured),
  ...projects.filter(project => !project.cover && !project.featured),
]
const slides = galleryProjects.map(project => {
  const media = project.cover ?? project.media[0]
  return {
    src: media?.src ?? `/covers/${project.visual}.svg`,
    alt: media?.alt ?? `Illustrated concept cover for ${project.title}`,
    title: project.title,
  }
})

export function WorkGallery() {
  const [selected, setSelected] = useState(0)
  const active = galleryProjects[selected]
  return (
    <div className="work-gallery">
      <CoverflowCarousel slides={slides} onSlideChange={setSelected} showNavigation showPagination cardWidth="clamp(190px, 27vw, 310px)" rotate={38} depth={0.42} gap={0.025} fade={0.12} label="Selected project collection" className="work-gallery__carousel" />
      <div className="work-gallery__caption" aria-live="polite" aria-atomic="true">
        <div><span className="work-gallery__category">{active.category} <i /> {active.period}</span><h3>{active.title}</h3><p>{active.summary}</p></div>
        <Link className="round-link" to={`/projects/${active.slug}`} aria-label={`View ${active.title} case study`}><ArrowUpRight size={24} aria-hidden="true" /></Link>
      </div>
      <div className="work-gallery__hint"><span>{active.cover || active.media.length ? 'Website preview' : 'Illustrated project cover'}</span><span>Drag to discover <span aria-hidden="true">↔</span></span></div>
    </div>
  )
}
