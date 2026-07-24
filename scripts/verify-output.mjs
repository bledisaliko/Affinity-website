import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const output = join(root, '.output/public')

const required = [
  'index.html',
  '404.html',
  '.htaccess',
  'robots.txt',
  'sitemap.xml',
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
  'images/simple/customer-products.png',
  'images/promotional-products/corporate-gifts.jpg',
  'images/promotional-products/branded-mugs.webp',
  'images/promotional-products/tote-bags.png'
]

const banned = [
  'Add to Cart',
  'Buy Now',
  'Shopping cart',
  'Checkout',
  'Online payments',
  'WordPress',
  'WooCommerce',
  'Service Overview',
  'Suitable Applications',
  'Related Projects',
  'Start Here',
  'Popular services for local search',
  'More GTA landing pages',
  'placeholder',
  'home-redesign',
  'applyHomeHero',
  'scheduleApply',
  'Your brand, made visible.',
  'Make the print request clear.',
  'From garment idea to finished order.',
  'Bring these five details.'
]

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

for (const relativePath of required) {
  assert(existsSync(join(output, relativePath)), `Generated output is missing ${relativePath}.`)
}

const homepage = readFileSync(join(output, 'index.html'), 'utf8')
assert(/<h1[\s>]/i.test(homepage), 'Homepage is missing an H1.')
assert(homepage.includes('Stand out.'), 'Homepage hero copy is missing.')
assert(homepage.includes('/apparel/'), 'Homepage apparel link is missing.')
assert(homepage.includes('/embroidery/'), 'Homepage embroidery link is missing.')
assert(homepage.includes('/vinyl-graphics/'), 'Homepage vinyl graphics link is missing.')
assert(homepage.includes('/glass-finishes/'), 'Homepage glass finishes link is missing.')
assert(homepage.includes('/brand/affinity-header-logo.png'), 'Header brand logo is missing.')
assert(homepage.includes('/brand/affinity-footer-logo.png'), 'Footer brand logo is missing.')
assert(homepage.includes('/brand/affinity-circle-patch.png'), 'Circular patch asset is missing.')
assert(homepage.includes('/api/quote.php'), 'Quote form endpoint is missing.')
assert(homepage.includes('Stand out. Make an impact.'), 'Final footer slogan is missing.')
assert((homepage.match(/googletagmanager\.com\/gtag\/js\?id=G-REF62SP9DJ/g) || []).length === 1, 'Homepage must contain exactly one Google tag loader.')
assert((homepage.match(/gtag\('config', 'G-REF62SP9DJ'\)/g) || []).length === 1, 'Homepage must contain exactly one Google tag configuration.')
assert(homepage.includes('/images/simple/customer-products.png'), 'Approved customer-products image is missing.')

const businessPrint = readFileSync(join(output, 'business-print/index.html'), 'utf8')
assert(businessPrint.includes('Build a print quote with the right print details.'), 'Business print quote heading is missing.')
assert(businessPrint.includes('Guided Quote Builder'), 'Business print guided quote builder is missing from the first render.')
assert(businessPrint.includes('Step 1 of 5'), 'Business print quote builder does not start at step 1 of 5.')

const serviceBuilderRoutes = [
  'apparel',
  'embroidery',
  'business-print',
  'signs-vehicle-graphics',
  'vinyl-graphics',
  'glass-finishes',
  'digital-marketing'
]

for (const route of serviceBuilderRoutes) {
  const html = readFileSync(join(output, route, 'index.html'), 'utf8')
  assert(html.includes('Guided Quote Builder'), `${route} is missing the Guided Quote Builder from the first render.`)
  assert(html.includes('Step 1 of 5'), `${route} does not start with Step 1 of 5.`)
  assert(!html.includes('interactive-process'), `${route} still contains the obsolete interactive process.`)
  assert(!html.includes('project-brief'), `${route} still contains the obsolete project brief.`)
}

const services = readFileSync(join(output, 'services/index.html'), 'utf8')
assert(services.includes('Services that put your business in view.'), 'Services overview hero is missing.')
assert(services.includes('/embroidery/'), 'Services overview embroidery link is missing.')
assert(services.includes('/vinyl-graphics/'), 'Services overview vinyl graphics link is missing.')
assert(services.includes('/glass-finishes/'), 'Services overview glass link is missing.')

const embroidery = readFileSync(join(output, 'embroidery/index.html'), 'utf8')
assert(embroidery.includes('Custom Embroidery for Workwear, Hats and Uniforms.'), 'Embroidery page H1 is missing.')
assert(embroidery.includes('/blog/embroidery-dtf-screen-printing/'), 'Embroidery article link is missing.')

const vinyl = readFileSync(join(output, 'vinyl-graphics/index.html'), 'utf8')
assert(vinyl.includes('Vinyl Graphics for Vehicles, Windows and Storefronts.'), 'Vinyl graphics page H1 is missing.')
assert(vinyl.includes('/blog/vehicle-graphics-marketing/'), 'Vinyl graphics article link is missing.')

const contact = readFileSync(join(output, 'contact/index.html'), 'utf8')
assert(contact.includes('Tell us what you are planning.'), 'Contact hero is missing.')
assert(contact.includes('info@affinitycreative.ca'), 'Contact email is missing.')
assert(contact.includes('csrfToken'), 'Contact form CSRF field is missing.')

const blog = readFileSync(join(output, 'blog/index.html'), 'utf8')
assert(blog.includes('Embroidery, DTF or Screen Printing?'), 'Blog index is missing apparel article.')

for (const file of walk(output)) {
  if (!/\.(html|json|js|css|txt|xml|htaccess|php)$/.test(file)) continue
  const content = readFileSync(file, 'utf8')
  assert(
    !/\[(PHONE NUMBER|EMAIL ADDRESS|BUSINESS HOURS|DOMAIN|COMPANY NAME|BUSINESS ADDRESS|INSTAGRAM URL|FACEBOOK URL|GOOGLE BUSINESS PROFILE URL)\]/.test(content),
    `Business placeholder token found in generated output file ${file}.`
  )
  for (const phrase of banned) {
    if (file.endsWith('.js') && phrase === 'placeholder') continue
    assert(!content.includes(phrase), `Banned phrase "${phrase}" found in generated output file ${file}.`)
  }
}

console.log(`Output verification passed for ${required.length} required files.`)
