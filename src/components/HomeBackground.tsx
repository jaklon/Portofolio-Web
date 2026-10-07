import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import { HeroCarouselBackdrop } from './ui/hero-carousel'
import { homeWallpapers } from '../data/home-wallpapers'
import { HomeBackgroundContext, useHomeBackground } from '../hooks/useHomeBackground'

const storageKey = 'jascon-home-wallpaper'

function initialIndex() {
  try {
    const saved = window.localStorage.getItem(storageKey)
    return Math.max(0, homeWallpapers.findIndex(item => item.id === saved))
  } catch { return 0 }
}

export function HomeBackgroundProvider({ children }: PropsWithChildren) {
  const [index, setIndex] = useState(initialIndex)
  const select = useCallback((next: number) => {
    const safe = Number.isFinite(next) ? Math.max(0, Math.min(homeWallpapers.length - 1, Math.round(next))) : 0
    setIndex(safe)
    try { window.localStorage.setItem(storageKey, String(homeWallpapers[safe].id)) } catch { /* Selection also works when storage is unavailable. */ }
  }, [])
  const value = useMemo(() => ({ index, select }), [index, select])
  return <HomeBackgroundContext.Provider value={value}>{children}</HomeBackgroundContext.Provider>
}

export function HomeBackground() {
  const { index } = useHomeBackground()
  return <div className="home-background" aria-hidden="true"><HeroCarouselBackdrop item={homeWallpapers[index]} /><div className="home-background__wash" /></div>
}
