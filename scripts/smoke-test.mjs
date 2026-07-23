import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

execFileSync(process.execPath, [join(root, 'scripts/validate-content.mjs')], { stdio: 'inherit' })
execFileSync(process.execPath, [join(root, 'scripts/generate-sitemap.mjs')], { stdio: 'inherit' })

const bannedPhrases = [
  'Add to Cart',
  'Buy Now',
  'Shopping cart',
  'Checkout',
  'Online payments',
  'Built for how',
  'service-area requests',
  'practical consistency',
  'production path',
  'quote guidance',
  'same logo, colour direction and message',
  'support daily field work and local customer visits',
  'can be planned on its own',
  'use this page for',
  'Useful For',
  'Start Here',
  'Popular services for local search',
  'real project needs',
  'More GTA landing pages',
  'leave-behind print',
  'brand production services',
  'Construction Crew Uniform Launch',
  'Cleaning Company DTF Apparel',
  'Team Event Screen Print Run',
  'Retail Launch Website and Campaign',
  'Property Management Brand Kit',
  'placeholder'
]

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (
      path.includes('node_modules') ||
      path.includes('.output') ||
      path.includes('.nuxt') ||
      path.includes(`${join(root, 'dist')}`) ||
      path.includes(`${join(root, 'outputs')}`)
    ) return []
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

for (const file of walk(root)) {
  if (!/\.(vue|ts|json|md|php|html|css)$/.test(file)) continue
  if (file.endsWith('smoke-test.mjs') || file.endsWith('verify-output.mjs')) continue
  const content = readFileSync(file, 'utf8')
  for (const phrase of bannedPhrases) {
    if (content.includes(phrase)) {
      throw new Error(`Banned ecommerce phrase "${phrase}" found in ${file}`)
    }
  }
}

const requiredPublicFiles = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/favicon.ico',
  '.htaccess'
]

for (const relativePath of requiredPublicFiles) {
  if (!existsSync(join(root, relativePath))) {
    throw new Error(`Missing required file: ${relativePath}`)
  }
}

console.log('Smoke tests passed.')
