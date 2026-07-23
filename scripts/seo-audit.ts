import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

interface PageAudit {
  route: string
  title: string
  description: string
  canonical: string
  h1Count: number
  jsonLdCount: number
  imageCount: number
  linkCount: number
}

interface AuditReport {
  generatedAt: string
  outputDir: string
  pageCount: number
  errors: string[]
  warnings: string[]
  pages: PageAudit[]
}

const root = process.cwd()
const output = join(root, '.output/public')
const site = JSON.parse(readFileSync(join(root, 'content/site.json'), 'utf8')) as { domain: string }
const baseUrl = site.domain.replace(/\/$/, '')
const reportDir = process.env.SEO_AUDIT_OUTPUT_DIR || join(root, 'outputs')

const expectedRoutes = [
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

const publicServiceRoutes = [
  '/apparel/',
  '/embroidery/',
  '/business-print/',
  '/signs-vehicle-graphics/',
  '/vinyl-graphics/',
  '/glass-finishes/',
  '/digital-marketing/'
]

const imageExtensions = new Set(['.avif', '.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico'])
const staticExtensions = new Set(['.css', '.js', '.json', '.xml', '.txt', '.pdf', '.zip', '.webmanifest'])

function assert(condition: boolean, message: string, errors: string[]) {
  if (!condition) errors.push(message)
}

function walk(dir: string) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function routeToFile(route: string) {
  if (route === '/') return join(output, 'index.html')
  return join(output, route.replace(/^\/|\/$/g, ''), 'index.html')
}

function routeFromFile(file: string) {
  const normalized = relative(output, file).split(sep).join('/')
  if (normalized === 'index.html') return '/'
  if (!normalized.endsWith('/index.html')) return undefined
  return `/${normalized.replace(/\/index\.html$/, '')}/`
}

function parseAttributes(tag: string) {
  const attrs: Record<string, string> = {}
  const pattern = /\s([:@\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  let match: RegExpExecArray | null

  while ((match = pattern.exec(tag))) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? ''
  }

  return attrs
}

function getTags(html: string, tagName: string) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? []
}

function getMeta(html: string, key: string) {
  for (const tag of getTags(html, 'meta')) {
    const attrs = parseAttributes(tag)
    if (attrs.name === key || attrs.property === key) return attrs.content ?? ''
  }

  return ''
}

function getCanonical(html: string) {
  for (const tag of getTags(html, 'link')) {
    const attrs = parseAttributes(tag)
    if (attrs.rel === 'canonical') return attrs.href ?? ''
  }

  return ''
}

function getTitle(html: string) {
  return (/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').trim()
}

function stripHashAndQuery(href: string) {
  return href.split('#')[0].split('?')[0]
}

function pathHasExtension(path: string, extensions: Set<string>) {
  return Array.from(extensions).some((extension) => path.toLowerCase().endsWith(extension))
}

function normalizeInternalHref(href: string) {
  if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return undefined
  if (href.startsWith('javascript:')) return '__invalid_js__'

  let value = href
  if (value.startsWith(baseUrl)) value = value.slice(baseUrl.length) || '/'
  if (/^https?:\/\//i.test(value)) return undefined
  if (!value.startsWith('/')) return undefined

  value = stripHashAndQuery(value)
  if (!value || value === '/') return '/'
  if (value.startsWith('/_nuxt/') || value.startsWith('/api/')) return undefined
  if (pathHasExtension(value, imageExtensions) || pathHasExtension(value, staticExtensions)) return undefined
  return value.endsWith('/') ? value : `${value}/`
}

function outputPathForPublicUrl(url: string) {
  if (!url.startsWith(baseUrl)) return undefined
  const pathname = stripHashAndQuery(url.slice(baseUrl.length) || '/')
  if (pathname === '/') return join(output, 'index.html')
  return join(output, pathname.replace(/^\//, ''))
}

function validateJsonLdValue(value: unknown, path: string, errors: string[]) {
  if (typeof value === 'string') {
    if (value.trim() === '') errors.push(`JSON-LD blank field at ${path}.`)
    if (
      /(^|\.)(url|image|logo|mainEntityOfPage)$/i.test(path) &&
      !value.startsWith('https://') &&
      !value.startsWith('http://')
    ) {
      errors.push(`JSON-LD URL field is not absolute at ${path}: ${value}`)
    }
    if (/localhost|127\.0\.0\.1/i.test(value)) errors.push(`JSON-LD contains local URL at ${path}.`)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((child, index) => validateJsonLdValue(child, `${path}[${index}]`, errors))
    return
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (/review|aggregateRating|ratingValue/i.test(key)) {
        errors.push(`JSON-LD includes unsupported review/rating field at ${path}.${key}.`)
      }
      validateJsonLdValue(child, `${path}.${key}`, errors)
    }
  }
}

function parseJsonLd(html: string, route: string, errors: string[]) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  const jsonLd = scripts.filter((match) => {
    const attrs = parseAttributes(match[0])
    return attrs.type === 'application/ld+json'
  })

  for (const script of jsonLd) {
    const text = script[2].trim()
    try {
      const parsed = JSON.parse(text)
      validateJsonLdValue(parsed, `${route}.jsonLd`, errors)
    } catch (error) {
      errors.push(`JSON-LD does not parse on ${route}: ${(error as Error).message}`)
    }
  }

  return jsonLd.length
}

function validateImages(html: string, route: string, errors: string[]) {
  const images = getTags(html, 'img')

  for (const tag of images) {
    const attrs = parseAttributes(tag)
    if (!Object.hasOwn(attrs, 'alt')) errors.push(`Image is missing alt on ${route}: ${tag}`)
    if (attrs.src?.startsWith('/')) {
      const assetPath = join(output, attrs.src.replace(/^\//, ''))
      assert(existsSync(assetPath), `Image source does not exist on ${route}: ${attrs.src}`, errors)
    }
  }

  return images.length
}

function validateInternalLinks(html: string, route: string, errors: string[]) {
  const links = getTags(html, 'a')

  for (const tag of links) {
    const attrs = parseAttributes(tag)
    const normalized = normalizeInternalHref(attrs.href ?? '')
    if (!normalized) continue
    if (normalized === '__invalid_js__') {
      errors.push(`JavaScript-only navigation link found on ${route}.`)
      continue
    }
    if (!expectedRoutes.includes(normalized)) {
      errors.push(`Internal link does not resolve from ${route}: ${attrs.href}`)
    }
  }

  return links.length
}

function renderHtmlReport(report: AuditReport) {
  const status = report.errors.length ? 'Needs fixes' : 'Passed'
  const rows = report.pages
    .map((page) => `<tr><td>${page.route}</td><td>${escapeHtml(page.title)}</td><td>${escapeHtml(page.description)}</td><td>${page.h1Count}</td><td>${page.jsonLdCount}</td></tr>`)
    .join('')
  const errors = report.errors.map((error) => `<li>${escapeHtml(error)}</li>`).join('')
  const warnings = report.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join('')

  return `<!doctype html>
<html lang="en-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Affinity Creative SEO Audit Report</title>
  <style>
    body { margin: 0; background: #f4f1ea; color: #11110f; font-family: Arial, sans-serif; }
    main { max-width: 1180px; margin: 0 auto; padding: 36px 20px; }
    h1 { margin: 0 0 8px; font-size: 42px; line-height: 1; }
    .summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 24px 0; }
    .card { border: 1px solid #ddd6ca; border-radius: 8px; background: #fff; padding: 16px; }
    .value { display: block; margin-top: 6px; color: #ff5a2f; font-size: 28px; font-weight: 900; }
    table { width: 100%; border-collapse: collapse; background: #fff; }
    th, td { border: 1px solid #ddd6ca; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #11110f; color: #fff; }
    li { margin-block: 6px; }
    @media (max-width: 800px) { .summary { grid-template-columns: 1fr 1fr; } table { font-size: 12px; } }
  </style>
</head>
<body>
  <main>
    <p>Affinity Creative</p>
    <h1>SEO Audit Report</h1>
    <p>Generated ${escapeHtml(report.generatedAt)} from <code>.output/public</code>.</p>
    <section class="summary" aria-label="Audit summary">
      <div class="card">Status<span class="value">${status}</span></div>
      <div class="card">Pages<span class="value">${report.pageCount}</span></div>
      <div class="card">Errors<span class="value">${report.errors.length}</span></div>
      <div class="card">Warnings<span class="value">${report.warnings.length}</span></div>
    </section>
    <h2>Pages</h2>
    <table>
      <thead><tr><th>Route</th><th>Title</th><th>Description</th><th>H1</th><th>JSON-LD</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h2>Errors</h2>
    <ul>${errors || '<li>None</li>'}</ul>
    <h2>Warnings</h2>
    <ul>${warnings || '<li>None</li>'}</ul>
  </main>
</body>
</html>
`
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return replacements[char]
  })
}

function main() {
  const errors: string[] = []
  const warnings: string[] = []
  const pages: PageAudit[] = []

  assert(existsSync(output), '.output/public does not exist. Run the static generation first.', errors)

  for (const route of expectedRoutes) {
    assert(existsSync(routeToFile(route)), `Generated HTML file is missing for ${route}.`, errors)
  }

  const htmlFiles = existsSync(output)
    ? walk(output).filter((file) => file.endsWith('index.html'))
    : []
  const pageFiles = htmlFiles.filter((file) => {
    const route = routeFromFile(file)
    return route && expectedRoutes.includes(route)
  })

  const titles = new Map<string, string[]>()
  const descriptions = new Map<string, string[]>()

  for (const file of pageFiles) {
    const route = routeFromFile(file)
    if (!route) continue

    const html = readFileSync(file, 'utf8')
    const title = getTitle(html)
    const description = getMeta(html, 'description')
    const canonical = getCanonical(html)
    const ogTitle = getMeta(html, 'og:title')
    const ogDescription = getMeta(html, 'og:description')
    const ogUrl = getMeta(html, 'og:url')
    const ogImage = getMeta(html, 'og:image')
    const twitterCard = getMeta(html, 'twitter:card')
    const h1Count = (html.match(/<h1\b/gi) ?? []).length
    const jsonLdCount = parseJsonLd(html, route, errors)
    const imageCount = validateImages(html, route, errors)
    const linkCount = validateInternalLinks(html, route, errors)

    assert(/<html\b[^>]*lang="en-CA"/i.test(html), `${route} is missing lang="en-CA".`, errors)
    assert(title.length > 0, `${route} is missing a title.`, errors)
    assert(description.length > 0, `${route} is missing a meta description.`, errors)
    assert(canonical === `${baseUrl}${route}`, `${route} canonical should be ${baseUrl}${route}, found ${canonical || 'none'}.`, errors)
    assert(h1Count === 1, `${route} should have exactly one visible H1; found ${h1Count}.`, errors)
    assert(ogTitle.length > 0, `${route} is missing og:title.`, errors)
    assert(ogDescription.length > 0, `${route} is missing og:description.`, errors)
    assert(ogUrl === canonical, `${route} og:url should match its canonical URL, found ${ogUrl || 'none'}.`, errors)
    assert(ogImage.startsWith('https://'), `${route} is missing an absolute og:image.`, errors)
    assert(twitterCard.length > 0, `${route} is missing twitter:card.`, errors)
    assert(jsonLdCount > 0, `${route} is missing JSON-LD.`, errors)
    assert(!/\[(PHONE NUMBER|EMAIL ADDRESS|BUSINESS HOURS|DOMAIN|COMPANY NAME|BUSINESS ADDRESS|INSTAGRAM URL|FACEBOOK URL|GOOGLE BUSINESS PROFILE URL)\]/.test(html), `${route} contains a bracket placeholder.`, errors)
    assert(!/localhost|127\.0\.0\.1/i.test(html), `${route} contains a local URL.`, errors)

    if (ogImage.startsWith(baseUrl)) {
      const publicPath = outputPathForPublicUrl(ogImage)
      if (publicPath) assert(existsSync(publicPath), `${route} og:image does not exist: ${ogImage}`, errors)
    }

    if (publicServiceRoutes.includes(route)) {
      assert(!/noindex/i.test(html), `${route} contains noindex.`, errors)
    }

    titles.set(title, [...(titles.get(title) ?? []), route])
    descriptions.set(description, [...(descriptions.get(description) ?? []), route])
    pages.push({ route, title, description, canonical, h1Count, jsonLdCount, imageCount, linkCount })
  }

  for (const [title, routes] of titles) {
    if (title && routes.length > 1) errors.push(`Duplicate title "${title}" on ${routes.join(', ')}.`)
  }

  for (const [description, routes] of descriptions) {
    if (description && routes.length > 1) errors.push(`Duplicate meta description on ${routes.join(', ')}.`)
  }

  const sitemapPath = join(output, 'sitemap.xml')
  assert(existsSync(sitemapPath), 'sitemap.xml is missing from output.', errors)
  if (existsSync(sitemapPath)) {
    const sitemap = readFileSync(sitemapPath, 'utf8')
    for (const route of expectedRoutes) {
      assert(sitemap.includes(`<loc>${baseUrl}${route}</loc>`), `sitemap.xml is missing ${route}.`, errors)
    }
    assert(!/\?.*<\/loc>/.test(sitemap), 'sitemap.xml contains a query-string URL.', errors)
  }

  const robotsPath = join(output, 'robots.txt')
  assert(existsSync(robotsPath), 'robots.txt is missing from output.', errors)
  if (existsSync(robotsPath)) {
    const robots = readFileSync(robotsPath, 'utf8')
    assert(/User-agent:\s*\*/i.test(robots), 'robots.txt is missing a default user-agent.', errors)
    assert(robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`), 'robots.txt is missing the production sitemap URL.', errors)
  }

  const homepage = existsSync(routeToFile('/')) ? readFileSync(routeToFile('/'), 'utf8') : ''
  assert(homepage.includes('/embroidery/'), 'Priority page /embroidery/ is orphaned from the homepage.', errors)
  assert(homepage.includes('/vinyl-graphics/'), 'Priority page /vinyl-graphics/ is orphaned from the homepage.', errors)

  const blogSlugs = expectedRoutes
    .filter((route) => route.startsWith('/blog/') && route !== '/blog/')
    .map((route) => route.replace(/^\/blog\/|\/$/g, ''))
  assert(new Set(blogSlugs).size === blogSlugs.length, 'Duplicate blog slug found in expected route list.', errors)

  const report: AuditReport = {
    generatedAt: new Date().toISOString(),
    outputDir: output,
    pageCount: pages.length,
    errors,
    warnings,
    pages: pages.sort((a, b) => expectedRoutes.indexOf(a.route) - expectedRoutes.indexOf(b.route))
  }

  mkdirSync(reportDir, { recursive: true })
  writeFileSync(join(reportDir, 'seo-audit-report.json'), `${JSON.stringify(report, null, 2)}\n`)
  writeFileSync(join(reportDir, 'seo-audit-report.html'), renderHtmlReport(report))

  if (errors.length) {
    console.error(`SEO audit failed with ${errors.length} issue(s). Report: ${join(reportDir, 'seo-audit-report.html')}`)
    for (const error of errors) console.error(`- ${error}`)
    process.exit(1)
  }

  console.log(`SEO audit passed for ${pages.length} pages. Report: ${join(reportDir, 'seo-audit-report.html')}`)
}

main()
