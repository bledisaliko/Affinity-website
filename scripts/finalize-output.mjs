import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const output = join(root, '.output/public')

if (!existsSync(output)) {
  throw new Error('.output/public was not created.')
}

copyFileSync(join(root, '.htaccess'), join(output, '.htaccess'))

const required = [
  'index.html',
  '404.html',
  'services/index.html',
  'apparel/index.html',
  'embroidery/index.html',
  'business-print/index.html',
  'signs-vehicle-graphics/index.html',
  'vinyl-graphics/index.html',
  'glass-finishes/index.html',
  'digital-marketing/index.html',
  'blog/index.html',
  'blog/vehicle-graphics-marketing/index.html',
  'blog/local-seo-for-gta-businesses/index.html',
  'blog/direct-mail-canada-post/index.html',
  'blog/embroidery-dtf-screen-printing/index.html',
  'contact/index.html',
  'privacy/index.html',
  'terms/index.html',
  'sitemap.xml',
  'robots.txt',
  'brand/affinity-favicon.png',
  'brand/affinity-header-logo.png',
  'brand/affinity-footer-logo.png',
  'brand/affinity-circle-patch.png',
  'og-default.jpg',
  'api/quote.php',
  'api/csrf.php',
  'api/quote-request.php',
  'images/home-hero/hero-collage.png',
  'images/home-hero/banner-swoosh-clean.png',
  'images/simple/team.png',
  '.htaccess'
]

const missing = required.filter((relativePath) => !existsSync(join(output, relativePath)))

if (missing.length) {
  throw new Error(`Generated output is missing: ${missing.join(', ')}`)
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const htmlFiles = walk(output).filter((path) => path.endsWith('.html'))
console.log(`Finalized static output with ${htmlFiles.length} HTML files.`)

mkdirSync(join(root, 'outputs'), { recursive: true })
