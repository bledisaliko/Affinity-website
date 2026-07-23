# Content Guide

Most normal website content is controlled by files in `content/`.

## Main Files

- `content/site.json`: company name, phone, email, address, domain, business hours, social links and default Open Graph image.
- `content/navigation.json`: header and footer navigation links.
- `content/homepage.json`: homepage hero, service introduction, touchpoint section and final call to action.
- `content/services.json`: services and individual service pages.
- `content/techniques.json`: embroidery, DTF and screen-printing comparison content.
- `content/portfolio.json`: the clearly labelled capability gallery shown on the Work page.
- `content/industries.json`: industries served.
- `content/faqs.json`: FAQ accordion content.
- `content/service-areas.json`: GTA service area list.
- `content/testimonials.json`: intentionally empty to avoid fake reviews.

## Homepage Section Mapping

- Hero: `content/homepage.json`
- Moving services strip: `app/components/home/MovingServicesStrip.vue`
- Four service pillars: selected from `content/services.json`
- Technique animation: `content/techniques.json`
- Technique comparison: `content/techniques.json`
- Capability showcase: featured capability cards from `content/portfolio.json`
- One brand touchpoints: `content/homepage.json`
- Industries served: `content/industries.json`
- GTA service area: `content/service-areas.json`
- FAQs: `content/faqs.json`
- Final call to action: `content/homepage.json`

## Service Pages

Each object in `content/services.json` creates a route:

```text
/services/service-slug/
```

Required fields include:

- `id`
- `slug`
- `title`
- `category`
- `shortDescription`
- `fullDescription`
- `featuredImage`
- `gallery`
- `benefits`
- `applications`
- `seoTitle`
- `metaDescription`
- `methods`
- `quoteNeeds`
- `combineWith`
- `nextStep`

## Capability Gallery

The Work page displays the approved capability labels from `content/portfolio.json`. Do not present capability cards as completed client work unless real photos, permissions and case-study copy are added later.

## GTA Service Area

The site uses one route:

```text
/service-area/
```

The `content/service-areas.json` file groups communities by region. Do not create city-specific landing pages without real local material.

## Validation

Run:

```bash
npm run validate:content
```

The validation checks required titles, duplicate slugs, missing images, invalid categories, SEO fields and broken content references.
