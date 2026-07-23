<script setup lang="ts">
import { getServiceBySlug } from '../data/multipageContent'

const page = getServiceBySlug('embroidery')!
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
  <div class="embroidery-page-shell">
    <ServicePageTemplate :page="page" />
  </div>
</template>

<style scoped>
.embroidery-page-shell :deep(.editorial-hero__grid) {
  grid-template-columns: minmax(0, 0.96fr) minmax(20rem, 0.94fr);
  gap: clamp(1.75rem, 4.5vw, 4rem);
}

.embroidery-page-shell :deep(.editorial-hero h1) {
  max-width: 8.5ch;
  font-size: clamp(3rem, 6vw, 5.55rem);
}

.embroidery-page-shell :deep(.editorial-hero__body),
.embroidery-page-shell :deep(.editorial-hero__support) {
  max-width: 35rem;
}

.embroidery-page-shell :deep(.image-mosaic) {
  max-width: min(100%, 50rem);
  justify-self: end;
  grid-template-columns: minmax(0, 1fr) minmax(9.5rem, 0.42fr);
  grid-template-rows: minmax(13rem, 1fr) minmax(9.5rem, 0.65fr);
  min-height: clamp(23rem, 39vw, 32rem);
}

@media (width <= 920px) {
  .embroidery-page-shell :deep(.editorial-hero__grid) {
    grid-template-columns: 1fr;
  }

  .embroidery-page-shell :deep(.editorial-hero h1) {
    max-width: 11ch;
  }
}
</style>
