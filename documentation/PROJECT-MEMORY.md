# Affinity Creative Project Memory

This file is a quick orientation map for future editing sessions.

## Project Identity

- Framework: Nuxt 4, Vue 3, TypeScript
- Hosting target: WHC shared hosting
- Production mode: static HTML with PHP quote endpoints
- Editable source: `app/`, `content/`, `public/`
- Generated deployment: `.output/public/`
- Production domain: `https://affinitycreative.ca`
- Contact email: `info@affinitycreative.ca`
- Phone and WhatsApp: `+1 437-313-1510`
- Instagram: `affinity__creative`

## Non-Negotiable Rule

Make surgical source edits only. Never reset, recreate, or regenerate the site
unless the owner explicitly authorizes the exact command required by
`AGENTS.md`.

The current source and manually assigned images are authoritative. Generated
files are disposable deployment artifacts and must never be manually edited.

## Main Source Map

| Area | Source |
| --- | --- |
| Global layout | `app/layouts/default.vue` |
| Header | `app/components/navigation/SiteHeader.vue` |
| Footer | `app/components/global/SiteFooter.vue` |
| Homepage | `app/pages/index.vue` and `app/components/home/` |
| Services overview | `app/pages/services.vue` |
| Shared service layout | `app/components/pages/ServicePageTemplate.vue` |
| Service content | `app/data/multipageContent.ts` |
| Embroidery and vinyl content | `app/data/priorityServicePages.ts` |
| Interactive process | `app/components/service/InteractiveProcessSection.vue` |
| Project brief requirements | `app/components/service/ProjectBriefStack.vue` |
| Contact form | `app/components/forms/QuoteForm.vue` |
| Business and social details | `content/site.json` |
| Blog content | `content/blog/` and service data |
| Images | `public/images/` |
| PHP form endpoints | `public/api/` |

## Public Routes

The sitemap contains 17 routes:

- `/`
- `/services/`
- `/apparel/`
- `/embroidery/`
- `/business-print/`
- `/signs-vehicle-graphics/`
- `/vinyl-graphics/`
- `/glass-finishes/`
- `/digital-marketing/`
- `/blog/`
- Four blog article routes
- `/contact/`
- `/privacy/`
- `/terms/`

## Current Approved Features

- Existing manually selected service and hero images
- Reusable premium footer from `SiteFooter.vue`
- Single-row, touch-friendly services carousel on `/services/`
- Interactive service-page process storyboard
- Responsive project brief requirement stack
- PHP quote submission with CSRF protection
- Floating WhatsApp and scroll-to-top controls

Do not remove or replace these while working on an unrelated request.

## Deployment Artifacts

- Current WHC ZIP name: `outputs/affinitycreative-whc-production.zip`
- WHC ZIP contents come only from `.output/public/`
- `index.html`, `.htaccess`, `_nuxt/`, `api/`, images, and route folders must
  be at the ZIP root
- Source backups and deployment ZIPs serve different purposes

Always verify timestamps before claiming `.output/public/` is current.
