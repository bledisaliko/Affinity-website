<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const { site } = useSiteContent()

useHead({
  title: `Page not found | ${site.companyName}`,
  meta: [
    {
      name: 'description',
      content: 'The requested page could not be found. Return to the homepage or email Affinity Creative.'
    }
  ]
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <section class="page-hero not-found">
    <div class="container page-hero__inner">
      <p class="eyebrow">Error {{ props.error.statusCode || 404 }}</p>
      <h1>That Page Is Off the Press.</h1>
      <p>
        The page you requested may have moved, or the address may need another pass. You can return home or email us about your project.
      </p>
      <div class="button-row">
        <button class="button button--primary" type="button" @click="handleError">Return Home</button>
        <a class="button button--ghost" :href="site.emailHref">Email Us</a>
      </div>
    </div>
  </section>
</template>
