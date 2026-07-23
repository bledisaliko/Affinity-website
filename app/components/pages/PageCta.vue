<script setup lang="ts">
import type { TextLink } from '../../data/multipageContent'
import { trackEventForHref } from '../../utils/tracking'

defineProps<{
  heading: string
  body: string
  primary: TextLink
  secondary?: TextLink
}>()

function trackCta(link: TextLink) {
  trackEventForHref(link.href, {
    label: link.label,
    location: 'page_cta'
  })
}
</script>

<template>
  <section class="section page-cta">
    <div class="container page-cta__panel" data-reveal>
      <div>
        <h2>{{ heading }}</h2>
        <p>{{ body }}</p>
      </div>
      <div class="button-row">
        <NuxtLink class="button button--light" :to="primary.href" @click="trackCta(primary)">{{ primary.label }}</NuxtLink>
        <NuxtLink v-if="secondary" class="button page-cta__secondary" :to="secondary.href" @click="trackCta(secondary)">{{ secondary.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-cta__panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1.5rem, 4vw, 3rem);
  border-radius: 1.45rem;
  background: var(--color-orange);
  color: var(--color-white);
  padding: clamp(1.6rem, 4vw, 2.6rem);
}

.page-cta h2 {
  max-width: 13ch;
  color: var(--color-white);
  font-size: clamp(2.2rem, 5vw, 4.3rem);
  line-height: 0.96;
}

.page-cta p {
  max-width: 43rem;
  margin-block-start: 0.85rem;
  color: rgb(255 255 255 / 0.86);
}

.page-cta__secondary {
  border-color: rgb(255 255 255 / 0.7);
  color: var(--color-white);
}

@media (width <= 760px) {
  .page-cta__panel {
    display: grid;
  }
}
</style>
