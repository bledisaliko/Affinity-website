<script setup lang="ts">
import type { BlogArticle } from '../../data/multipageContent'
import { trackEventForHref } from '../../utils/tracking'

defineProps<{
  article: BlogArticle
}>()

function trackArticleCta(article: BlogArticle) {
  trackEventForHref(article.cta.link.href, {
    label: article.cta.link.label,
    location: 'blog_cta',
    article: article.slug
  })
}
</script>

<template>
  <article class="article-page">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: article.title }]" />
    </div>

    <header class="article-hero">
      <div class="container article-hero__grid">
        <div class="article-hero__copy" data-reveal>
          <p class="eyebrow">{{ article.category }}</p>
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <div class="article-hero__meta">
            <span>{{ article.publishedAt }}</span>
            <span>{{ article.readingTime }}</span>
          </div>
        </div>
        <figure class="article-hero__image" data-reveal>
          <img
            :src="article.image.src"
            :srcset="`${article.image.src} 1x`"
            :alt="article.image.alt"
            width="960"
            height="640"
            sizes="(width <= 860px) 100vw, 50vw"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          >
        </figure>
      </div>
    </header>

    <div class="container article-body">
      <p v-for="paragraph in article.intro" :key="paragraph" class="article-body__intro">{{ paragraph }}</p>

      <section v-for="section in article.sections" :key="section.title">
        <h2>{{ section.title }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <ul v-if="section.bullets?.length">
          <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </section>

      <aside class="article-cta">
        <h2>{{ article.cta.heading }}</h2>
        <p>{{ article.cta.body }}</p>
        <NuxtLink class="button button--primary" :to="article.cta.link.href" @click="trackArticleCta(article)">{{ article.cta.link.label }}</NuxtLink>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.article-hero {
  padding-block: clamp(2.8rem, 6vw, 5rem);
}

.article-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(22rem, 1.1fr);
  gap: clamp(1.5rem, 5vw, 3.5rem);
  align-items: center;
}

.article-hero h1 {
  max-width: 13ch;
  font-size: clamp(2.65rem, 6vw, 5.6rem);
  line-height: 0.94;
}

.article-hero__copy {
  display: grid;
  gap: 1rem;
}

.article-hero__copy > p:not(.eyebrow) {
  max-width: 43rem;
  color: var(--color-muted);
  font-size: 1.12rem;
}

.article-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: var(--color-charcoal);
  font-weight: 900;
}

.article-hero__image {
  overflow: hidden;
  min-height: clamp(18rem, 35vw, 30rem);
  border-radius: 1.35rem;
  background: var(--color-soft-grey);
}

.article-hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-body {
  display: grid;
  gap: 1.35rem;
  max-width: 52rem;
  padding-block-end: var(--section-space);
}

.article-body__intro {
  color: var(--color-charcoal);
  font-size: 1.18rem;
}

.article-body section {
  display: grid;
  gap: 0.78rem;
  padding-block-start: 1.1rem;
}

.article-body h2 {
  font-size: clamp(1.85rem, 3vw, 2.5rem);
}

.article-body p,
.article-body li {
  color: var(--color-muted);
}

.article-body ul {
  display: grid;
  gap: 0.35rem;
  margin: 0;
  padding-inline-start: 1.2rem;
}

.article-cta {
  display: grid;
  gap: 0.85rem;
  border-radius: 1.15rem;
  background: var(--color-white);
  padding: clamp(1.2rem, 3vw, 1.8rem);
}

.article-cta h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
}

@media (width <= 860px) {
  .article-hero__grid {
    grid-template-columns: 1fr;
  }
}
</style>
