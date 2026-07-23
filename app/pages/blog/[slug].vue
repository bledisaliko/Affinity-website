<script setup lang="ts">
import { blogArticles, getBlogBySlug } from '../../data/multipageContent'

const route = useRoute()
const rawSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

if (!rawSlug) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const slug = rawSlug
const article = getBlogBySlug(slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const { site } = useSiteContent()
const related = computed(() => blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3))

usePageMeta({
  title: article.seoTitle,
  description: article.description,
  path: article.path,
  image: article.image.src,
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: article.title, path: article.path }
    ]),
    buildBlogPostingSchema(site, article)
  ]
})
</script>

<template>
  <div>
    <BlogArticleLayout :article="article" />
    <RelatedArticles :articles="related" />
  </div>
</template>
