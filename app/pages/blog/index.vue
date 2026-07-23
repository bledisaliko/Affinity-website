<script setup lang="ts">
import { blogArticles } from '../../data/multipageContent'

const { site } = useSiteContent()

usePageMeta({
  title: 'Business Print, Apparel & Marketing Articles | Affinity Creative',
  description: 'Practical articles about apparel decoration, direct mail, vehicle graphics and local SEO for Toronto and GTA businesses.',
  path: '/blog/',
  image: '/images/blog/embroidery-dtf-screen-printing.webp',
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' }
    ])
  ]
})
</script>

<template>
  <div class="blog-index">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Blog' }]" />
    </div>

    <EditorialPageHero
      eyebrow="Blog"
      heading="Useful notes before you order."
      body="Short, practical articles about choosing apparel methods, planning direct mail, improving local search and using vehicle graphics well."
      support="Written for business owners who need clear next steps, not marketing fog."
      :primary-action="{ label: 'Request a Quote', href: '/contact/#quote' }"
      :secondary-action="{ label: 'View Services', href: '/services/' }"
      :images="[
        { src: '/images/blog/header-blog-mobile.png', alt: 'Blog content shown on a mobile layout' },
        { src: '/images/blog/header-content-writing.png', alt: 'Content writing and article planning illustration' },
        { src: '/images/blog/header-content-marketing.png', alt: 'Content marketing and media planning illustration' }
      ]"
    />

    <section class="section section--white">
      <div class="container blog-index__grid">
        <BlogCard v-for="article in blogArticles" :key="article.slug" :article="article" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-index__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (width <= 780px) {
  .blog-index__grid {
    grid-template-columns: 1fr;
  }
}
</style>
