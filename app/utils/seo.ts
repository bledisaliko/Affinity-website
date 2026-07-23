import type { SiteSettings } from '../types/site'

export function absoluteUrl(site: SiteSettings, path: string) {
  const base = site.domain.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}

export function pageTitle(title: string, site: SiteSettings) {
  return title.includes(site.companyName) ? title : `${title} | ${site.companyName}`
}

export function buildBreadcrumbSchema(site: SiteSettings, items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site, item.path)
    }))
  }
}
