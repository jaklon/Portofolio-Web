import { mkdir, readFile, writeFile } from 'node:fs/promises'

const source = (await readFile(process.argv[2], 'utf8')).replaceAll('\r\n', '\n')
const code = source.split('hero-carousel.tsx\n')[1].split('\ndemo.tsx')[0].trim()
  .replace('from "framer-motion"', 'from "motion/react"')
  .replaceAll('split("\n")', 'split("\\n")')
  .replaceAll('replace(/\n/g,', 'replace(/\\n/g,')
// Preserve the upstream prompt without replacing the adapted production component.
const backup = new URL('../backups/home-wallpaper-originals/', import.meta.url)
await mkdir(backup, { recursive: true })
await writeFile(new URL('hero-carousel-upstream.tsx', backup), code + '\n')
