import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const site = JSON.parse(readFileSync(join(root, 'content/site.json'), 'utf8'))

const base = site.domain.replace(/\/$/, '')

const routes = [
  { path: '/' },
  { path: '/services/' },
  { path: '/apparel/' },
  { path: '/embroidery/' },
  { path: '/business-print/' },
  { path: '/signs-vehicle-graphics/' },
  { path: '/vinyl-graphics/' },
  { path: '/glass-finishes/' },
  { path: '/digital-marketing/' },
  { path: '/blog/' },
  { path: '/blog/vehicle-graphics-marketing/', lastmod: '2026-07-15' },
  { path: '/blog/local-seo-for-gta-businesses/', lastmod: '2026-07-15' },
  { path: '/blog/direct-mail-canada-post/', lastmod: '2026-07-15' },
  { path: '/blog/embroidery-dtf-screen-printing/', lastmod: '2026-07-15' },
  { path: '/contact/' },
  { path: '/privacy/' },
  { path: '/terms/' }
]

const body = routes
  .map(({ path, lastmod }) => {
    const priority = path === '/' ? '1.0' : path === '/services/' ? '0.9' : path.startsWith('/blog/') ? '0.6' : '0.8'
    return [
      '  <url>',
      `    <loc>${base}${path}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      `    <priority>${priority}</priority>`,
      '  </url>'
    ].join('\n')
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`Generated sitemap.xml with ${routes.length} URLs.`)
