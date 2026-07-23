# WHC Deployment Guide

This site is designed for WHC shared hosting.

## Build the Website

Run:

```bash
npm run generate
```

The generated files will be in:

```text
.output/public/
```

## Upload to WHC

1. Sign in to WHC.
2. Open File Manager.
3. Back up the current `public_html/` folder.
4. Open `.output/public/` on your computer.
5. Upload the contents of `.output/public/` into `public_html/`.
6. Make sure these items exist in `public_html/`:
   - `index.html`
   - `services/`
   - `printing-techniques/`
   - `work/`
   - `about/`
   - `service-area/`
   - `contact/`
   - `_nuxt/`
   - `images/`
   - `api/quote.php`
   - `api/csrf.php`
   - `.htaccess`

## Quote Form Configuration

Inside WHC File Manager:

1. Open `public_html/api/`.
2. Copy `config.example.php`.
3. Rename the copy to `config.php`.
4. Add the real recipient email.
5. Add SMTP settings if using PHPMailer.

PHP `mail()` is available as a fallback, but SMTP is recommended for reliability.

## Testing the Quote Form

1. Open the live contact page.
2. Submit the form with missing fields and confirm errors appear.
3. Submit a complete test request.
4. Confirm the email arrives.
5. Check spam/junk if needed.

## Important Notes

- No Node.js server is required after generation.
- Do not upload `node_modules/`.
- Do not upload real SMTP credentials to a public repository.
- The `/api/` PHP files must remain in `public_html/api/`.
