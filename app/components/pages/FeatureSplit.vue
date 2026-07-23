<script setup lang="ts">
import type { ImageAsset, TextLink } from '../../data/multipageContent'

defineProps<{
  heading: string
  body: string
  image: ImageAsset
  links?: TextLink[]
}>()
</script>

<template>
  <section class="section feature-split">
    <div class="container feature-split__grid">
      <div class="feature-split__image" data-reveal>
        <img
          :src="image.src"
          :srcset="`${image.src} 1x`"
          :alt="image.alt"
          width="900"
          height="650"
          sizes="(width <= 820px) 100vw, 46vw"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="feature-split__copy" data-reveal>
        <h2>{{ heading }}</h2>
        <p>{{ body }}</p>
        <div v-if="links?.length" class="feature-split__links">
          <NuxtLink v-for="link in links" :key="link.href" :to="link.href">{{ link.label }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-split {
  background: var(--color-ink);
  color: var(--color-white);
}

.feature-split__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(1.5rem, 5vw, 3.5rem);
  align-items: center;
}

.feature-split__image {
  overflow: hidden;
  min-height: clamp(18rem, 32vw, 27rem);
  border-radius: 1.35rem;
  background: var(--color-charcoal);
}

.feature-split__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-split__copy {
  display: grid;
  gap: 1rem;
}

.feature-split h2 {
  max-width: 13ch;
  color: var(--color-white);
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 0.98;
}

.feature-split p {
  max-width: 43rem;
  color: rgb(255 255 255 / 0.72);
  font-size: 1.08rem;
}

.feature-split__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1rem;
  font-weight: 900;
}

.feature-split__links a {
  border-block-end: 2px solid var(--color-orange);
  padding-block-end: 0.16rem;
}

@media (width <= 820px) {
  .feature-split__grid {
    grid-template-columns: 1fr;
  }
}
</style>
