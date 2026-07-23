<script setup lang="ts">
const { site } = useSiteContent()

useSeoMeta({
  title: `Page Not Found | ${site.companyName}`,
  description: 'The requested page could not be found. Return to the homepage or email Affinity Creative.',
  robots: 'noindex'
})
</script>

<template>
  <section class="page-hero">
    <div class="container page-hero__inner">
      <p class="eyebrow">404</p>
      <h1>That Page Is Off the Press.</h1>
      <p>The page you requested may have moved. Return home or email us about your project.</p>
      <div class="button-row">
        <NuxtLink class="button button--primary" to="/">Return Home</NuxtLink>
        <a class="button button--ghost" :href="site.emailHref">Email Us</a>
      </div>
    </div>
  </section>
</template>
