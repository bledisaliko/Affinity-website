import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const deploy = join(resolve(process.cwd()), 'deploy')
const required = [
  'index.html', '404.html', '.htaccess', '_nuxt', 'business-print/index.html',
  'api/quote-request.php', 'brand/affinity-header-logo.png', 'brand/affinity-footer-logo.png',
  'images/home-hero/hero-collage.png', 'images/home-hero/banner-swoosh-clean.png', 'images/simple/team.png'
]
const banned = [
  'home-redesign', 'applyHomeHero', 'scheduleApply', 'Your brand, made visible.',
  'Make the print request clear.', 'From garment idea to finished order.', 'Bring these five details.',
  'interactive-process', 'project-brief'
]

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

for (const relativePath of required) {
  if (!existsSync(join(deploy, relativePath))) throw new Error(`Deploy output is missing ${relativePath}.`)
}

for (const file of walk(deploy)) {
  if (!/\.(?:html|js|css|json|xml|txt|php)$/.test(file)) continue
  const content = readFileSync(file, 'utf8')
  for (const phrase of banned) {
    if (content.includes(phrase)) throw new Error(`Banned legacy phrase "${phrase}" found in ${file}.`)
  }
}

const homepage = readFileSync(join(deploy, 'index.html'), 'utf8')
const businessPrint = readFileSync(join(deploy, 'business-print', 'index.html'), 'utf8')
if (!homepage.includes('Stand out.')) throw new Error('Final homepage hero is missing from deploy output.')
if (!businessPrint.includes('Guided Quote Builder') || !businessPrint.includes('Step 1 of 5')) {
  throw new Error('Guided business print quote builder is missing from the first render.')
}

for (const route of ['apparel', 'embroidery', 'business-print', 'signs-vehicle-graphics', 'vinyl-graphics', 'glass-finishes', 'digital-marketing']) {
  const html = readFileSync(join(deploy, route, 'index.html'), 'utf8')
  if (!html.includes('Guided Quote Builder') || !html.includes('Step 1 of 5')) {
    throw new Error(`Guided quote builder is missing from the first render for ${route}.`)
  }
}

console.log('Deploy verification passed.')
