<script setup lang="ts">
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Instagram,
  Mail,
  MessageCircle,
  Phone
} from 'lucide-vue-next'
import { serviceDirectoryPages } from '../../data/multipageContent'
import { trackEventForHref } from '../../utils/tracking'

const { site } = useSiteContent()
const whatsAppHref = site.socialLinks.find(link => link.label.toLowerCase() === 'whatsapp')?.url
const instagramHref = site.socialLinks.find(link => link.label.toLowerCase() === 'instagram')?.url
const displayDomain = new URL(site.domain).hostname
</script>

<template>
  <footer class="site-footer">
    <span class="footer-monogram" aria-hidden="true">AC</span>

    <div class="container footer-shell">
      <section class="footer-statement" aria-labelledby="footer-statement-title">
        <div class="footer-statement__copy">
          <p class="footer-eyebrow">
            <span aria-hidden="true"></span>
            Affinity Creative
          </p>
          <h2 id="footer-statement-title">
            Where your business, your brand and your
            <span>customers connect.</span>
          </h2>
          <p class="footer-statement__support">
            From custom apparel and professional print to signs, vehicle graphics and digital marketing, we help businesses look consistent wherever customers see them.
          </p>
        </div>

        <aside class="footer-project" aria-labelledby="footer-project-title">
          <h3 id="footer-project-title">Have something in mind?</h3>
          <p>Tell us what you need, the quantity and when you need it.</p>
          <NuxtLink class="footer-project__button" to="/contact/#quote">
            <span>Start a Project</span>
            <ArrowUpRight aria-hidden="true" />
          </NuxtLink>
          <a class="footer-project__call" :href="site.phoneHref" @click="trackEventForHref(site.phoneHref)">
            Call {{ site.phone }}
          </a>
        </aside>
      </section>

      <div class="footer-main">
        <section class="footer-brand-block" aria-label="Affinity Creative">
          <NuxtLink class="footer-brand" to="/" aria-label="Affinity Creative home">
            <img src="/brand/affinity-footer-logo.png" :alt="site.companyName" width="2048" height="576" loading="lazy" decoding="async">
          </NuxtLink>
          <p class="footer-brand__slogan">Stand out. Make an impact.</p>
          <p class="footer-brand__detail">
            Custom apparel, embroidery, print, signs, vehicle graphics and digital marketing across Toronto and the GTA.
          </p>
          <p class="footer-area-badge">
            <span aria-hidden="true"></span>
            Serving Toronto + GTA
          </p>
        </section>

        <nav class="footer-nav footer-nav--services" aria-label="Footer services">
          <h3>Services</h3>
          <NuxtLink v-for="service in serviceDirectoryPages" :key="service.path" :to="service.path">
            <span>{{ service.navTitle }}</span>
            <ArrowRight class="footer-nav__arrow" aria-hidden="true" />
          </NuxtLink>
        </nav>

        <nav class="footer-nav footer-nav--company" aria-label="Company">
          <h3>Company</h3>
          <NuxtLink to="/services/">
            <span>All Services</span>
            <ArrowRight class="footer-nav__arrow" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/blog/">
            <span>Blog</span>
            <ArrowRight class="footer-nav__arrow" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/contact/">
            <span>Contact</span>
            <ArrowRight class="footer-nav__arrow" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/privacy/">
            <span>Privacy Policy</span>
            <ArrowRight class="footer-nav__arrow" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/terms/">
            <span>Terms &amp; Conditions</span>
            <ArrowRight class="footer-nav__arrow" aria-hidden="true" />
          </NuxtLink>
        </nav>

        <section class="footer-contact" aria-labelledby="footer-contact-title">
          <h3 id="footer-contact-title">Let's Talk</h3>
          <p class="footer-contact__intro">Questions, artwork or a project idea? Reach us directly.</p>

          <address class="footer-contact__list">
            <a :href="site.phoneHref" @click="trackEventForHref(site.phoneHref)">
              <span class="footer-contact__icon"><Phone aria-hidden="true" /></span>
              <span>
                <small>Phone</small>
                {{ site.phone }}
              </span>
            </a>
            <a :href="site.emailHref" @click="trackEventForHref(site.emailHref)">
              <span class="footer-contact__icon"><Mail aria-hidden="true" /></span>
              <span>
                <small>Email</small>
                {{ site.email }}
              </span>
            </a>
            <a :href="site.domain" target="_blank" rel="noopener noreferrer">
              <span class="footer-contact__icon"><Globe2 aria-hidden="true" /></span>
              <span>
                <small>Website</small>
                {{ displayDomain }}
              </span>
            </a>
          </address>

          <div class="footer-social" aria-label="Social links">
            <a
              v-if="whatsAppHref"
              class="footer-social__link"
              :href="whatsAppHref"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Affinity Creative on WhatsApp"
              @click="trackEventForHref(whatsAppHref)"
            >
              <MessageCircle aria-hidden="true" />
            </a>
            <a
              v-if="instagramHref"
              class="footer-social__link"
              :href="instagramHref"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Affinity Creative on Instagram"
              @click="trackEventForHref(instagramHref)"
            >
              <Instagram aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>

      <div class="footer-bottom">
        <p>{{ site.copyright }}</p>
        <p>Made for businesses across the GTA.</p>
        <p>{{ site.servingLine }}.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  overflow: clip;
  isolation: isolate;
  background: var(--color-ink);
  color: rgb(255 255 255 / 0.72);
}

