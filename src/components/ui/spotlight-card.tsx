// Original implementation for the portfolio; no additional 21st retrieval.
import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Spotlight } from './spotlight'

export function SpotlightCard({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <article className={cn('spotlight-card', className)}><Spotlight /><div className="spotlight-card__content">{children}</div></article>
}
