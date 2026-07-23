<script setup lang="ts">
import type { BlogArticle } from '../../data/multipageContent'

defineProps<{
  article: BlogArticle
}>()
</script>

<template>
  <article class="blog-card" data-reveal>
    <NuxtLink :to="article.path" class="blog-card__image" :aria-label="article.title">
      <img
        :src="article.image.src"
        :srcset="`${article.image.src} 1x`"
        :alt="article.image.alt"
        width="760"
        height="466"
        sizes="(width <= 820px) 100vw, 33vw"
        loading="lazy"
        decoding="async"
      >
    </NuxtLink>
    <div class="blog-card__body">
      <p class="blog-card__meta">{{ article.category }} / {{ article.readingTime }}</p>
      <h2>
        <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
      </h2>
      <p>{{ article.description }}</p>
      <NuxtLink class="blog-card__link" :to="article.path">Read article</NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.blog-card {
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: var(--color-white);
  transition:
    transform 220ms var(--ease),
    border-color 220ms var(--ease),
    box-shadow 220ms var(--ease);
}

.blog-card__image {
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 2.45;
  background: var(--color-soft-grey);
}

.blog-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 260ms var(--ease);
}

.blog-card__body {
  display: grid;
  gap: 0.7rem;
  padding: clamp(1rem, 2.6vw, 1.4rem);
}

.blog-card__meta {
  color: var(--color-orange);
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}

.blog-card h2 {
  font-size: clamp(1.35rem, 2.5vw, 1.95rem);
}

.blog-card__body > p:not(.blog-card__meta) {
  color: var(--color-muted);
}

.blog-card__link {
  width: fit-content;
  border-block-end: 2px solid var(--color-orange);
  font-weight: 900;
  padding-block-end: 0.16rem;
}

@media (hover: hover) and (pointer: fine) {
  .blog-card:hover {
    border-color: rgb(255 90 47 / 0.7);
    box-shadow: 0 1rem 2rem rgb(17 17 15 / 0.1);
    transform: translate3d(0, -0.25rem, 0);
  }

  .blog-card:hover img {
    transform: scale(1.025);
  }
}
</style>
