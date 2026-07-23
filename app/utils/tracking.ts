declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...payload })
}

export function eventNameForHref(href: string) {
  if (href.startsWith('tel:')) return 'click_phone'
  if (href.startsWith('mailto:')) return 'click_email'
  if (href.includes('service=embroidery') || href.includes('/embroidery/')) return 'click_embroidery_cta'
  if (href.includes('service=vehicle-graphics') || href.includes('/vinyl-graphics/')) return 'click_vinyl_graphics_cta'
  if (href.includes('/contact/') || href.includes('#quote')) return 'start_quote'
  return undefined
}

export function trackEventForHref(href: string, payload: Record<string, unknown> = {}) {
  const event = eventNameForHref(href)
  if (event) trackEvent(event, { href, ...payload })
}
