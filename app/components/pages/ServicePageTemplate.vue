<script setup lang="ts">
import type { ServicePage } from '../../data/multipageContent'
import type { FaqItem } from '../../types/content'

const props = defineProps<{
  page: ServicePage
}>()

const faqItems = computed<FaqItem[]>(() => props.page.faqs)
</script>

<template>
  <div class="service-page">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: page.navTitle }]" />
    </div>

    <EditorialPageHero
      :eyebrow="page.eyebrow"
      :heading="page.heading"
      :body="page.body"
      :support="page.support"
      :primary-action="page.primaryAction"
      :secondary-action="page.secondaryAction"
      :images="page.images"
    />

    <section class="section section--white">
      <div class="container">
        <div class="section-head" data-reveal>
          <h2>{{ page.categoryHeading }}</h2>
          <p>{{ page.categoryIntro }}</p>
        </div>
        <div class="category-grid">
          <ProductCategoryCard
            v-for="(item, index) in page.categories"
            :key="item.title"
            :item="item"
            :index="index"
          />
        </div>
      </div>
    </section>

    <FeatureSplit
      :heading="page.splitHeading"
      :body="page.splitBody"
      :image="page.splitImage"
      :links="page.internalLinks"
    />

    <ServiceQuoteBuilder :page="page" />

    <section class="section service-faqs">
      <div class="container service-faqs__grid">
        <div data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Details worth checking before you order.</h2>
        </div>
        <FaqAccordion :faqs="faqItems" />
      </div>
    </section>

    <PageCta
      :heading="page.ctaHeading"
      :body="page.ctaBody"
      :primary="page.ctaPrimary"
      :secondary="page.ctaSecondary"
    />
  </div>
</template>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.service-faqs {
  background: var(--color-white);
}

.service-faqs__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(20rem, 1.22fr);
  gap: clamp(1.5rem, 5vw, 3rem);
  align-items: start;
}

.service-faqs h2 {
  max-width: 12ch;
  font-size: clamp(2rem, 4vw, 3.8rem);
}

@media (width <= 980px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= 700px) {
  .category-grid,
  .service-faqs__grid {
    grid-template-columns: 1fr;
  }
}
</style>
