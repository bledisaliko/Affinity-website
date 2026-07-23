<script setup lang="ts">
import { serviceSections } from '../../utils/simpleHomepage'
import { trackEventForHref } from '../../utils/tracking'
</script>

<template>
  <section id="services" class="section section--white" aria-labelledby="services-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 id="services-title">Four services. One clear place to start.</h2>
        <p>Choose one service or combine several for a complete company launch, event, campaign or refresh.</p>
      </div>

      <div class="services-grid">
        <article
          v-for="(service, index) in serviceSections"
          :key="service.title"
          class="service-card"
          data-reveal
          :style="{ '--reveal-delay': `${index * 80}ms` }"
        >
          <div class="service-card__image">
            <img
              :src="service.image.src"
              :srcset="`${service.image.src} 1x`"
              :alt="service.image.alt"
              width="760"
              height="450"
              sizes="(width <= 900px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="service-card__body">
            <span>{{ service.number }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.body }}</p>
          <NuxtLink :to="service.href" @click="trackEventForHref(service.href, { location: 'homepage_services', label: service.action })">{{ service.action }}</NuxtLink>
          </div>
        </article>
      </div>

      <div class="services-glass-callout" data-reveal>
        <p>Looking for logo embroidery or commercial vinyl graphics? Explore garment, vehicle and storefront options.</p>
        <div>
          <NuxtLink to="/embroidery/" @click="trackEventForHref('/embroidery/', { location: 'homepage_priority_links' })">Custom Embroidery</NuxtLink>
          <NuxtLink to="/vinyl-graphics/" @click="trackEventForHref('/vinyl-graphics/', { location: 'homepage_priority_links' })">Vinyl Graphics</NuxtLink>
          <NuxtLink to="/glass-finishes/">Glass Finishes</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
}

.service-card {
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: var(--card-radius);
  background: var(--color-warm-white);
  box-shadow: 0 0.5rem 1.25rem rgb(17 17 15 / 0);
  transition:
    transform 220ms var(--ease),
    border-color 220ms var(--ease),
    box-shadow 220ms var(--ease);
}

.service-card__image {
  overflow: hidden;
  height: 17.5rem;
  background: var(--color-soft-grey);
}

.service-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 260ms var(--ease);
}

.service-card__body {
  display: grid;
  gap: 0.75rem;
  padding: clamp(1.25rem, 2.5vw, 1.65rem);
}

.service-card span {
  color: var(--color-orange);
  font-size: 0.76rem;
  font-weight: 900;
}

.service-card h3 {
  font-size: clamp(1.7rem, 2.5vw, 1.95rem);
}

.service-card p {
  color: var(--color-muted);
}

.service-card a {
  width: fit-content;
  border-block-end: 2px solid var(--color-orange);
  font-weight: 900;
  padding-block-end: 0.15rem;
}

.service-card a::after {
  content: " ->";
  display: inline-block;
  transition: transform 180ms var(--ease);
}

@media (hover: hover) and (pointer: fine) {
  .service-card:hover {
    border-color: rgb(255 90 47 / 0.72);
    box-shadow: 0 1.1rem 2.15rem rgb(17 17 15 / 0.12);
    transform: translate3d(0, -0.4rem, 0);
  }

  .service-card:hover img {
    transform: scale(1.025);
  }

  .service-card:hover a::after {
    transform: translate3d(0.22rem, 0, 0);
  }
}

.services-glass-callout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1rem;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-line);
  border-radius: 0.85rem;
  background: var(--color-warm-white);
  margin-block-start: 1rem;
  padding: 1rem 1.15rem;
}

.services-glass-callout p {
  color: var(--color-charcoal);
  font-weight: 850;
}

.services-glass-callout a {
  width: fit-content;
  border-block-end: 2px solid var(--color-orange);
  font-weight: 950;
  padding-block-end: 0.15rem;
}

.services-glass-callout a::after {
  content: " ->";
}

.services-glass-callout div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1rem;
}

@media (width <= 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 560px) {
  .service-card__image {
    height: 13.75rem;
  }
}
</style>
