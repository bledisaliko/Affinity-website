<script setup lang="ts">
import type { CategoryCard } from '../../data/multipageContent'

defineProps<{
  item: CategoryCard
  index?: number
}>()
</script>

<template>
  <article class="category-card" data-reveal :style="{ '--reveal-delay': `${(index ?? 0) * 55}ms` }">
    <div v-if="item.image" class="category-card__image">
      <img
        :src="item.image.src"
        :srcset="`${item.image.src} 1x`"
        :alt="item.image.alt"
        width="720"
        height="468"
        sizes="(width <= 700px) 100vw, (width <= 980px) 50vw, 33vw"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="category-card__body">
      <h3>{{ item.title }}</h3>
      <p>{{ item.body }}</p>
    </div>
  </article>
</template>

<style scoped>
.category-card {
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: var(--color-white);
  box-shadow: 0 0.55rem 1.4rem rgb(17 17 15 / 0);
  transition:
    transform 220ms var(--ease),
    border-color 220ms var(--ease),
    box-shadow 220ms var(--ease);
}

.category-card__image {
  overflow: hidden;
  aspect-ratio: 4 / 2.6;
  background: var(--color-soft-grey);
}

.category-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 260ms var(--ease);
}

.category-card__body {
  display: grid;
  gap: 0.65rem;
  padding: clamp(1rem, 2.4vw, 1.35rem);
}

.category-card h3 {
  font-size: clamp(1.35rem, 2vw, 1.68rem);
}

.category-card p {
  color: var(--color-muted);
}

@media (hover: hover) and (pointer: fine) {
  .category-card:hover {
    border-color: rgb(255 90 47 / 0.72);
    box-shadow: 0 1rem 2rem rgb(17 17 15 / 0.1);
    transform: translate3d(0, -0.35rem, 0);
  }

  .category-card:hover img {
    transform: scale(1.025);
  }
}
</style>
