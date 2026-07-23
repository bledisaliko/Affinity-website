<script setup lang="ts">
const { site } = useSiteContent()

usePageMeta({
  title: 'Terms of Use | Affinity Creative',
  description: 'Website terms for using the Affinity Creative website and requesting project information.',
  path: '/terms/',
  image: site.defaultOgImage,
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Terms', path: '/terms/' }
    ])
  ]
})
</script>

<template>
  <div class="legal-page">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Terms' }]" />
      <section class="legal-page__body" data-reveal>
        <p class="eyebrow">Terms</p>
        <h1>Terms of Use</h1>
        <p>This website provides general information about Affinity Creative services and a way to request project details.</p>

        <h2>Quote requests</h2>
        <p>Submitting a form does not create an order or guarantee availability, pricing or timing. Project details must be reviewed before a quote is confirmed.</p>

        <h2>Artwork and files</h2>
        <p>You are responsible for having the right to use any logos, artwork, images or text submitted for a project. Production may require artwork review, file preparation or approval.</p>

        <h2>Product information</h2>
        <p>Product availability, material options, production methods and timing can change. Final details are confirmed during the quote and approval process.</p>

        <h2>Website content</h2>
        <p>The website content is provided for general information and may be updated over time. Please contact Affinity Creative for current project details.</p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent to <a :href="site.emailHref">{{ site.email }}</a>.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.legal-page__body {
  display: grid;
  gap: 1rem;
  max-width: 48rem;
  padding-block: clamp(3rem, 7vw, 5.5rem);
}

.legal-page h1 {
  font-size: clamp(3rem, 7vw, 5.6rem);
  line-height: 0.94;
}

.legal-page h2 {
  margin-block-start: 1rem;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
}

.legal-page p {
  color: var(--color-muted);
}

.legal-page a {
  border-block-end: 2px solid var(--color-orange);
  font-weight: 900;
}
</style>
