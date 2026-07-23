<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import type { FaqItem } from '../../types/content'

defineProps<{
  faqs: FaqItem[]
}>()

const openId = ref<string | null>(null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="faq-list">
    <article v-for="faq in faqs" :key="faq.id" class="faq-item">
      <h3>
        <button
          type="button"
          :aria-expanded="openId === faq.id"
          :aria-controls="`faq-${faq.id}`"
          @click="toggle(faq.id)"
        >
          <span>{{ faq.question }}</span>
          <ChevronDown :size="22" aria-hidden="true" />
        </button>
      </h3>
      <div v-show="openId === faq.id" :id="`faq-${faq.id}`" class="faq-item__answer">
        <p>{{ faq.answer }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.faq-list {
  display: grid;
  gap: 0.8rem;
}

.faq-item {
  border: var(--border-subtle);
  border-radius: var(--card-radius);
  background: var(--color-white);
}

.faq-item h3 {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.3;
}

.faq-item button {
  display: flex;
  width: 100%;
  min-height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 0;
  background: transparent;
  color: var(--color-ink);
  padding: 1rem;
  text-align: start;
  font-weight: 850;
}

.faq-item button svg {
  flex: 0 0 auto;
  transition: transform 180ms var(--ease);
}

.faq-item button[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

.faq-item__answer {
  padding: 0 1rem 1rem;
  color: var(--color-muted);
}
</style>
