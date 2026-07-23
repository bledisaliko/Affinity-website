<script setup lang="ts">
defineProps<{
  heading: string
  body: string
  items: string[]
}>()
</script>

<template>
  <section class="section quote-requirements">
    <div class="container quote-requirements__panel" data-reveal>
      <div>
        <h2>{{ heading }}</h2>
        <p>{{ body }}</p>
      </div>
      <ol>
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.quote-requirements__panel {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(18rem, 1.15fr);
  gap: clamp(1.25rem, 4vw, 3rem);
  align-items: start;
  border-radius: 1.45rem;
  background: var(--color-white);
  padding: clamp(1.4rem, 4vw, 2.5rem);
}

.quote-requirements h2 {
  max-width: 12ch;
  font-size: clamp(2rem, 4vw, 3.7rem);
}

.quote-requirements p {
  max-width: 34rem;
  margin-block-start: 0.85rem;
  color: var(--color-muted);
}

.quote-requirements ol {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: quote-list;
}

.quote-requirements li {
  display: grid;
  grid-template-columns: 2.55rem 1fr;
  gap: 0.75rem;
  align-items: center;
  border: 1px solid var(--color-line);
  border-radius: 0.85rem;
  background: var(--color-warm-white);
  padding: 0.78rem;
  font-weight: 900;
  counter-increment: quote-list;
}

.quote-requirements li::before {
  content: counter(quote-list);
  display: grid;
  width: 2.1rem;
  height: 2.1rem;
  place-items: center;
  border-radius: 999px;
  background: var(--color-orange);
  color: var(--color-white);
  font-size: 0.82rem;
}

@media (width <= 760px) {
  .quote-requirements__panel {
    grid-template-columns: 1fr;
  }
}
</style>
