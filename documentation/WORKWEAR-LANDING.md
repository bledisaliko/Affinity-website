# /workwear/ landing page (Brevo campaign)

URL: https://affinitycreative.ca/workwear/
Campaign link: https://affinitycreative.ca/workwear/?utm_source=brevo&utm_medium=email&utm_campaign=workwear_winter_2026

## Where things live
| What | File |
| --- | --- |
| Products, prices, descriptions, image names, WhatsApp text | `public/workwear/products.json` |
| Page template (all other copy) | `scripts/workwear-template.html` |
| Page builder (not the Nuxt generator) | `scripts/build-workwear.mjs` |
| Styles / behaviour (versioned: bump the version in the filename on any edit, files are cached 1 year) | `public/workwear/workwear.v2.css`, `workwear.v1.js` (form and quote logic), `workwear-fx.v1.js` (motion), `fonts/archivo.woff2` |
| Quote endpoint | `public/api/workwear-quote.php` |
| Images (WebP) | `public/images/workwear/` ; original PNGs in `documentation/workwear-source-images/` |

## Editing
1. Change `products.json` or the template.
2. `node scripts/build-workwear.mjs --deploy` rebuilds `public/workwear/index.html` and mirrors only the workwear files into `deploy/`.
3. Commit, push, then Update from Remote + Deploy HEAD Commit in cPanel.

If CSS/JS is edited, rename to `.v2` and update the two references in the template.
Prices are also listed in `PRODUCT_CATALOGUE` in `workwear-quote.php` (the server recomputes totals); keep both in sync.

## Mail
Uses PHP mail() like the other quote endpoints. Config (optional) in `/home/ydhxqex4/private/affinity-quote-config.php`:
QUOTE_TO_EMAIL, MAIL_FROM_EMAIL (must be on affinitycreative.ca), MAIL_FROM_NAME. Set QUOTE_TEST_MODE=true to write .eml files to the server temp dir instead of sending.
