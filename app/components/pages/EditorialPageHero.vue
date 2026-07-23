<script setup lang="ts">
import type { ImageAsset, TextLink } from '../../data/multipageContent'
import { trackEventForHref } from '../../utils/tracking'

defineProps<{
  eyebrow: string
  heading: string
  body: string
  support?: string
  primaryAction?: TextLink
  secondaryAction?: TextLink
  images?: ImageAsset[]
}>()

function trackHeroAction(link: TextLink) {
  trackEventForHref(link.href, {
    label: link.label,
    location: 'page_hero'
  })
}
</script>

<template>
  <section class="editorial-hero">
    <div class="container editorial-hero__grid">
      <div class="editorial-hero__copy" data-reveal>
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1>{{ heading }}</h1>
        <p class="editorial-hero__body">{{ body }}</p>
        <p v-if="support" class="editorial-hero__support">{{ support }}</p>
        <div v-if="primaryAction || secondaryAction" class="button-row">
          <NuxtLink v-if="primaryAction" class="button button--primary" :to="primaryAction.href" @click="trackHeroAction(primaryAction)">{{ primaryAction.label }}</NuxtLink>
          <NuxtLink v-if="secondaryAction" class="button button--ghost" :to="secondaryAction.href" @click="trackHeroAction(secondaryAction)">{{ secondaryAction.label }}</NuxtLink>
        </div>
      </div>

      <ImageMosaic v-if="images?.length" :images="images" />
    </div>
  </section>
</template>

<style scoped>
.editorial-hero {
  padding-block: clamp(3.8rem, 7vw, 6.3rem) clamp(2.2rem, 5vw, 4rem);
}

.editorial-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(24rem, 1.14fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.editorial-hero__copy {
  display: grid;
  gap: 1.1rem;
}

.editorial-hero h1 {
  max-width: 11ch;
  font-size: clamp(3rem, 7vw, 6.5rem);
  line-height: 0.92;
}

.editorial-hero__body {
  max-width: 43rem;
  color: var(--color-charcoal);
  font-size: clamp(1.08rem, 1.7vw, 1.34rem);
}

.editorial-hero__support {
  max-width: 38rem;
  color: var(--color-muted);
  font-weight: 780;
}

@media (width <= 920px) {
  .editorial-hero__grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 520px) {
  .editorial-hero {
    padding-block-start: 2.6rem;
  }

  .editorial-hero h1 {
    font-size: clamp(2.75rem, 15vw, 4.2rem);
  }
}
</style>
