// Based on the lazy SplineScene supplied by the user (Serafim / 21st.dev).
import { Component, Suspense, lazy, type PropsWithChildren, type ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

class SceneBoundary extends Component<PropsWithChildren<{ fallback: ReactNode; onFailure?: () => void }>, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure?.() }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
  onFailure?: () => void
}

export function SplineScene({ scene, className, onLoad, onFailure }: SplineSceneProps) {
  return (
    <SceneBoundary fallback={null} onFailure={onFailure}>
      <Suspense fallback={null}>
        <Spline scene={scene} className={className} renderOnDemand onLoad={onLoad} />
      </Suspense>
    </SceneBoundary>
  )
}
