<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="item.label">
      <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
      <span v-else aria-current="page">{{ item.label }}</span>
      <span v-if="index < items.length - 1" aria-hidden="true">/</span>
    </template>
  </nav>
</template>
