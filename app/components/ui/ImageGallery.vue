<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value] ?? props.images[0])

function show(index: number) {
  activeIndex.value = Math.max(0, Math.min(index, props.images.length - 1))
}

function previous() {
  show(activeIndex.value - 1)
}

function next() {
  show(activeIndex.value + 1)
}
</script>

<template>
  <div class="gallery" aria-label="Image gallery">
    <div class="gallery__main image-frame">
      <img :src="activeImage" :alt="alt" width="1200" height="900" loading="lazy" />
      <div v-if="images.length > 1" class="gallery__controls">
        <button type="button" aria-label="Previous image" @click="previous">
          <ChevronLeft :size="22" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next image" @click="next">
          <ChevronRight :size="22" aria-hidden="true" />
        </button>
      </div>
    </div>
    <div v-if="images.length > 1" class="gallery__thumbs" role="list">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        :aria-label="`Show image ${index + 1}`"
        :aria-current="activeIndex === index"
        @click="show(index)"
      >
        <img :src="image" alt="" width="160" height="120" loading="lazy" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  gap: 1rem;
}

.gallery__main {
  position: relative;
}

.gallery__controls {
  position: absolute;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
  display: flex;
  gap: 0.5rem;
}

.gallery__controls button,
.gallery__thumbs button {
  border: 0;
  background: var(--color-white);
  color: var(--color-ink);
}

.gallery__controls button {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border-radius: 999px;
  box-shadow: var(--shadow-tight);
}

.gallery__thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 0.65rem;
}

.gallery__thumbs button {
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: var(--card-radius);
  padding: 0;
}

.gallery__thumbs button[aria-current="true"] {
  border-color: var(--color-orange);
}

.gallery__thumbs img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
</style>