.footer-monogram {
  position: absolute;
  z-index: -1;
  inset-block-start: 2rem;
  inset-inline-end: -0.12em;
  color: var(--color-white);
  font-family: var(--font-display);
  font-size: clamp(19rem, 34vw, 42rem);
  font-weight: 900;
  line-height: 0.7;
  letter-spacing: 0;
  opacity: 0.025;
  pointer-events: none;
  user-select: none;
}

.footer-shell {
  position: relative;
  z-index: 1;
}

.footer-statement {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(18rem, 0.62fr);
  gap: clamp(3rem, 7vw, 7rem);
  align-items: end;
  padding-block: clamp(5.5rem, 7vw, 6.875rem) clamp(4rem, 5vw, 4.75rem);
}

.footer-statement__copy {
  max-width: 58rem;
}

.footer-eyebrow {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  margin-block-end: 1.4rem;
  color: var(--color-white);
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.footer-eyebrow span {
  width: 2.75rem;
  height: 0.2rem;
  background: var(--color-orange);
}

.footer-statement h2 {
  max-width: 53rem;
  color: var(--color-white);
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5vw, 5.4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0;
}

.footer-statement h2 span {
  display: block;
  color: var(--color-orange);
}

.footer-statement__support {
  max-width: 48rem;
  margin-block-start: 1.8rem;
  color: rgb(255 255 255 / 0.66);
  font-size: clamp(1rem, 1.25vw, 1.15rem);
  line-height: 1.65;
}

.footer-project {
  display: grid;
  gap: 1rem;
  align-content: start;
  border: 1px solid rgb(255 255 255 / 0.14);
  border-radius: 0.5rem;
  background: rgb(255 255 255 / 0.045);
  padding: clamp(1.6rem, 3vw, 2.25rem);
}

.footer-project h3 {
  color: var(--color-white);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2vw, 2rem);
  line-height: 1.05;
}

.footer-project p {
  max-width: 24rem;
  color: rgb(255 255 255 / 0.64);
  font-size: 1rem;
  line-height: 1.55;
}

.footer-project__button {
  display: inline-flex;
  width: fit-content;
  min-height: 3rem;
  gap: 0.7rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-orange);
  border-radius: 0.5rem;
  background: var(--color-orange);
  color: var(--color-ink);
  padding: 0.7rem 1.1rem;
  font-weight: 900;
  transition:
    background 180ms var(--ease),
    border-color 180ms var(--ease),
    color 180ms var(--ease),
    transform 180ms var(--ease);
}

.footer-project__button svg {
  width: 1.2rem;
  height: 1.2rem;
  transition: transform 180ms var(--ease);
}

.footer-project__button:hover {
  border-color: var(--color-white);
  background: var(--color-white);
  transform: translateY(-2px);
}

.footer-project__button:hover svg {
  transform: translate(2px, -2px);
}

.footer-project__call {
  width: fit-content;
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  color: var(--color-white);
  font-weight: 800;
  transition: color 180ms var(--ease);
}

.footer-project__call:hover {
  color: var(--color-orange);
}

.footer-main {
  display: grid;
  grid-template-areas: "brand services company contact";
  grid-template-columns: 1.35fr 1fr 0.8fr 1.1fr;
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: start;
  border-block-start: 1px solid rgb(255 255 255 / 0.12);
  padding-block: clamp(4rem, 5vw, 4.75rem) clamp(3.5rem, 4vw, 4.25rem);
}

.footer-brand-block {
  grid-area: brand;
  max-width: 29rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  transition: filter 180ms var(--ease), transform 180ms var(--ease);
}

.footer-brand:hover {
  filter: brightness(1.12);
  transform: translateY(-2px);
}

.footer-brand img {
  display: block;
  width: clamp(16.875rem, 18vw, 19.375rem);
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.footer-brand__slogan {
  margin-block-start: 1.7rem;
  color: var(--color-white);
  font-size: clamp(1.25rem, 1.5vw, 1.5rem);
  font-weight: 800;
  line-height: 1.25;
}

.footer-brand__detail {
  max-width: 28rem;
  margin-block-start: 0.8rem;
  color: rgb(255 255 255 / 0.62);
  font-size: 0.98rem;
  line-height: 1.65;
}

.footer-area-badge {
  display: inline-flex;
  min-height: 2.25rem;
  gap: 0.65rem;
  align-items: center;
  margin-block-start: 1.35rem;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 999px;
  color: rgb(255 255 255 / 0.76);
  padding: 0.45rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 700;
}

.footer-area-badge span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-orange);
}

.footer-nav--services {
  grid-area: services;
}

.footer-nav--company {
  grid-area: company;
}

