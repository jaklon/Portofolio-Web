export type ProjectCategory = 'freelance' | 'academic' | 'internship'
export type ProjectStatus = 'Ongoing' | 'Completed' | 'In progress' | 'Academic collection'
export type ProjectVisualVariant =
  | 'circular'
  | 'industrial'
  | 'carbon'
  | 'power'
  | 'fire'
  | 'connected'
  | 'secure'

export interface ProjectMedia {
  src: string
  alt: string
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  client: string
  category: ProjectCategory
  role: string
  period: string
  status: ProjectStatus
  featured: boolean
  summary: string
  overview: string
  contributions: string[]
  stack: string[]
  deliveryContext: string
  media: ProjectMedia[]
  cover?: ProjectMedia
  logo?: string
  externalUrl?: string
  repoUrl?: string
  confidential?: boolean
  visual: ProjectVisualVariant
  accent: 'cyan' | 'lime' | 'blue'
}

export interface Experience {
  company: string
  role: string
  period: string
  mode: string
  summary: string
}

export interface Education {
  institution: string
  program: string
  period: string
  summary: string
}

export interface Achievement {
  title: string
  issuer: string
  date: string
}

export interface SkillGroup {
  label: string
  skills: string[]
}
