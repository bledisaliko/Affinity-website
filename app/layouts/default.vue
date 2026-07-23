<script setup lang="ts">
const route = useRoute()
const { refresh } = useScrollReveal()

async function refreshReveals() {
  if (import.meta.client) {
    document.documentElement.classList.add('reveal-ready')
  }

  await nextTick()
  refresh()
}

onMounted(() => {
  void refreshReveals()
})

watch(
  () => route.fullPath,
  () => {
    void refreshReveals()
  }
)
</script>

<template>
  <div>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" class="page-main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
    <AffinityScrollTop />
  </div>
</template>
