import { createContext, useContext } from 'react'

interface HomeBackgroundState { index: number; select: (index: number) => void }
export const HomeBackgroundContext = createContext<HomeBackgroundState | null>(null)

export function useHomeBackground() {
  const context = useContext(HomeBackgroundContext)
  if (!context) throw new Error('HomeBackgroundProvider is required')
  return context
}
