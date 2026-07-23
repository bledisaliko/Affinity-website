<script setup lang="ts">
import { ArrowUpRight, ChevronDown } from 'lucide-vue-next'
import { featuredServiceLinks, serviceMenuItems } from '../../data/serviceMenu'
import { trackEventForHref } from '../../utils/tracking'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function openMenu() {
  isOpen.value = true
}

function closeMenu() {
  isOpen.value = false
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function trackFeatured(href: string) {
  trackEventForHref(href, {
    location: 'services_dropdown'
  })
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget as Node | null
  if (nextTarget && dropdownRef.value?.contains(nextTarget)) return
  closeMenu()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
    const button = dropdownRef.value?.querySelector('button')
    button?.focus()
  }
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null
  if (target && dropdownRef.value?.contains(target)) return
  closeMenu()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="services-dropdown"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
    @focusout="handleFocusOut"
    @keydown="handleKeydown"
  >
    <button
      class="services-dropdown__button"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="services-menu"
      @click="toggleMenu"
    >
      <span>Services</span>
      <ChevronDown :size="16" aria-hidden="true" />
    </button>

    <nav v-show="isOpen" id="services-menu" class="services-dropdown__panel" aria-label="Services">
      <NuxtLink
        v-for="item in serviceMenuItems"
        :key="item.to"
        class="service-menu-item"
        :to="item.to"
        @click="closeMenu"
      >
        <span class="service-menu-item__icon" aria-hidden="true">
          <component :is="item.icon" />
        </span>

        <span class="service-menu-item__copy">
          <strong>{{ item.title }}</strong>
          <span>{{ item.description }}</span>
        </span>

        <ArrowUpRight class="service-menu-item__arrow" :size="17" aria-hidden="true" />
      </NuxtLink>

      <div class="services-dropdown__featured">
        <span>Popular:</span>
        <NuxtLink
          v-for="link in featuredServiceLinks"
          :key="link.to"
          :to="link.to"
          @click="trackFeatured(link.to); closeMenu()"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.services-dropdown {
  position: relative;
}

.services-dropdown__button {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border: 0;
  background: transparent;
  color: var(--color-ink);
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  padding: 0.35rem 0;
}

.services-dropdown__button svg {
  transition: transform 180ms var(--ease);
}

.services-dropdown__button[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

.services-dropdown__button:focus-visible,
.services-dropdown__panel a:focus-visible {
  outline: 3px solid rgb(255 90 47 / 0.45);
  outline-offset: 4px;
}

.services-dropdown__panel {
  position: absolute;
  inset-block-start: calc(100% + 0.85rem);
  inset-inline-start: 50%;
  z-index: 50;
  display: grid;
  width: min(34rem, calc(100vw - 2rem));
  transform: translateX(-50%);
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: var(--color-white);
  box-shadow: 0 1.4rem 3rem rgb(17 17 15 / 0.14);
  padding: 0.55rem;
}

.services-dropdown__panel::before {
  content: "";
  position: absolute;
  inset-block-start: -0.9rem;
  inset-inline: 0;
  height: 0.9rem;
}

.service-menu-item {
  position: relative;
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr) auto;
  gap: 0.9rem;
  align-items: center;
  border-radius: 0.7rem;
  padding: 0.85rem;
  transition:
    background 200ms var(--ease),
    transform 200ms var(--ease);
}

.service-menu-item:hover,
.service-menu-item:focus-visible {
  background: var(--color-warm-white);
  transform: translate3d(3px, 0, 0);
}

.service-menu-item.router-link-exact-active {
  background: rgb(255 90 47 / 0.09);
}

.service-menu-item.router-link-exact-active::before {
  content: "";
  position: absolute;
  inset-block: 0.65rem;
  inset-inline-start: 0;
  width: 3px;
  border-radius: 999px;
  background: var(--color-orange);
}

.service-menu-item__icon {
  display: grid;
  width: 2.65rem;
  height: 2.65rem;
  place-items: center;
  border: 1px solid rgb(255 90 53 / 0.22);
  border-radius: 0.75rem;
  background: #fff7f2;
  color: var(--color-orange);
  transition:
    background 200ms var(--ease),
    border-color 200ms var(--ease),
    color 200ms var(--ease);
}

.service-menu-item__icon svg {
  width: 1.35rem;
  height: 1.35rem;
  stroke-width: 1.8;
}

.service-menu-item:hover .service-menu-item__icon,
.service-menu-item:focus-visible .service-menu-item__icon,
.service-menu-item.router-link-exact-active .service-menu-item__icon {
  border-color: var(--color-orange);
  background: var(--color-orange);
  color: var(--color-white);
}

.service-menu-item__copy {
  display: grid;
  gap: 0.2rem;
  min-width: 0;
}

.service-menu-item__copy strong {
  color: var(--color-ink);
  font-size: 0.95rem;
}

.service-menu-item__copy span {
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 760;
  line-height: 1.35;
}

.service-menu-item__arrow {
  color: var(--color-orange);
  opacity: 0.78;
  transition:
    opacity 200ms var(--ease),
    transform 200ms var(--ease);
}

.service-menu-item:hover .service-menu-item__arrow,
.service-menu-item:focus-visible .service-menu-item__arrow {
  opacity: 1;
  transform: translate3d(3px, -3px, 0);
}

.services-dropdown__featured {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.7rem;
  align-items: center;
  border-block-start: 1px solid var(--color-line);
  margin-block-start: 0.35rem;
  padding: 0.72rem 0.85rem 0.2rem;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 850;
}

.services-dropdown__featured a {
  color: var(--color-orange);
  font-weight: 950;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.18rem;
}

.services-dropdown__featured a:hover,
.services-dropdown__featured a:focus-visible {
  text-decoration-color: currentColor;
}
</style>
