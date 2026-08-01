<script setup lang="ts">
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Shirt,
  ShoppingBag,
  Sparkles,
  Tag
} from 'lucide-vue-next'
import { trackEventForHref } from '../utils/tracking'

const { site } = useSiteContent()
const mapHref = computed(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`)

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
      <div class="container">
        <div class="contact-hero__grid">
          <div class="contact-hero__copy" data-reveal>
            <p class="eyebrow">Contact</p>
            <h1>Tell us what you are planning.</h1>
            <p>Share the product, quantity, artwork and required date. We will review the details and help you choose the next step.</p>
          </div>

          <figure class="contact-hero__media" data-reveal>
            <img
              src="/images/contact/affinity-contact-merch.webp"
              alt="Affinity Creative branded hoodie, embroidered hat and tumbler"
              width="1536"
              height="1024"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            >
          </figure>
        </div>

        <div class="contact-proof" aria-label="Why work with Affinity Creative">
          <div class="contact-proof__item">
            <Clock3 aria-hidden="true" />
            <span><strong>Fast Turnaround</strong><small>On time, every time.</small></span>
          </div>
          <div class="contact-proof__item">
            <MapPin aria-hidden="true" />
            <span><strong>GTA Service</strong><small>Local and reliable.</small></span>
          </div>
          <div class="contact-proof__item">
            <BadgeCheck aria-hidden="true" />
            <span><strong>Local Production</strong><small>Made with practical care.</small></span>
          </div>
          <div class="contact-proof__item">
            <Sparkles aria-hidden="true" />
            <span><strong>Quality Focus</strong><small>Details checked before production.</small></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section contact-form-section">
      <div class="container contact-form-layout">
        <aside class="contact-sidebar" aria-label="Contact information" data-reveal>
          <section class="contact-card contact-card--information">
            <h2>Contact Information</h2>

            <a class="contact-detail" :href="site.phoneHref" @click="trackEventForHref(site.phoneHref, { location: 'contact_panel' })">
              <Phone aria-hidden="true" />
              <span><strong>{{ site.phone }}</strong><small>Call to discuss your project.</small></span>
            </a>

            <a class="contact-detail" :href="site.emailHref" @click="trackEventForHref(site.emailHref, { location: 'contact_panel' })">
              <Mail aria-hidden="true" />
              <span><strong>{{ site.email }}</strong><small>We typically respond within one business day.</small></span>
            </a>

            <a class="contact-detail" :href="mapHref" target="_blank" rel="noopener noreferrer">
              <MapPin aria-hidden="true" />
              <span><strong>{{ site.address }}</strong><small>Local pickup available.</small></span>
            </a>
          </section>

          <section class="contact-card contact-card--action">
            <ShoppingBag aria-hidden="true" />
            <div>
              <h2>Need inspiration?</h2>
              <p>Browse products and ideas for apparel, print and branded merchandise.</p>
            </div>
            <a href="https://shop.affinitycreative.ca/" target="_blank" rel="noopener noreferrer">
              Visit the Shop <ArrowRight aria-hidden="true" />
            </a>
          </section>

          <section class="contact-card contact-card--action">
            <Mail aria-hidden="true" />
            <div>
              <h2>Already have artwork?</h2>
              <p>Email your logo or files and include the quantity and required date.</p>
            </div>
            <a :href="site.emailHref" @click="trackEventForHref(site.emailHref, { location: 'contact_artwork_card' })">
              Email Your Artwork <ArrowRight aria-hidden="true" />
            </a>
          </section>

          <a
            class="contact-catalogue"
            href="https://www.zoomcats.com/catalog/affinity-creative-polo-guide"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Affinity Creative Polo Guide 2026 catalogue"
          >
            <img
              src="/images/contact/polo-guide-2026.webp"
              alt="Affinity Creative Polo Guide 2026 catalogue cover"
              width="724"
              height="908"
              loading="lazy"
              decoding="async"
            >
            <span class="contact-catalogue__footer">
              <span><small>Product Catalogue</small><strong>Explore the 2026 Polo Guide</strong></span>
              <span class="contact-catalogue__button">Open Guide <ArrowRight aria-hidden="true" /></span>
            </span>
          </a>
        </aside>

        <div class="contact-form-card" data-reveal>
          <header class="contact-form-card__header">
            <p class="eyebrow">Project details</p>
            <h2>Send the useful details.</h2>
            <p>If you already have artwork, include a link or notes. If you are still choosing the product, describe how it will be used.</p>
          </header>
          <QuoteForm />
        </div>
      </div>

      <div class="container contact-benefits" aria-label="Quote benefits">
        <div><Shirt aria-hidden="true" /><span><strong>Solutions for every brand</strong><small>From small orders to larger programs.</small></span></div>
        <div><Tag aria-hidden="true" /><span><strong>Clear next steps</strong><small>Practical details before production.</small></span></div>
        <div><Headphones aria-hidden="true" /><span><strong>Dedicated support</strong><small>We are here to help you succeed.</small></span></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero {
  padding-block: clamp(1.75rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem);
}

.contact-hero__grid {
  display: grid;
  grid-template-columns: minmax(19rem, 0.72fr) minmax(0, 1.28fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}

.contact-hero h1 {
  max-width: 9ch;
  font-size: clamp(3.2rem, 6.2vw, 6.25rem);
  line-height: 0.9;
  letter-spacing: -0.055em;
}

.contact-hero__copy {
  display: grid;
  gap: 1rem;
}

.contact-hero__copy p:not(.eyebrow) {
  max-width: 35rem;
  color: var(--color-muted);
  font-size: clamp(1rem, 1.4vw, 1.16rem);
}

.contact-hero__media {
  margin: 0;
  overflow: visible;
  background: transparent;
}

.contact-hero__media img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: contain;
}

.contact-proof {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-block-start: clamp(1.5rem, 3vw, 2.25rem);
  padding-block: 1.1rem;
}

.contact-proof__item {
  display: grid;
  min-width: 0;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: 0.65rem;
  align-items: center;
  padding-inline: clamp(0.75rem, 2vw, 1.5rem);
}

.contact-proof__item + .contact-proof__item {
  border-inline-start: 1px solid var(--color-line);
}

.contact-proof__item > svg {
  width: 1.75rem;
  height: 1.75rem;
  color: var(--color-orange);
  stroke-width: 1.7;
}

.contact-proof__item span,
.contact-proof__item strong,
.contact-proof__item small {
  display: block;
}

.contact-proof__item strong {
  font-size: 0.9rem;
  font-weight: 900;
}

.contact-proof__item small {
  margin-block-start: 0.12rem;
  color: var(--color-muted);
  font-size: 0.73rem;
  line-height: 1.35;
}

.contact-form-section {
  border-block-start: 1px solid var(--color-line);
  background: #fff;
}

.contact-form-layout {
  display: grid;
  grid-template-columns: minmax(17rem, 0.42fr) minmax(0, 1fr);
  gap: clamp(1.25rem, 3vw, 2rem);
  align-items: start;
}

.contact-sidebar {
  display: grid;
  gap: 1rem;
}

.contact-card,
.contact-form-card {
  border: 1px solid var(--color-line);
  border-radius: 1.2rem;
  background: var(--color-white);
  box-shadow: 0 1rem 2.5rem rgb(17 17 15 / 0.07);
}

.contact-card {
  padding: clamp(1.1rem, 2vw, 1.4rem);
}

.contact-card h2 {
  font-size: 1rem;
  line-height: 1.2;
}

.contact-card--information {
  display: grid;
  gap: 1.15rem;
}

.contact-detail {
  display: grid;
  grid-template-columns: 1.35rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: start;
  color: inherit;
}

.contact-detail > svg,
.contact-card--action > svg {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--color-orange);
  stroke-width: 1.8;
}

.contact-detail span,
.contact-detail strong,
.contact-detail small {
  display: block;
  min-width: 0;
}

.contact-detail strong {
  overflow-wrap: anywhere;
  font-size: 0.86rem;
  font-weight: 900;
}

.contact-detail small {
  margin-block-start: 0.2rem;
  color: var(--color-muted);
  font-size: 0.74rem;
  line-height: 1.4;
}

.contact-card--action {
  display: grid;
  grid-template-columns: 1.35rem minmax(0, 1fr);
  gap: 0.75rem;
}

.contact-card--action p {
  margin-block-start: 0.35rem;
  color: var(--color-muted);
  font-size: 0.82rem;
  line-height: 1.5;
}

.contact-card--action a {
  display: inline-flex;
  min-height: 2.75rem;
  grid-column: 1 / -1;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border: 1px solid var(--color-orange);
  border-radius: 999px;
  color: var(--color-orange);
  font-size: 0.82rem;
  font-weight: 900;
  transition: background 180ms ease, color 180ms ease, transform 180ms var(--ease);
}

.contact-card--action a:hover,
.contact-card--action a:focus-visible {
  background: var(--color-orange);
  color: var(--color-white);
  outline: none;
  transform: translateY(-2px);
}

.contact-card--action a svg {
  width: 1rem;
  height: 1rem;
}

.contact-catalogue {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 1.2rem;
  background: var(--color-white);
  color: var(--color-ink);
  box-shadow: 0 1rem 2.5rem rgb(17 17 15 / 0.07);
  transition: transform 220ms var(--ease), box-shadow 220ms ease;
}

.contact-catalogue:hover,
.contact-catalogue:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 3px;
  box-shadow: 0 1.35rem 3rem rgb(17 17 15 / 0.12);
  transform: translateY(-4px);
}

.contact-catalogue > img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 724 / 908;
  object-fit: cover;
  transition: transform 320ms var(--ease);
}

.contact-catalogue:hover > img,
.contact-catalogue:focus-visible > img {
  transform: scale(1.02);
}

.contact-catalogue__footer {
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
}

.contact-catalogue__footer > span:first-child,
.contact-catalogue__footer small,
.contact-catalogue__footer strong {
  display: block;
}

.contact-catalogue__footer small {
  color: var(--color-orange);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-catalogue__footer strong {
  margin-block-start: 0.25rem;
  font-size: 1rem;
  line-height: 1.2;
}

.contact-catalogue__button {
  display: inline-flex;
  min-height: 2.65rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 999px;
  background: var(--color-orange);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 900;
}

.contact-catalogue__button svg {
  width: 1rem;
  height: 1rem;
}

.contact-form-card {
  padding: clamp(1.2rem, 3vw, 2rem);
}

.contact-form-card__header {
  display: grid;
  gap: 0.55rem;
  margin-block-end: 1.25rem;
}

.contact-form-card__header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.contact-form-card__header > p:last-child {
  max-width: 46rem;
  color: var(--color-muted);
}

.contact-form-card :deep(.quote-form) {
  border: 0;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.contact-benefits {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-block-start: clamp(1.5rem, 3vw, 2rem);
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 1.2rem;
  background: #f7f1e9;
}

.contact-benefits > div {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: center;
  padding: 1.15rem clamp(1rem, 2.5vw, 1.75rem);
}

.contact-benefits > div + div {
  border-inline-start: 1px solid var(--color-line);
}

.contact-benefits svg {
  width: 1.55rem;
  height: 1.55rem;
  color: var(--color-orange);
  stroke-width: 1.7;
}

.contact-benefits span,
.contact-benefits strong,
.contact-benefits small {
  display: block;
}

.contact-benefits strong {
  font-size: 0.84rem;
  font-weight: 900;
}

.contact-benefits small {
  margin-block-start: 0.15rem;
  color: var(--color-muted);
  font-size: 0.72rem;
  line-height: 1.4;
}

@media (width <= 960px) {
  .contact-hero__grid,
  .contact-form-layout {
    grid-template-columns: 1fr;
  }

  .contact-hero__copy {
    max-width: 44rem;
  }

  .contact-hero__media {
    max-width: 50rem;
  }

  .contact-sidebar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= 700px) {
  .contact-hero h1 {
    font-size: clamp(3rem, 14vw, 4.65rem);
  }

  .contact-proof {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-proof__item:nth-child(3) {
    border-inline-start: 0;
  }

  .contact-proof__item:nth-child(n + 3) {
    border-block-start: 1px solid var(--color-line);
    padding-block-start: 0.9rem;
  }

  .contact-proof__item:nth-child(-n + 2) {
    padding-block-end: 0.9rem;
  }

  .contact-sidebar,
  .contact-benefits {
    grid-template-columns: 1fr;
  }

  .contact-benefits > div + div {
    border-block-start: 1px solid var(--color-line);
    border-inline-start: 0;
  }
}

@media (width <= 430px) {
  .contact-hero__grid {
    gap: 1.5rem;
  }

  .contact-proof__item {
    grid-template-columns: 1.8rem minmax(0, 1fr);
    padding-inline: 0.55rem;
  }

  .contact-proof__item > svg {
    width: 1.45rem;
    height: 1.45rem;
  }

  .contact-proof__item strong {
    font-size: 0.78rem;
  }

  .contact-proof__item small {
    font-size: 0.66rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-catalogue,
  .contact-catalogue > img {
    transition-duration: 1ms;
  }
}
</style>
