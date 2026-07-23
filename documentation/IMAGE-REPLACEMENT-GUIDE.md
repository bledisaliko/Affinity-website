# Image Replacement Guide

The current site uses temporary local images so every page feels complete. Replace them with owner-approved photography when ready.

Keep the same file names when possible. That lets the site update without code changes.

## Brand images

- Header logo: `public/brand/affinity-header-logo.png`
- Footer logo: `public/brand/affinity-footer-logo.png`
- Rotating patch: `public/brand/affinity-circle-patch.png`
- Favicon: `public/brand/affinity-favicon.png`

## Apparel images

- `public/images/apparel/printed-company-tshirt.webp`
- `public/images/embroidery/embroidered-company-polo.webp`
- `public/images/apparel/custom-printed-hoodie.webp`
- `public/images/apparel/branded-work-jacket.webp`
- `public/images/apparel/branded-baseball-hat.webp`
- `public/images/apparel/team-screen-printed-shirts.webp`
- `public/images/dtf/dtf-transfer-film.webp`
- `public/images/screen-printing/screen-printing-process.webp`

## Business print images

- `public/images/business-print/business-cards.webp`
- `public/images/business-print/flyers-brochures.webp`
- `public/images/business-print/door-hangers.webp`
- `public/images/business-print/postcards-direct-mail.webp`
- `public/images/business-print/posters-review-plates.jpg`

## Signs and vehicle graphics images

- `public/images/signs/coroplast-signs.webp`
- `public/images/signs/vinyl-banners.webp`
- `public/images/signs/storefront-vinyl.webp`
- `public/images/vehicle-graphics/vehicle-lettering.webp`
- `public/images/vehicle-graphics/partial-vehicle-wrap.webp`
- `public/images/vehicle-graphics/commercial-vehicle-wrap.webp`

## Glass finishes images

- `public/images/glass-finishes/frosted-meeting-room.webp`
- `public/images/glass-finishes/patterned-glass.webp`
- `public/images/glass-finishes/branded-glass.webp`

## Digital images

- `public/images/digital/website-devices.webp`
- `public/images/digital/search-campaign.webp`
- `public/images/digital/social-ad-concept.webp`
- `public/images/digital/reporting-concept.webp`

## Blog images

- `public/images/blog/vehicle-graphics-marketing.webp`
- `public/images/blog/local-seo-for-gta-businesses.webp`
- `public/images/blog/direct-mail-canada-post.webp`
- `public/images/blog/embroidery-dtf-screen-printing.webp`

## After replacing images

Run:

```bash
npm run validate:content
npm run generate
```

Then inspect the affected pages in the preview.
