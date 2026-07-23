<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { serviceDirectoryPages, servicesOverview } from '../data/multipageContent'

const { site } = useSiteContent()
const servicesTrack = ref<HTMLElement | null>(null)

function scrollServices(direction: -1 | 1) {
  const track = servicesTrack.value

  if (!track) {
    return
  }

  const card = track.querySelector<HTMLElement>('.service-overview-card')
  const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || '16')
  const distance = (card?.offsetWidth ?? track.clientWidth * 0.82) + gap
  const maxScroll = track.scrollWidth - track.clientWidth

  if (maxScroll <= 0) {
    return
  }

  if (direction > 0 && track.scrollLeft >= maxScroll - 4) {
    track.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }

  if (direction < 0 && track.scrollLeft <= 4) {
    track.scrollTo({ left: maxScroll, behavior: 'smooth' })
    return
  }

  track.scrollBy({ left: direction * distance, behavior: 'smooth' })
}

usePageMeta({
  title: servicesOverview.seoTitle,
  description: servicesOverview.seoDescription,
  path: '/services/',
  image: '/images/simple/custom-apparel.jpg',
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services/' }
    ])
  ]
})
</script>

<template>
  <div class="services-page">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Services' }]" />
    </div>

    <EditorialPageHero
      :eyebrow="servicesOverview.eyebrow"
      :heading="servicesOverview.heading"
      :body="servicesOverview.body"
      support="Serving Toronto and the Greater Toronto Area."
      :primary-action="{ label: 'Request a Quote', href: '/contact/#quote' }"
      :secondary-action="{ label: `Call ${site.phone}`, href: site.phoneHref }"
      :images="[
        { src: '/images/simple/custom-apparel.jpg', alt: 'Custom apparel for local business teams' },
        { src: '/images/signs/storefront-vinyl.webp', alt: 'Storefront signs and window graphics' },
        { src: '/images/digital/website-devices.webp', alt: 'Website and digital campaign work' }
      ]"
    />

    <section class="section section--white">
      <div class="container services-page__carousel">
        <div class="services-page__controls" aria-label="Browse services">
          <button
            class="services-page__arrow"
            type="button"
            aria-label="Scroll services left"
            @click="scrollServices(-1)"
          >
            <ChevronLeft :size="24" aria-hidden="true" />
          </button>
          <button
            class="services-page__arrow"
            type="button"
            aria-label="Scroll services right"
            @click="scrollServices(1)"
          >
            <ChevronRight :size="24" aria-hidden="true" />
          </button>
        </div>

        <div
          ref="servicesTrack"
          class="services-page__grid"
          aria-label="All services"
          tabindex="0"
        >
          <NuxtLink
            v-for="(service, index) in serviceDirectoryPages"
            :key="service.path"
            class="service-overview-card"
            :to="service.path"
            data-reveal
            :style="{ '--reveal-delay': `${index * 75}ms` }"
          >
            <div class="service-overview-card__image">
              <img :src="service.images[0]?.src" :alt="service.images[0]?.alt">
            </div>
            <div class="service-overview-card__body">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h2>{{ service.navTitle }}</h2>
              <p>{{ service.navDescription }}.</p>
              <strong>Explore service</strong>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <PageCta
      heading="Not sure where the project fits?"
      body="Send the product, quantity, artwork and date. We will help route the request to the right service."
      :primary="{ label: 'Request a Quote', href: '/contact/#quote' }"
      :secondary="{ label: `Email ${site.email}`, href: site.emailHref }"
    />
  </div>
</template>

<style scoped>
.services-page__carousel {
  display: grid;
  gap: 1rem;
  position: relative;
  padding-block-start: 4.25rem;
}

.services-page__controls {
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  z-index: 2;
}

.services-page__arrow {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-warm-white);
  color: var(--color-ink);
  cursor: pointer;
  transition:
    transform 180ms var(--ease),
    border-color 180ms var(--ease),
    background 180ms var(--ease),
    color 180ms var(--ease);
}

.services-page__arrow svg {
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.services-page__grid {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-padding-inline: 0.25rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-inline: contain;
  touch-action: pan-x pan-y;
  padding-block: 0.25rem 0.7rem;
}

.services-page__grid::-webkit-scrollbar {
  display: none;
}

.service-overview-card {
  flex: 0 0 clamp(17.5rem, 24vw, 21rem);
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: var(--color-warm-white);
  box-shadow: 0 0.65rem 1.4rem rgb(17 17 15 / 0);
  scroll-snap-align: start;
  transition:
    transform 220ms var(--ease),
    border-color 220ms var(--ease),
    box-shadow 220ms var(--ease);
}

.service-overview-card__image {
  overflow: hidden;
  aspect-ratio: 3 / 2.25;
  background: var(--color-soft-grey);
}

.service-overview-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 260ms var(--ease);
}

.service-overview-card__body {
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
}

.service-overview-card span {
  color: var(--color-orange);
  font-size: 0.76rem;
  font-weight: 950;
}

.service-overview-card h2 {
  font-size: clamp(1.35rem, 2vw, 1.75rem);
}

.service-overview-card p {
  color: var(--color-muted);
}

.service-overview-card strong {
  width: fit-content;
  border-block-end: 2px solid var(--color-orange);
}

@media (hover: hover) and (pointer: fine) {
  .services-page__arrow:hover {
    border-color: var(--color-orange);
    background: var(--color-orange);
    color: var(--color-white);
    transform: translate3d(0, -0.15rem, 0);
  }

  .service-overview-card:hover {
    border-color: rgb(255 90 47 / 0.72);
    box-shadow: 0 1rem 2rem rgb(17 17 15 / 0.1);
    transform: translate3d(0, -0.35rem, 0);
  }

  .service-overview-card:hover img {
    transform: scale(1.025);
  }
}

@media (width <= 760px) {
  .services-page__controls {
    justify-content: flex-end;
  }

  .service-overview-card {
    flex-basis: min(82vw, 20rem);
  }
}
</style>
