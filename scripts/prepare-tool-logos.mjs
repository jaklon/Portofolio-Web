import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as icons from 'simple-icons'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const directory = path.join(root, 'public', 'logos')
await fs.mkdir(directory, { recursive: true })
const mapped = {
  react: 'siReact', typescript: 'siTypescript', javascript: 'siJavascript', html5: 'siHtml5', css: 'siCss', tailwindcss: 'siTailwindcss',
  vite: 'siVite', gsap: 'siGsap', wix: 'siWix', python: 'siPython', php: 'siPhp', qwen: 'siQwen', vllm: 'siVllm',
  githubactions: 'siGithubactions', apache: 'siApache', cpanel: 'siCpanel', composer: 'siComposer', npm: 'siNpm', kotlin: 'siKotlin', trendmicro: 'siTrendmicro',
}
const sources = []
for (const [id, symbol] of Object.entries(mapped)) {
  const icon = icons[symbol]
  if (!icon) throw new Error(`Icon export not available: ${symbol}`)
  await fs.writeFile(path.join(directory, `${id}.svg`), icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `))
  sources.push({ id, library: 'Simple Icons', title: icon.title, slug: icon.slug, source: icon.source, license: icon.license ?? 'CC0 collection; brand rights remain with their owners' })
}
// Brand assets acquired from the observed official sites or Devicon's Java asset.
// Files are committed locally; regenerating the collection makes no network requests.
const acquired = {
  gophish: { source: 'https://getgophish.com/img/logo.min.svg', note: 'White source mark on a navy backing for contrast.' },
  tenable: { source: 'https://www.tenable.com/', note: 'Existing SVG mark exported from the official footer; navy backing for contrast.' },
  cyberark: { source: 'https://cyberark.github.io/conjur/img/cybr_logo_horiz.svg', note: 'Symbol portion of the official horizontal logo.' },
  chroma: { source: 'https://www.trychroma.com/_next/static/immutable/media/chroma-wordmark.3omc55d6a9e1l.svg', note: 'Symbol portion of the official horizontal logo.' },
  motion: { source: 'https://motion.dev/', note: 'Header SVG mark; currentColor resolved to dark ink.' },
  emailjs: { source: 'https://www.emailjs.com/', note: 'Header SVG mark; currentColor resolved to orange.' },
  java: { source: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg', note: 'Devicon asset; Java trademark belongs to its owner.' },
}
for (const [id, metadata] of Object.entries(acquired)) {
  const filename = path.join(directory, `${id}.svg`)
  let svg = await fs.readFile(filename, 'utf8')
  if (id === 'gophish' && !svg.includes('data-toolkit-background')) svg = svg.replace(/(<svg[^>]*>)/, '$1<rect data-toolkit-background="true" width="175" height="200" rx="18" fill="#173a69"/>')
  if (id === 'cyberark') svg = svg.replace(/viewBox="[^"]*"/, 'viewBox="0 0 60 68.23"')
  if (id === 'chroma') svg = svg.replace(/<svg[^>]*>/, '<svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">')
  await fs.writeFile(filename, svg)
  sources.push({ id, ...metadata, license: 'Original source and brand rights apply; no license inferred from public availability.' })
}
// Explicit badges for protocols/algorithms and products without a verified standalone mark.
const wordmarks = { smtp: 'SMTP', ftp: 'FTP', bm25: 'BM25', rag: 'RAG', 'sentence-transformers': 'ST', phpmailer: 'PHP\nMAIL', laps: 'LAPS' }
for (const [id, label] of Object.entries(wordmarks)) {
  const filename = path.join(directory, `${id}.svg`)
  const lines = label.split('\n')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><title>${label.replace('\n', ' ')}</title>${lines.map((line, index) => `<text x="40" y="${lines.length > 1 ? 35 + index * 20 : 46}" font-family="Arial, sans-serif" font-weight="700" font-size="${line.length > 5 ? 14 : 19}" text-anchor="middle" fill="#334577">${line}</text>`).join('')}</svg>`
  await fs.writeFile(filename, svg)
  sources.push({ id, source: 'Local text badge; not represented as an official brand logo' })
}
const manifest = { generatedOn: '2026-10-06', library: 'https://github.com/simple-icons/simple-icons', usageEvidence: 'Existing portfolio project/skill data; security tools explicitly named by the user on 6 October 2026.', icons: sources }
await fs.writeFile(path.join(root, 'docs', 'tool-logo-sources.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Prepared ${sources.length} local tool icons (${Object.keys(mapped).length + Object.keys(acquired).length} brand marks and ${Object.keys(wordmarks).length} explicit text badges).`)
