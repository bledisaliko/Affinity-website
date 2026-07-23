<script setup lang="ts">
import { computed, ref } from 'vue'

const { techniques } = useTechniques()
const activeSlug = ref(techniques[0]?.slug ?? '')
const active = computed(() => techniques.find((technique) => technique.slug === activeSlug.value) ?? techniques[0])
</script>

<template>
  <section class="section comparison" aria-labelledby="comparison-title">
    <div class="container comparison__grid">
      <div class="section-title" data-reveal>
        <p class="eyebrow">Technique Comparison</p>
        <h2 id="comparison-title">Choose the Finish That Fits the Job.</h2>
        <p>
          The best recommendation depends on garment type, artwork, quantity and how the apparel will be used.
        </p>
        <div class="comparison__tabs" role="tablist" aria-label="Technique comparison">
          <button
            v-for="technique in techniques"
            :id="`compare-tab-${technique.slug}`"
            :key="technique.slug"
            type="button"
            role="tab"
            :aria-selected="activeSlug === technique.slug"
            :aria-controls="`compare-panel-${technique.slug}`"
            :style="{ '--accent': technique.accent }"
            @click="activeSlug = technique.slug"
          >
            {{ technique.title }}
          </button>
        </div>
      </div>

      <article
        v-if="active"
        :id="`compare-panel-${active.slug}`"
        class="comparison-card"
        role="tabpanel"
        :aria-labelledby="`compare-tab-${active.slug}`"
        :style="{ '--accent': active.accent }"
        data-reveal
      >
        <div class="image-frame">
          <img :src="active.image" :alt="`${active.title} apparel finish`" width="960" height="720" loading="lazy" />
        </div>
        <div class="comparison-card__body">
          <h3>{{ active.title }}</h3>
          <p>{{ active.explanation }}</p>
          <div class="comparison-card__columns">
            <div>
              <h4>Best for</h4>
              <ul class="check-list">
                <li v-for="use in active.idealUses" :key="use">{{ use }}</li>
              </ul>
            </div>
            <div>
              <h4>Recommended garments</h4>
              <ul class="check-list">
                <li v-for="garment in active.garments" :key="garment">{{ garment }}</li>
              </ul>
            </div>
            <div>
              <h4>Finish</h4>
              <ul class="tag-list">
                <li v-for="finish in active.finish" :key="finish" class="tag">{{ finish }}</li>
              </ul>
            </div>
          </div>
          <p class="fine-print">{{ active.durability }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.comparison {
  background: var(--color-white);
}

.comparison__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(20rem, 1.18fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.comparison__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.comparison__tabs button {
  min-height: 2.75rem;
  border: 1px solid rgb(17 17 17 / 0.12);
  border-radius: 999px;
  background: var(--color-white);
  padding: 0.7rem 1rem;
  font-weight: 850;
}

.comparison__tabs button[aria-selected="true"] {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--color-ink);
}

.comparison-card {
  border: var(--border-subtle);
  border-radius: var(--card-radius);
  background: var(--color-warm-white);
  padding: clamp(0.8rem, 2vw, 1.2rem);
}

.comparison-card .image-frame {
  box-shadow: none;
}

.comparison-card__body {
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 2vw, 1.5rem) 0.4rem 0.4rem;
}

.comparison-card__columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.comparison-card h4 {
  margin-block-end: 0.6rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.2;
}

@media (width <= 960px) {
  .comparison__grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 700px) {
  .comparison-card__columns {
    grid-template-columns: 1fr;
  }
}
</style>
