<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; href?: string }>
}>()
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <NuxtLink v-if="item.href" :to="item.href">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  padding-block: 1.2rem 0;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 850;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
}

.breadcrumbs li:not(:last-child)::after {
  content: "/";
  color: rgb(17 17 15 / 0.32);
}

.breadcrumbs a {
  border-block-end: 1px solid transparent;
}

.breadcrumbs a:hover,
.breadcrumbs a:focus-visible {
  border-color: var(--color-orange);
  color: var(--color-ink);
}
</style>