.footer-contact {
  grid-area: contact;
}

.footer-nav,
.footer-contact {
  align-content: start;
}

.footer-nav {
  display: grid;
  gap: 0.35rem;
}

.footer-nav h3,
.footer-contact > h3 {
  margin-block-end: 1rem;
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.footer-nav a {
  display: inline-flex;
  width: fit-content;
  min-height: 2rem;
  gap: 0.4rem;
  align-items: center;
  color: rgb(255 255 255 / 0.68);
  font-size: 0.98rem;
  line-height: 1.55;
  transition: color 180ms var(--ease), transform 180ms var(--ease);
}

.footer-nav__arrow {
  width: 0.95rem;
  height: 0.95rem;
  opacity: 0;
  transform: translateX(-0.3rem);
  transition: opacity 180ms var(--ease), transform 180ms var(--ease);
}

.footer-nav a:hover {
  color: var(--color-white);
  transform: translateX(3px);
}

.footer-nav a:hover .footer-nav__arrow,
.footer-nav a:focus-visible .footer-nav__arrow {
  opacity: 1;
  transform: translateX(0);
}

.footer-contact__intro {
  max-width: 22rem;
  color: rgb(255 255 255 / 0.6);
  font-size: 0.98rem;
  line-height: 1.55;
}

.footer-contact__list {
  display: grid;
  gap: 0.8rem;
  margin-block-start: 1.35rem;
  font-style: normal;
}

.footer-contact__list a {
  display: grid;
  grid-template-columns: 2.45rem minmax(0, 1fr);
  gap: 0.8rem;
  align-items: center;
  color: var(--color-white);
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.35;
  transition: color 180ms var(--ease), transform 180ms var(--ease);
}

.footer-contact__list a:hover {
  color: var(--color-orange);
  transform: translateX(3px);
}

.footer-contact__list a > span:last-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.footer-contact__list small {
  display: block;
  margin-block-end: 0.12rem;
  color: rgb(255 255 255 / 0.48);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.footer-contact__icon {
  display: grid;
  width: 2.45rem;
  height: 2.45rem;
  place-items: center;
  border: 1px solid rgb(255 90 47 / 0.38);
  border-radius: 0.5rem;
  background: rgb(255 255 255 / 0.035);
  color: var(--color-orange);
}

.footer-contact__icon svg {
  width: 1.1rem;
  height: 1.1rem;
  stroke-width: 1.8;
}

.footer-social {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-block-start: 1.5rem;
}

.footer-social__link {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 50%;
  background: rgb(255 255 255 / 0.04);
  color: var(--color-white);
  transition:
    background 180ms var(--ease),
    border-color 180ms var(--ease),
    color 180ms var(--ease),
    transform 180ms var(--ease);
}

.footer-social__link:hover {
  border-color: var(--color-orange);
  background: var(--color-orange);
  color: var(--color-ink);
  transform: translateY(-3px);
}

.footer-social__link svg {
  width: 1.35rem;
  height: 1.35rem;
  stroke-width: 1.9;
}

.site-footer a:focus-visible {
  border-radius: 0.25rem;
  outline: 3px solid var(--color-orange);
  outline-offset: 4px;
}

.footer-bottom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: center;
  border-block-start: 1px solid rgb(255 255 255 / 0.1);
  padding-block: 1.5rem;
  color: rgb(255 255 255 / 0.52);
  font-size: 0.83rem;
  line-height: 1.5;
}

.footer-bottom p:nth-child(2) {
  text-align: center;
}

.footer-bottom p:last-child {
  padding-inline-end: 4.5rem;
  text-align: end;
}

@media (width <= 1080px) {
  .footer-statement {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .footer-project {
    max-width: 34rem;
  }

  .footer-main {
    grid-template-areas:
      "brand contact"
      "services company";
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    row-gap: 4rem;
  }
}

@media (width <= 680px) {
  .footer-monogram {
    inset-block-start: 9rem;
    font-size: 20rem;
  }

  .footer-statement {
    gap: 2.5rem;
    padding-block: 4.5rem 3.5rem;
  }

  .footer-statement h2 {
    max-width: 12ch;
  }

  .footer-project {
    width: 100%;
  }

  .footer-project__button,
  .footer-project__call {
    min-height: 3rem;
  }

  .footer-main {
    grid-template-areas:
      "brand"
      "contact"
      "services"
      "company";
    grid-template-columns: minmax(0, 1fr);
    gap: 3.25rem;
    padding-block: 3.5rem;
  }

  .footer-brand img {
    width: clamp(13.75rem, 72vw, 15.625rem);
  }

  .footer-nav a {
    min-height: 2.75rem;
  }

  .footer-contact__list a {
    min-height: 3rem;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
    gap: 0.6rem;
    padding-block: 1.5rem calc(5.75rem + env(safe-area-inset-bottom));
    font-size: 0.84rem;
  }

  .footer-bottom p:nth-child(2),
  .footer-bottom p:last-child {
    padding-inline-end: 4.5rem;
    text-align: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-footer *,
  .site-footer *::before,
  .site-footer *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
