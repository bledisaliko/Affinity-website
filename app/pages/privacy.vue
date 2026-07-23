<script setup lang="ts">
const { site } = useSiteContent()

usePageMeta({
  title: 'Privacy Policy | Affinity Creative',
  description: 'How Affinity Creative handles quote request information submitted through the website.',
  path: '/privacy/',
  image: site.defaultOgImage,
  schema: [
    buildBreadcrumbSchema(site, [
      { name: 'Home', path: '/' },
      { name: 'Privacy', path: '/privacy/' }
    ])
  ]
})
</script>

<template>
  <div class="legal-page">
    <div class="container">
      <PageBreadcrumbs :items="[{ label: 'Home', href: '/' }, { label: 'Privacy' }]" />
      <section class="legal-page__body" data-reveal>
        <p class="eyebrow">Privacy</p>
        <h1>Privacy Policy</h1>
        <p>Affinity Creative uses the information submitted through this website to respond to quote requests and project inquiries.</p>

        <h2>Information we collect</h2>
        <p>The quote form may collect your name, company, email, phone number, preferred contact method, service category, quantity, required date, artwork notes and project details.</p>

        <h2>How the information is used</h2>
        <p>The information is used to review the request, contact you about the project and prepare next steps. Do not submit payment information through the form.</p>

        <h2>Email and phone contact</h2>
        <p>If you submit a request, Affinity Creative may respond by email or phone using the contact details provided.</p>

        <h2>Website security</h2>
        <p>The form includes basic spam protection. No website form can be guaranteed to be risk-free, so avoid sending sensitive personal or payment information.</p>

        <h2>Questions</h2>
        <p>For privacy questions, email <a :href="site.emailHref">{{ site.email }}</a>.</p>
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
