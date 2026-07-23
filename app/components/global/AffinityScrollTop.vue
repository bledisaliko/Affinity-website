<script setup lang="ts">
const isVisible = ref(false)
const prefersReducedMotion = ref(false)

let mediaQuery: MediaQueryList | undefined

function updateVisibility() {
  isVisible.value = window.scrollY > 500
}

function updateMotionPreference() {
  prefersReducedMotion.value = Boolean(mediaQuery?.matches)
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
  })
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotionPreference()
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
  mediaQuery.addEventListener('change', updateMotionPreference)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
  mediaQuery?.removeEventListener('change', updateMotionPreference)
})
</script>

<template>
  <button
    class="scroll-top"
    :class="{ 'scroll-top--visible': isVisible }"
    type="button"
    aria-label="Scroll back to top"
    @click="scrollToTop"
  >
    <span class="scroll-top__capsule" aria-hidden="true">
      <img src="/brand/affinity-footer-logo.png" alt="">
    </span>
    <span class="scroll-top__patch" aria-hidden="true">
      <img src="/brand/affinity-circle-patch.png" alt="">
      <span class="scroll-top__arrow">↑</span>
    </span>
  </button>
</template>

<style scoped>
.scroll-top {
  position: fixed;
  inset-inline-end: 1.5rem;
  inset-block-end: 1.5rem;
  z-index: 80;
  width: 4.5rem;
  height: 4.5rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-white);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, 0.85rem, 0) scale(0.82);
  transition:
    width 520ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 220ms var(--ease),
    transform 220ms var(--ease);
}

.scroll-top--visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
}

.scroll-top__capsule {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 999px;
  background: #0f0f0d;
  box-shadow: 0 1rem 2.1rem rgb(17 17 15 / 0.28);
  opacity: 0;
  transform: scaleX(0.72);
  transform-origin: right center;
  transition:
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-top__capsule img {
  position: absolute;
  inset-block: 50% auto;
  inset-inline-start: 1.1rem;
  width: 12.8rem;
  height: auto;
  object-fit: contain;
  opacity: 0;
  transform: translate3d(1.2rem, -50%, 0);
  transition:
    opacity 360ms cubic-bezier(0.22, 1, 0.36, 1) 90ms,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 90ms;
}

.scroll-top__patch {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  display: grid;
  width: 4.5rem;
  height: 4.5rem;
  place-items: center;
  border-radius: 999px;
  filter: drop-shadow(0 0.7rem 1.25rem rgb(17 17 15 / 0.32));
  overflow: hidden;
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-top__patch img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 999px;
}

.scroll-top__arrow {
  position: absolute;
  inset-inline-end: 0.44rem;
  inset-block-end: 0.42rem;
  display: grid;
  width: 1.45rem;
  height: 1.45rem;
  place-items: center;
  border-radius: 999px;
  background: var(--color-orange);
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 900;
  line-height: 1;
}

@media (hover: hover) and (pointer: fine) {
  .scroll-top:hover,
  .scroll-top:focus-visible {
    width: 18rem;
    transform: translate3d(0, 0, 0) scale(1);
  }

  .scroll-top:hover .scroll-top__capsule,
  .scroll-top:focus-visible .scroll-top__capsule {
    opacity: 1;
    transform: scaleX(1);
  }

  .scroll-top:hover .scroll-top__capsule img,
  .scroll-top:focus-visible .scroll-top__capsule img {
    opacity: 1;
    transform: translate3d(0, -50%, 0);
  }

  .scroll-top:hover .scroll-top__patch,
  .scroll-top:focus-visible .scroll-top__patch {
    transform: rotate(180deg);
  }
}

.scroll-top:focus-visible {
  outline: 3px solid var(--color-orange);
  outline-offset: 0.35rem;
}

@media (width <= 640px) {
  .scroll-top {
    inset-inline-end: 0.875rem;
    inset-block-end: 0.875rem;
    width: 3.65rem;
    height: 3.65rem;
  }

  .scroll-top__patch {
    width: 3.65rem;
    height: 3.65rem;
  }

  .scroll-top__capsule {
    display: none;
  }

  .scroll-top__arrow {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.86rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-top,
  .scroll-top *,
  .scroll-top::before,
  .scroll-top::after {
    transition-duration: 0.01ms !important;
  }
}
</style>
