import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const publicDir = join(root, 'public')

const requiredRoutes = [
  '/',
  '/services/',
  '/apparel/',
  '/embroidery/',
  '/business-print/',
  '/signs-vehicle-graphics/',
  '/vinyl-graphics/',
  '/glass-finishes/',
  '/digital-marketing/',
  '/blog/',
  '/blog/vehicle-graphics-marketing/',
  '/blog/local-seo-for-gta-businesses/',
  '/blog/direct-mail-canada-post/',
  '/blog/embroidery-dtf-screen-printing/',
  '/contact/',
  '/privacy/',
  '/terms/'
]

const requiredSourceFiles = [
  'app/pages/index.vue',
  'app/pages/services.vue',
  'app/pages/apparel.vue',
  'app/pages/embroidery.vue',
  'app/pages/business-print.vue',
  'app/pages/signs-vehicle-graphics.vue',
  'app/pages/vinyl-graphics.vue',
  'app/pages/glass-finishes.vue',
  'app/pages/digital-marketing.vue',
  'app/pages/blog/index.vue',
  'app/pages/blog/[slug].vue',
  'app/pages/contact.vue',
  'app/pages/privacy.vue',
  'app/pages/terms.vue',
  'app/pages/404.vue'
]

const requiredImages = [
  'brand/affinity-favicon.png',
  'brand/affinity-header-logo.png',
  'brand/affinity-footer-logo.png',
  'brand/affinity-circle-patch.png',
  'images/apparel/custom-printed-hoodie.webp',
  'images/apparel/branded-baseball-hat.webp',
  'images/embroidery/embroidered-company-polo.webp',
  'images/business-print/business-cards.webp',
  'images/business-print/flyers-brochures.webp',
  'images/signs/storefront-vinyl.webp',
  'images/vehicle-graphics/vehicle-lettering.webp',
  'images/vehicle-graphics/commercial-vehicle-wrap.webp',
  'images/glass-finishes/frosted-meeting-room.webp',
  'images/digital/website-devices.webp',
  'images/blog/vehicle-graphics-marketing.webp',
  'images/blog/local-seo-for-gta-businesses.webp',
  'images/blog/direct-mail-canada-post.webp',
  'images/blog/embroidery-dtf-screen-printing.webp'
]

const requiredBlogFiles = [
  'content/blog/vehicle-graphics-marketing.md',
  'content/blog/local-seo-for-gta-businesses.md',
  'content/blog/direct-mail-canada-post.md',
  'content/blog/embroidery-dtf-screen-printing.md'
]

const bannedPublicPhrases = [
  'Add to Cart',
  'Buy Now',
  'Shopping cart',
  'Checkout',
  'Online payments',
  'WooCommerce',
  'Service Overview',
  'Suitable Applications',
  'Related Projects',
  'Start Here',
  'Popular services for local search',
  'More GTA landing pages',
  'placeholder'
]

function readJson(path) {
  try {
    return JSON.parse(readFileSync(join(root, path), 'utf8'))
  } catch (error) {
    throw new Error(`Could not read ${path}: ${error.message}`)
  }
}

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function assertRequired(value, message) {
  assert(typeof value === 'string' && value.trim().length > 0, message)
}

function assertExists(path, message) {
  assert(existsSync(join(root, path)), message ?? `${path} does not exist.`)
}

function assertNoBracketTokens(value, label) {
  if (typeof value === 'string') {
    assert(
      !/\[(PHONE NUMBER|EMAIL ADDRESS|BUSINESS HOURS|DOMAIN|COMPANY NAME|BUSINESS ADDRESS|INSTAGRAM URL|FACEBOOK URL|GOOGLE BUSINESS PROFILE URL)\]/.test(value),
      `${label} contains a business placeholder token.`
    )
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoBracketTokens(item, `${label}[${index}]`))
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      assertNoBracketTokens(child, `${label}.${key}`)
    }
  }
}

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function main() {
  const site = readJson('content/site.json')
  assertRequired(site.companyName, 'content/site.json is missing companyName.')
  assert(site.companyName === 'Affinity Creative', 'Brand must be Affinity Creative.')
  assert(site.domain === 'https://affinitycreative.ca', 'Domain must be https://affinitycreative.ca.')
  assert(site.email === 'info@affinitycreative.ca', 'Email must be info@affinitycreative.ca.')
  assert(site.phone === '437-313-1510', 'Phone must be 437-313-1510.')
  assert(site.emailHref === 'mailto:info@affinitycreative.ca', 'Email link is incorrect.')
  assert(site.phoneHref === 'tel:+14373131510', 'Phone link is incorrect.')
  assert(site.address === '', 'Address should stay empty until confirmed.')
  assert(site.businessHours === '', 'Business hours should stay empty until confirmed.')
  assertNoBracketTokens(site, 'content/site.json')

  assert(new Set(requiredRoutes).size === requiredRoutes.length, 'Duplicate routes found in validation list.')
  for (const file of requiredSourceFiles) assertExists(file, `Missing source page: ${file}`)
  for (const file of requiredImages) {
    assert(existsSync(join(publicDir, file)), `Missing required public image: ${file}`)
  }
  for (const file of requiredBlogFiles) {
    assertExists(file, `Missing blog source: ${file}`)
    const content = read(file)
    assert(/^---[\s\S]+?---/.test(content), `${file} is missing frontmatter.`)
    assert(/draft:\s*false/.test(content), `${file} must not be draft.`)
    assert(/publishedAt:\s*"2026-07-15"/.test(content), `${file} has an invalid publishedAt date.`)
    assertNoBracketTokens(content, file)
  }

  const sourceFiles = [
    ...walk(join(root, 'app')).filter((file) => /\.(vue|ts)$/.test(file)),
    ...requiredBlogFiles.map((file) => join(root, file))
  ]

  for (const file of sourceFiles) {
    const content = readFileSync(file, 'utf8')
    for (const phrase of bannedPublicPhrases) {
      assert(!content.includes(phrase), `Banned phrase "${phrase}" found in ${file}.`)
    }
    assertNoBracketTokens(content, file)
  }

  console.log(`Content validation passed: ${requiredRoutes.length} public routes, ${requiredBlogFiles.length} blog articles, ${requiredImages.length} required images.`)
}

try {
  main()
} catch (error) {
  console.error(`Content validation failed: ${error.message}`)
  process.exit(1)
}
