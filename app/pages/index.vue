<script setup lang="ts">
const { site } = useSiteContent()

const title = `Embroidery, Printing & Vinyl Graphics GTA | ${site.companyName}`
const description = 'Affinity Creative provides custom embroidery, apparel printing, business print, vinyl graphics, vehicle decals, signs and digital marketing across Toronto and the GTA.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: absoluteUrl(site, site.defaultOgImage),
  ogUrl: absoluteUrl(site, '/'),
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: absoluteUrl(site, site.defaultOgImage),
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: absoluteUrl(site, '/') }],
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: site.companyName,
        url: site.domain,
        telephone: site.phone,
        email: site.email,
        areaServed: 'Toronto and the Greater Toronto Area',
        image: absoluteUrl(site, site.defaultOgImage),
        serviceType: ['Custom Embroidery', 'Apparel Printing', 'Business Print', 'Vinyl Graphics', 'Vehicle Decals', 'Signs', 'Web Design', 'Digital Marketing']
      })
    }
  ]
})
</script>

<template>
  <SimpleHero />
  <SimpleServices />
  <SimpleMethods />
  <SimpleSplit />
  <SimpleBrandStatement />
  <SimpleProcess />
  <SimpleContactCta />
</template>
