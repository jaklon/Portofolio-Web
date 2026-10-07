import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageTransition } from '../components/PageTransition'

export function NotFoundPage({ embedded = false }: { embedded?: boolean }) {
  usePageTitle('Page not found')

  const content = (
    <main id="main-content" className="not-found-page page-width">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>This route is outside the map.</h1>
      <p>The page may have moved, or the project record does not exist.</p>
      <Link className="button button--primary" to="/"><ArrowLeft size={18} aria-hidden="true" /> Back home</Link>
    </main>
  )

  return embedded ? content : <PageTransition>{content}</PageTransition>
}
