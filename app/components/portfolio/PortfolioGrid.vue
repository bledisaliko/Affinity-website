<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PortfolioCategory, PortfolioProject } from '../../types/portfolio'

const props = defineProps<{
  projects: PortfolioProject[]
  showFilters?: boolean
  headingId?: string
}>()

const { categories } = usePortfolio()
const activeCategory = ref<PortfolioCategory | 'All'>('All')

const filteredProjects = computed(() => {
  if (!props.showFilters || activeCategory.value === 'All') return props.projects
  return props.projects.filter((project) => project.category === activeCategory.value)
})
</script>

<template>
  <div class="portfolio-grid-wrap">
    <div v-if="showFilters" class="portfolio-filters" role="toolbar" aria-label="Capability filters">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :aria-pressed="activeCategory === category"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="portfolio-grid" :aria-labelledby="headingId">
      <article v-for="project in filteredProjects" :key="project.id" class="portfolio-card" data-reveal>
        <img :src="project.featuredImage" :alt="project.title" width="720" height="640" loading="lazy" />
        <div class="portfolio-card__body">
          <span>{{ project.category }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.shortDescription }}</p>
          <div class="portfolio-card__footer">
            <ul class="tag-list" aria-label="Related services">
              <li v-for="service in project.servicesUsed.slice(0, 3)" :key="service" class="tag">{{ service }}</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.portfolio-grid-wrap {
  display: grid;
  gap: clamp(1.2rem, 3vw, 2rem);
}

.portfolio-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.portfolio-filters button {
  min-height: 2.6rem;
  border: 1px solid rgb(17 17 17 / 0.14);
  border-radius: 999px;
  background: var(--color-white);
  padding: 0.65rem 0.9rem;
  color: var(--color-ink);
  font-weight: 850;
}

.portfolio-filters button[aria-pressed="true"] {
  border-color: var(--color-orange);
  background: var(--color-orange);
  color: var(--color-white);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  gap: clamp(1rem, 2vw, 1.5rem);
}

.portfolio-card {
  position: relative;
  grid-column: span 4;
  min-height: 22rem;
  overflow: hidden;
  border-radius: var(--card-radius);
  background: var(--color-charcoal);
  color: var(--color-white);
}

.portfolio-card:nth-child(5n + 1),
.portfolio-card:nth-child(5n + 4) {
  grid-column: span 5;
}

.portfolio-card:nth-child(5n + 2) {
  grid-column: span 7;
}

.portfolio-card img {
  width: 100%;
  height: 100%;
  min-height: 22rem;
  object-fit: cover;
  transition: transform 420ms var(--ease);
}

.portfolio-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgb(17 17 17 / 0.82), rgb(17 17 17 / 0.08));
}

.portfolio-card__body {
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  z-index: 1;
  display: grid;
  gap: 0.6rem;
  padding: clamp(1rem, 2vw, 1.4rem);
}

.portfolio-card__body > span {
  width: fit-content;
  border-radius: 999px;
  background: var(--color-cyan);
  color: var(--color-ink);
  font-size: 0.76rem;
  font-weight: 950;
  padding: 0.3rem 0.55rem;
}

.portfolio-card h3 {
  color: var(--color-white);
}

.portfolio-card p {
  color: rgb(255 255 255 / 0.78);
}

.portfolio-card__footer {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.portfolio-card .tag {
  border-color: rgb(255 255 255 / 0.14);
  background: rgb(255 255 255 / 0.12);
  color: var(--color-white);
}

.portfolio-card:hover img {
  transform: scale(1.04);
}

@media (width <= 980px) {
  .portfolio-card,
  .portfolio-card:nth-child(5n + 1),
  .portfolio-card:nth-child(5n + 2),
  .portfolio-card:nth-child(5n + 4) {
    grid-column: span 6;
  }
}

@media (width <= 640px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-card,
  .portfolio-card:nth-child(5n + 1),
  .portfolio-card:nth-child(5n + 2),
  .portfolio-card:nth-child(5n + 4) {
    grid-column: 1;
  }
}
</style>
