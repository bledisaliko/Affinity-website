<script setup lang="ts">
import type { BlogArticle } from '../../data/multipageContent'

defineProps<{
  articles: BlogArticle[]
}>()
</script>

<template>
  <section v-if="articles.length" class="section related-articles">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2>Keep reading.</h2>
        <p>Useful next steps connected to the service pages.</p>
      </div>
      <div class="related-articles__grid">
        <BlogCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.related-articles {
  background: var(--color-white);
}

.related-articles__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

@media (width <= 900px) {
  .related-articles__grid {
    grid-template-columns: 1fr;
  }
}
</style>
