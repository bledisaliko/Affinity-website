<script setup lang="ts">
import type { ImageAsset } from '../../data/multipageContent'

defineProps<{
  images: ImageAsset[]
}>()
</script>

<template>
  <div class="image-mosaic" aria-label="Page imagery">
    <figure
      v-for="(image, index) in images.slice(0, 3)"
      :key="image.src"
      class="image-mosaic__item"
      :class="`image-mosaic__item--${index + 1}`"
      data-reveal
      :style="{ '--reveal-delay': `${index * 80}ms` }"
    >
      <img
        :src="image.src"
        :srcset="`${image.src} 1x`"
        :alt="image.alt"
        width="900"
        height="1050"
        sizes="(width <= 720px) 100vw, 50vw"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
        decoding="async"
      >
    </figure>
  </div>
</template>

<style scoped>
.image-mosaic {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.42fr;
  grid-template-rows: minmax(12rem, 1fr) minmax(9rem, 0.65fr);
  gap: 0.85rem;
  min-height: clamp(25rem, 45vw, 35rem);
}

.image-mosaic__item {
  overflow: hidden;
  min-width: 0;
  border-radius: 1.45rem;
  background: var(--color-soft-grey);
  box-shadow: 0 1rem 2rem rgb(17 17 15 / 0.1);
}

.image-mosaic__item--1 {
  grid-row: 1 / -1;
}

.image-mosaic__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 280ms var(--ease);
}

@media (hover: hover) and (pointer: fine) {
  .image-mosaic__item:hover img {
    transform: scale(1.025);
  }
}

@media (width <= 720px) {
  .image-mosaic {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 18rem 9rem;
    min-height: auto;
  }

  .image-mosaic__item--1 {
    grid-column: 1 / -1;
    grid-row: auto;
  }

  .image-mosaic__item {
    border-radius: 1rem;
  }
}
</style>
