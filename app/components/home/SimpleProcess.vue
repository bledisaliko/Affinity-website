<script setup lang="ts">
import { processSteps } from '../../utils/simpleHomepage'
</script>

<template>
  <section id="process" class="section section--white" aria-labelledby="process-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 id="process-title">Simple from the first message.</h2>
        <p>Send the basics. We will help narrow the product, method and next step.</p>
      </div>

      <div class="steps-grid">
        <article
          v-for="(step, index) in processSteps"
          :key="step.number"
          class="step-card"
          data-reveal
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <b>{{ step.number }}</b>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem;
}

.step-card {
  display: grid;
  gap: 0.55rem;
  border-block-start: 2px solid var(--color-ink);
  padding: 1.5rem 0.35rem 0;
}

.step-card b {
  margin-block-end: 1rem;
  color: var(--color-orange);
  font-size: 0.78rem;
}

.step-card h3 {
  font-family: var(--font-body);
  font-size: 1.2rem;
}

.step-card p {
  color: var(--color-muted);
  font-size: 0.95rem;
}

@media (width <= 900px) {
  .steps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= 560px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
