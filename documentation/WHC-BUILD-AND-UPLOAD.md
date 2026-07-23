# WHC Build And Upload Guide

The site is generated as static HTML for WHC shared hosting. The quote form uses PHP files in `public/api/`.

## Build

Do not generate automatically. First follow the backup and authorization rules
in `AGENTS.md`.

After the owner provides the exact required authorization, run:

```bash
pnpm run typecheck
pnpm run generate
pnpm run verify:output
```

The upload-ready folder is:

`.output/public`

## What to upload

Upload the contents of `.output/public` to the web root on WHC. Include hidden files such as `.htaccess`.

Important generated files:

- `.output/public/index.html`
- `.output/public/404.html`
- `.output/public/sitemap.xml`
- `.output/public/robots.txt`
- `.output/public/.htaccess`
- `.output/public/api/quote.php`
- `.output/public/api/csrf.php`
- `.output/public/_nuxt/`
- `.output/public/brand/`
- `.output/public/images/`

## Testing after upload

1. Open the homepage.
2. Open `/services/`, each service page, `/blog/` and `/contact/`.
3. Submit a small test quote request using your own email.
4. Confirm the email arrives at `info@affinitycreative.ca`.
5. Test the mobile menu and services accordion.
6. Open `/sitemap.xml` and `/robots.txt`.

## Before major changes

Back up the full project folder and the current WHC public files before uploading a new version.

## WHC ZIP

Create the deployment ZIP from the contents of `.output/public/`, not from the
project root. The ZIP root must contain `index.html`, `.htaccess`, `_nuxt/`,
`api/`, images, and the route folders. Do not include source files,
dependencies, credentials, `.env` files, or wrapper directories.
