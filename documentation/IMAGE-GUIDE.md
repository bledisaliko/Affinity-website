# Image Guide

The current images are starter visuals for development. Replace them with real photography or approved production images before launch.

## Image Folders

- `public/images/apparel/`
- `public/images/embroidery/`
- `public/images/dtf/`
- `public/images/screen-printing/`
- `public/images/printing/`
- `public/images/signage/`
- `public/images/window-graphics/`
- `public/images/vehicle-graphics/`
- `public/images/websites/`
- `public/images/marketing/`
- `public/images/portfolio/` only if real approved work images are added later.

## Recommended Format

Use WebP images where possible.

Recommended sizes:

- Hero and large section images: 1200px wide or larger.
- Cards and gallery images: 900px to 1400px wide.
- Open Graph image: 1200px by 630px.

## Replacing an Image

1. Save the new image in the matching `public/images/` folder.
2. Use a descriptive filename, such as `embroidered-company-polo.webp`.
3. Update the path in the matching `content/*.json` file.
4. Run `npm run validate:content`.
5. Run `npm run generate`.

## Alt Text

Components use descriptive alt text from service, technique and capability titles. After real images are added, improve text where needed by updating component props or adding alt fields to the content model.

## Do Not Hotlink

Do not point production image paths to external stock-photo URLs. Keep final images local inside `public/images/`.
