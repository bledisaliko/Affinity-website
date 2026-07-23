<script setup lang="ts">
const { site } = useSiteContent()
</script>

<template>
  <section id="contact" class="section contact-section" aria-labelledby="contact-title">
    <div class="container">
      <div class="contact-panel" data-reveal>
        <div class="contact-panel__copy">
          <h2 id="contact-title">Have a project in mind?</h2>
          <p>
            Send the product, quantity, artwork and required date. Your request goes directly to {{ site.email }}.
          </p>
          <div class="contact-panel__direct">
            <a :href="site.phoneHref">{{ site.phone }}</a>
            <a :href="site.emailHref">{{ site.email }}</a>
          </div>
        </div>

        <QuoteForm />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding-block-start: clamp(3rem, 7vw, 5rem);
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(20rem, 1.25fr);
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: start;
  border-radius: 1.75rem;
  background: var(--color-orange);
  color: var(--color-white);
  padding: clamp(1.75rem, 4vw, 2.75rem);
}

.contact-panel__copy {
  display: grid;
  gap: 1rem;
}

.contact-panel h2 {
  max-width: 13ch;
  color: var(--color-white);
  font-size: clamp(2.15rem, 5vw, 3.75rem);
  line-height: 0.96;
}

.contact-panel p {
  max-width: 36rem;
  color: rgb(255 255 255 / 0.86);
}

.contact-panel__direct {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1rem;
  font-weight: 900;
}

.contact-panel__direct a {
  border-block-end: 2px solid rgb(255 255 255 / 0.55);
}

@media (width <= 860px) {
  .contact-panel {
    grid-template-columns: 1fr;
  }
}
</style>
