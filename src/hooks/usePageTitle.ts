import { useEffect } from 'react'

const baseTitle = 'Jascon Kembuan — Web, AI & Security Software Developer'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Jascon Kembuan` : baseTitle
    return () => {
      document.title = baseTitle
    }
  }, [title])
}
