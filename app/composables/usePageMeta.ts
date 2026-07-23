import type { BlogArticle, ServicePage } from '../data/multipageContent'
import type { SiteSettings } from '../types/site'

interface PageMetaOptions {
  title: string
  description: string
  path: string
  image?: string
  schema?: Array<Record<string, unknown>>
}

export function usePageMeta(options: PageMetaOptions) {
  const { site } = useSiteContent()
  const image = options.image ?? site.defaultOgImage
  const canonical = absoluteUrl(site, options.path)

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogImage: absoluteUrl(site, image),
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: absoluteUrl(site, image),
    twitterCard: 'summary_large_image'
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: site.companyName,
          url: site.domain,
          telephone: '+1-437-313-1510',
          email: site.email,
          areaServed: 'Toronto and the Greater Toronto Area',
          image: absoluteUrl(site, image)
        })
      },
      ...(options.schema ?? []).map((schema) => ({
        type: 'application/ld+json',
        textContent: JSON.stringify(schema)
      }))
    ]
  })
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function buildServiceSchema(site: SiteSettings, page: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.navTitle,
    description: page.seoDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: site.companyName,
      url: site.domain,
      telephone: '+1-437-313-1510',
      email: site.email
    },
    areaServed: 'Toronto and the Greater Toronto Area',
    serviceType: page.navTitle,
    url: absoluteUrl(site, page.path)
  }
}

export function buildBlogPostingSchema(site: SiteSettings, article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: absoluteUrl(site, article.image.src),
    author: {
      '@type': 'Organization',
      name: site.companyName
    },
    publisher: {
      '@type': 'Organization',
      name: site.companyName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(site, '/brand/affinity-header-logo.png')
      }
    },
    mainEntityOfPage: absoluteUrl(site, article.path)
  }
}
