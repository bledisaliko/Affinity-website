<script setup lang="ts">
import { methodSections } from '../../utils/simpleHomepage'
</script>

<template>
  <section id="methods" class="section section--dark" aria-labelledby="methods-title">
    <div class="container">
      <div class="section-head section-head--dark" data-reveal>
        <h2 id="methods-title">Choose the right finish.</h2>
        <p>We match the decoration method to the artwork, garment, quantity and intended use.</p>
      </div>

      <div class="methods-grid">
        <article
          v-for="(method, index) in methodSections"
          :key="method.title"
          class="method-card"
          data-reveal
          :style="{ '--reveal-delay': `${index * 80}ms` }"
        >
          <span class="method-card__hover-image" aria-hidden="true">
            <img :src="method.image.src" alt="" loading="lazy" decoding="async">
          </span>
          <span>{{ method.number }}</span>
          <h3>{{ method.title }}</h3>
          <p>{{ method.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.methods-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-block: 1px solid rgb(255 255 255 / 0.18);
}

.method-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  gap: 1rem;
  align-content: start;
  border-inline-end: 1px solid rgb(255 255 255 / 0.18);
  padding: clamp(1.55rem, 3vw, 2.15rem) clamp(1.25rem, 2.5vw, 1.9rem);
  transition: background 220ms var(--ease), transform 220ms var(--ease);
}

.method-card__hover-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: auto;
  height: auto;
  border: 0;
  border-radius: 0;
  color: inherit;
  font-weight: 400;
  opacity: 0;
  pointer-events: none;
  transform: scale(1.04);
  transition:
    opacity 220ms var(--ease),
    transform 320ms var(--ease);
}

.method-card__hover-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(10 10 8 / 0.68), rgb(10 10 8 / 0.44));
}

.method-card__hover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.95) contrast(1.04);
}


.method-card:last-child {
  border-inline-end: 0;
}

.method-card > span:not(.method-card__hover-image) {
  display: inline-grid;
  width: 2.65rem;
  height: 2.65rem;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 0.42);
  border-radius: 999px;
  color: var(--color-orange);
  font-weight: 900;
}

.method-card > span:not(.method-card__hover-image),
.method-card h3,
.method-card p {
  position: relative;
  z-index: 1;
}

.method-card h3 {
  margin-block-start: 0.35rem;
  font-size: clamp(1.55rem, 2.4vw, 1.7rem);
}

.method-card p {
  color: rgb(255 255 255 / 0.72);
}

@media (hover: hover) and (pointer: fine) {
  .method-card:hover {
    background: rgb(255 255 255 / 0.045);
    transform: translate3d(0, -0.25rem, 0);
  }

  .method-card:hover .method-card__hover-image {
    opacity: 0.58;
    transform: scale(1);
  }
}

@media (width <= 900px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }

  .method-card {
    border-inline-end: 0;
    border-block-end: 1px solid rgb(255 255 255 / 0.18);
  }

  .method-card:last-child {
    border-block-end: 0;
  }
}
</style>
