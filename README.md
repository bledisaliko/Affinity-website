# GTA Printing, Apparel, Signage and Marketing Website

This is a complete static Nuxt and Vue website for a Greater Toronto Area business that offers custom apparel, decoration, business printing, signs, large-format graphics, websites and digital marketing.

The site is not an online store. It is built to generate quote requests, calls and email inquiries.

## How the Project Works

- Website pages are built with Nuxt, Vue 3 and TypeScript.
- Normal website copy lives in the `content/` folder.
- Images live in `public/images/`.
- The quote form submits to PHP files in `public/api/` after upload to WHC shared hosting.
- The production command is `npm run generate`.
- The WHC-ready website is created in `.output/public/`.

## Install Node.js

Install the current Node.js LTS version from `https://nodejs.org/`.

After installing Node.js, open a terminal in this project folder and run:

```bash
npm install
```

## Run the Site Locally

```bash
npm run dev
```

Open the local address shown in the terminal.

The PHP quote endpoint will only run on hosting that supports PHP. Locally, the form still validates fields in the browser.

## Production Build

```bash
npm run generate
```

The finished static site will be in:

```text
.output/public/
```

Upload the contents of `.output/public/` into the WHC `public_html/` folder.

## Change Company Information

Edit:

```text
content/site.json
```

The company name and domain are set to `affintycreative.ca` until the owner confirms whether that spelling or `affinitycreative.ca` is correct.

Add the confirmed phone, email, business hours, address and social links before launch. Until then, the website hides missing contact details instead of printing fake values.

## Change Phone Number or Email

Edit `content/site.json`:

Update the `phone` and `email` fields in `content/site.json`.

The header, footer, contact page and mobile action bar all use this file.

## Change Core Services

Edit:

```text
content/services.json
```

The initial site is intentionally limited to four core service pages: custom apparel, print and marketing materials, signs and large format, and websites and digital marketing.

Then run:

```bash
npm run validate:content
```

## Update the Capability Gallery

Edit:

```text
content/portfolio.json
```

The Work page is a clearly labelled capability gallery until real client work, photos and permissions are available.

## Replace Images

Place new WebP images in the matching folder under:

```text
public/images/
```

Then update the image path in the content file. See `documentation/IMAGE-GUIDE.md`.

## Change Colours

Edit:

```text
app/assets/css/tokens.css
```

The main brand colours are CSS custom properties near the top of that file.

## Quote Form Setup

The PHP files are in:

```text
public/api/
```

On WHC, copy `config.example.php` to `config.php`, then add the real recipient email and SMTP settings.

Do not commit `config.php` with real passwords.

## Back Up the Current Website

Before replacing an existing WHC website:

1. Sign in to WHC.
2. Open File Manager.
3. Download a full copy of the current `public_html/` folder.
4. Export any related email/forms data if applicable.
5. Only then upload the new `.output/public/` files.

## Useful Documentation

- `documentation/CONTENT-GUIDE.md`
- `documentation/IMAGE-GUIDE.md`
- `documentation/WHC-DEPLOYMENT.md`
- `documentation/CODEX-CHANGE-GUIDE.md`
