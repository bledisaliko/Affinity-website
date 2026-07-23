<script setup lang="ts">
import { trackEventForHref } from '../utils/tracking'

const { site } = useSiteContent()

const quoteServicePrefillScript = `
(() => {
  const services = {
    apparel: 'Custom Apparel',
    embroidery: 'Embroidery',
    dtf: 'DTF Printing',
    'screen-printing': 'Screen Printing',
    'business-print': 'Business Print',
    print: 'Business Print',
    'direct-mail': 'Direct Mail',
    signs: 'Signs',
    'vehicle-graphics': 'Vehicle Decals',
    'vehicle-decals': 'Vehicle Decals',
    'vehicle-wraps': 'Vehicle Wraps',
    fleet: 'Fleet Branding',
    'fleet-branding': 'Fleet Branding',
    'glass-finishes': 'Glass Finishes',
    glass: 'Glass Finishes',
    'digital-marketing': 'Website Design',
    website: 'Website Design',
    websites: 'Website Design',
    seo: 'Local SEO',
    'local-seo': 'Local SEO',
    'google-ads': 'Google Ads',
    'local-services-ads': 'Google Local Services Ads',
    social: 'Facebook & Instagram Advertising'
  }

  function applyPrefill() {
    const requested = new URLSearchParams(window.location.search).get('service')
    const matched = requested ? services[requested.trim().toLowerCase()] : ''
    const select = document.getElementById('serviceCategory')
    if (!matched || !select || select.value === matched) return

    select.value = matched
    select.dispatchEvent(new Event('input', { bubbles: true }))
    select.dispatchEvent(new Event('change', { bubbles: true }))
  }

  function runPrefill() {
    applyPrefill()
    ;[50, 150, 400, 800, 1600, 3200].forEach((delay) => {
      window.setTimeout(applyPrefill, delay)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPrefill, { once: true })
  } else {
    runPrefill()
  }
})()
`

usePageMeta({
  title: 'Contact Affinity Creative | Request a Quote',
  description: 'Tell Affinity Creative about your apparel, print, signs, glass finishes, website or marketing project. Serving Toronto and the Greater Toronto Area.',
  path: '/contact/',
  image: '/images/simple/business-print.jpg',
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact/' }
    ])
  ]
})

useHead({
  script: [
    {
      key: 'quote-service-prefill',
      textContent: quoteServicePrefillScript
    }
  ]
})
</script>

<template>
  <div class="contact-page">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Contact' }]" />
    </div>

    <section class="contact-hero">
      <div class="container contact-hero__grid">
        <div class="contact-hero__copy" data-reveal>
          <p class="eyebrow">Contact</p>
          <h1>Tell us what you are planning.</h1>
          <p>Share the product, quantity, artwork and required date. We will review the details and help you choose the next step.</p>
        </div>
        <div class="contact-hero__panel" data-reveal>
          <a :href="site.phoneHref" @click="trackEventForHref(site.phoneHref, { location: 'contact_panel' })">{{ site.phone }}</a>
          <a :href="site.emailHref" @click="trackEventForHref(site.emailHref, { location: 'contact_panel' })">{{ site.email }}</a>
          <p>Serving Toronto and the Greater Toronto Area</p>
        </div>
      </div>
    </section>

    <section class="section contact-form-section">
      <div class="container contact-form-section__grid">
        <div class="contact-form-section__copy" data-reveal>
          <h2>Send the useful details.</h2>
          <p>If you already have artwork, include a link or notes. If you are still choosing the product, describe how it will be used.</p>
        </div>
        <QuoteForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero {
  padding-block: clamp(3.5rem, 7vw, 6rem);
}

.contact-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.48fr);
  gap: clamp(1.5rem, 5vw, 3rem);
  align-items: end;
}

.contact-hero h1 {
  max-width: 11ch;
  font-size: clamp(3rem, 8vw, 6.6rem);
  line-height: 0.92;
}

.contact-hero__copy {
  display: grid;
  gap: 1rem;
}

.contact-hero__copy p:not(.eyebrow) {
  max-width: 43rem;
  color: var(--color-muted);
  font-size: 1.16rem;
}

.contact-hero__panel {
  display: grid;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: var(--color-white);
  padding: clamp(1.1rem, 3vw, 1.6rem);
}

.contact-hero__panel a {
  width: fit-content;
  border-block-end: 2px solid var(--color-orange);
  font-size: 1.08rem;
  font-weight: 950;
}

.contact-hero__panel p {
  color: var(--color-muted);
  font-weight: 850;
}

.contact-form-section {
  background: var(--color-white);
}

.contact-form-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.55fr) minmax(20rem, 1fr);
  gap: clamp(1.5rem, 5vw, 3rem);
  align-items: start;
}

.contact-form-section__copy {
  display: grid;
  gap: 0.85rem;
  position: sticky;
  top: 7rem;
}

.contact-form-section__copy h2 {
  max-width: 12ch;
  font-size: clamp(2rem, 4vw, 3.8rem);
}

.contact-form-section__copy p {
  color: var(--color-muted);
}

@media (width <= 820px) {
  .contact-hero__grid,
  .contact-form-section__grid {
    grid-template-columns: 1fr;
  }

  .contact-form-section__copy {
    position: static;
  }
}
</style>
