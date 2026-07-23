<script setup lang="ts">
import { getServiceBySlug } from '../data/multipageContent'

const page = getServiceBySlug('apparel')!
const { site } = useSiteContent()

usePageMeta({
  title: page.seoTitle,
  description: page.seoDescription,
  path: page.path,
  image: page.images[0]?.src,
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services/' },
      { name: page.navTitle, path: page.path }
    ]),
    buildServiceSchema(site, page),
    buildFaqSchema(page.faqs)
  ]
})
</script>

<template>
  <ServicePageTemplate :page="page" />
</template>
