import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

// Run with Sharp installed, or set PROJECT_IMAGE_RUNTIME to a Node packages directory.
const require = createRequire(import.meta.url)
const sharp = require(process.env.PROJECT_IMAGE_RUNTIME ? path.join(process.env.PROJECT_IMAGE_RUNTIME, 'sharp') : 'sharp')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projects = [
  { folder: 'circular-waste', title: 'Circular Waste', domain: 'circularwaste.id', logo: 'logo.png', color: '#e5efe6', ink: '#234d3a' },
  { folder: 'lippi-mining', title: 'Lippi Mining', domain: 'lippimining.co', logo: 'logo.webp', color: '#e8ecf3', ink: '#172c51' },
  { folder: 'carbon-treat', title: 'Carbon Treat', domain: 'carbontreat.id', logo: 'logo.png', color: '#e9efdf', ink: '#244b35' },
  { folder: 'alpha-power', title: 'Alpha Power', domain: 'alphamachinery.net', logo: 'logo.avif', color: '#f0e8e4', ink: '#263952' },
]

for (const project of projects) {
  const directory = path.join(root, 'public', 'projects', project.folder)
  const capture = path.join(root, 'backups', 'project-captures', `${project.folder}.jpg`)
  const screenshot = await sharp(capture).resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
  const metadata = await sharp(screenshot).metadata()
  await fs.writeFile(path.join(directory, 'home.webp'), screenshot)
  // Trim empty source padding while preserving the mark's colours and proportions.
  const logo = await sharp(path.join(directory, project.logo)).trim({ threshold: 12 }).resize({ width: 200, height: 122, fit: 'inside' }).png().toBuffer()
  // Librsvg embeds PNG reliably; the published assets still use compressed WebP.
  const screenshotPng = await sharp(screenshot).png().toBuffer()
  const screenshotUrl = `data:image/png;base64,${screenshotPng.toString('base64')}`
  const logoUrl = `data:image/png;base64,${logo.toString('base64')}`
  const imageHeight = 920 * metadata.height / metadata.width
  const browserHeight = imageHeight + 33
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <defs><clipPath id="browser"><rect x="52" y="276" width="920" height="${browserHeight}" rx="16"/></clipPath></defs>
    <rect width="1024" height="1024" fill="${project.color}"/>
    <text x="52" y="44" font-family="monospace" font-size="16" letter-spacing="2" fill="${project.ink}" opacity=".7">SELECTED WEB PROJECT</text>
    <rect x="52" y="74" width="218" height="138" rx="20" fill="white"/>
    <image href="${logoUrl}" x="64" y="82" width="194" height="122" preserveAspectRatio="xMidYMid meet"/>
    <text x="308" y="133" font-family="Arial, sans-serif" font-size="46" font-weight="600" letter-spacing="-1.5" fill="${project.ink}">${project.title}</text>
    <text x="311" y="172" font-family="monospace" font-size="20" fill="${project.ink}" opacity=".75">${project.domain}</text>
    <path d="M934 83h22v22M954 85l-30 30" fill="none" stroke="${project.ink}" stroke-width="3"/>
    <rect x="52" y="288" width="920" height="${browserHeight}" rx="16" fill="${project.ink}" opacity=".1"/>
    <g clip-path="url(#browser)">
      <rect x="52" y="276" width="920" height="${browserHeight}" fill="white"/>
      <rect x="52" y="276" width="920" height="33" fill="#f7f7f7"/>
      <circle cx="72" cy="292" r="4" fill="#d0ccc5"/><circle cx="87" cy="292" r="4" fill="#d0ccc5"/><circle cx="102" cy="292" r="4" fill="#d0ccc5"/>
      <text x="512" y="297" text-anchor="middle" font-family="monospace" font-size="12" fill="#6e7378">${project.domain}</text>
      <image href="${screenshotUrl}" x="52" y="309" width="920" height="${imageHeight}" preserveAspectRatio="xMidYMid meet"/>
    </g>
    <rect x="52" y="276" width="920" height="${browserHeight}" rx="16" fill="none" stroke="${project.ink}" stroke-opacity=".14"/>
    <text x="52" y="878" font-family="monospace" font-size="16" letter-spacing="1" fill="${project.ink}" opacity=".65">COMPANY PROFILE / CLIENT WEBSITE</text>
    <path d="M52 944h920" stroke="${project.ink}" stroke-opacity=".18"/>
    <text x="52" y="980" font-family="monospace" font-size="16" letter-spacing="1" fill="${project.ink}">JASCON KEMBUAN / WEB DEVELOPMENT</text>
    <text x="972" y="980" text-anchor="end" font-family="monospace" font-size="14" fill="${project.ink}" opacity=".7">HOMEPAGE PREVIEW</text>
  </svg>`
  const cover = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toBuffer()
  await fs.writeFile(path.join(directory, 'cover.webp'), cover)
  console.log(JSON.stringify({ project: project.folder, width: metadata.width, height: metadata.height, screenshotBytes: screenshot.length, coverBytes: cover.length }))
}
