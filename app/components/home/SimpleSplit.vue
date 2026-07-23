<script setup lang="ts">
import { splitPanels } from '../../utils/simpleHomepage'
</script>

<template>
  <section class="section" aria-label="Business brand applications">
    <div class="container split-grid">
      <article
        v-for="(panel, index) in splitPanels"
        :key="panel.title"
        class="split-card"
        data-reveal
        :style="{ '--reveal-delay': `${index * 80}ms` }"
      >
        <img :src="panel.image.src" :alt="panel.image.alt">
        <div class="split-card__copy">
          <h2>{{ panel.title }}</h2>
          <p>{{ panel.body }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.split-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.35rem;
}

.split-card {
  position: relative;
  min-height: 32.5rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background: var(--color-soft-grey);
  transition: transform 220ms var(--ease), box-shadow 220ms var(--ease);
}

.split-card::after {
  content: "";
  position: absolute;
  inset: 35% 0 0;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.86));
}

.split-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 320ms var(--ease);
}

.split-card__copy {
  position: absolute;
  inset-inline: clamp(1.25rem, 3vw, 1.75rem);
  inset-block-end: clamp(1.25rem, 3vw, 1.75rem);
  z-index: 1;
  color: var(--color-white);
}

.split-card h2 {
  color: var(--color-white);
  font-size: clamp(2rem, 3.4vw, 2.25rem);
}

.split-card p {
  margin-block-start: 0.5rem;
  color: rgb(255 255 255 / 0.78);
}

@media (hover: hover) and (pointer: fine) {
  .split-card:hover {
    box-shadow: 0 1.1rem 2.25rem rgb(17 17 15 / 0.13);
    transform: translate3d(0, -0.3rem, 0);
  }

  .split-card:hover img {
    transform: scale(1.02);
  }
}

@media (width <= 900px) {
  .split-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 560px) {
  .split-card {
    min-height: 25.5rem;
  }
}
</style>
