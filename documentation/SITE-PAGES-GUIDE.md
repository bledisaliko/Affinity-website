# Affinity Creative Site Pages Guide

This site is a Nuxt/Vue static site. Edit source files only. Do not edit `.output/`, `.nuxt/` or `dist/`.

## Main page files

- Homepage: `app/pages/index.vue`
- Services overview: `app/pages/services.vue`
- Custom Apparel: `app/pages/apparel.vue`
- Custom Embroidery: `app/pages/embroidery.vue`
- Business Print: `app/pages/business-print.vue`
- Signs & Vehicle Graphics: `app/pages/signs-vehicle-graphics.vue`
- Vinyl Graphics: `app/pages/vinyl-graphics.vue`
- Glass Finishes: `app/pages/glass-finishes.vue`
- Digital Marketing: `app/pages/digital-marketing.vue`
- Blog index: `app/pages/blog/index.vue`
- Blog article route: `app/pages/blog/[slug].vue`
- Contact: `app/pages/contact.vue`
- Privacy: `app/pages/privacy.vue`
- Terms: `app/pages/terms.vue`
- 404: `app/pages/404.vue`

## Main content file

Most service-page and blog-page content is in:

`app/data/multipageContent.ts`

To change a service page, find the matching object in `servicePages`. To change a blog article used by the site, find the matching object in `blogArticles`.

Embroidery and vinyl page overrides are in:

`app/data/priorityServicePages.ts`

## Shared layout blocks

- Header: `app/components/navigation/SiteHeader.vue`
- Services dropdown: `app/components/navigation/ServicesDropdown.vue`
- Footer: `app/components/global/SiteFooter.vue`
- Quote form: `app/components/forms/QuoteForm.vue`
- Service page layout: `app/components/pages/ServicePageTemplate.vue`
- Page hero: `app/components/pages/EditorialPageHero.vue`
- Image layout: `app/components/pages/ImageMosaic.vue`
- Category cards: `app/components/pages/ProductCategoryCard.vue`
- Interactive process: `app/components/service/InteractiveProcessSection.vue`
- Project brief stack: `app/components/service/ProjectBriefStack.vue`
- FAQ list: `app/components/ui/FaqAccordion.vue`

## Adding or editing a product category

1. Open `app/data/multipageContent.ts`.
2. Find the service in `servicePages`.
3. Add or edit an item in `categories`.
4. Use a public image path from `public/images/...`.
5. Run content validation and type checking. Generation is forbidden unless
   the owner provides the exact authorization required by `AGENTS.md`.

## Updating SEO

Each service object includes `seoTitle` and `seoDescription`. Each blog object includes `seoTitle` and `description`. Keep every title and description unique.

## Business details

Core business contact details live in `content/site.json`. Do not add an address or hours until confirmed by the owner.
