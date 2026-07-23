# Blog Update Guide

The live blog pages are controlled by `app/data/multipageContent.ts`.

Editable markdown copies are also stored in:

`content/blog/`

The markdown files are useful for drafting, review and future migration. If you edit a markdown article and want the website to change, copy the final text into the matching `blogArticles` item in `app/data/multipageContent.ts`.

## Current articles

- `content/blog/vehicle-graphics-marketing.md`
- `content/blog/local-seo-for-gta-businesses.md`
- `content/blog/direct-mail-canada-post.md`
- `content/blog/embroidery-dtf-screen-printing.md`

## Adding a new article

1. Add a new object to `blogArticles` in `app/data/multipageContent.ts`.
2. Add a matching markdown draft in `content/blog/`.
3. Add a clean image under `public/images/blog/`.
4. Add the route to `publicRoutes` in `app/data/multipageContent.ts`.
5. Add the route to `nuxt.config.ts`.
6. Add the route to `scripts/generate-sitemap.mjs`, `scripts/finalize-output.mjs` and `scripts/verify-output.mjs`.
7. Run validation and generation.

## Writing standard

Use short paragraphs, real product names and direct advice. Avoid generic marketing phrases and do not invent projects, reviews, awards or guarantees.
