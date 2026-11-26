// Builds the static /workwear/ landing page from public/workwear/products.json.
// This is NOT the Nuxt generator: it only writes public/workwear/index.html and,
// with --deploy, mirrors the workwear files into deploy/. It never touches other pages.
//
//   node scripts/build-workwear.mjs            -> writes public/workwear/index.html
//   node scripts/build-workwear.mjs --deploy   -> also copies workwear files into deploy/
import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(process.cwd())
const config = JSON.parse(readFileSync(join(root, 'public/workwear/products.json'), 'utf8'))
const template = readFileSync(join(root, 'scripts/workwear-template.html'), 'utf8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const WA_ICON = '<svg class="wa-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'

const colourOptions = config.colours.map((c, i) => `<option value="${esc(c)}"${i === 0 ? ' selected' : ''}>${esc(c)}</option>`).join('')

const cards = config.products.map((p) => {
  const base = `/images/workwear/${p.image}`
  const model = p.brand ? `<p class="card__model">${esc(p.brand)} ${esc(p.model)}</p>` : ''
  const bullets = p.customization.map((c) => `<li>${esc(c)}</li>`).join('')
  return `        <article class="card reveal" data-product="${esc(p.id)}">
          <div class="card__img">
            <img src="${base}-600.webp" srcset="${base}-600.webp 600w, ${base}-900.webp 900w" sizes="(min-width: 1100px) 22vw, (min-width: 640px) 44vw, 92vw" width="1122" height="1402" loading="lazy" decoding="async" alt="${esc(p.alt)}">
            <span class="card__tag">Customization example</span>
            <span class="card__added" aria-hidden="true">Added to quote</span>
          </div>
          <div class="card__body">
            <p class="card__no">${esc(p.number)}</p>
            <h3>${esc(p.name)}</h3>
            ${model}
            <p class="card__price"><span>From</span> <strong>$${p.price}</strong> <span>/ ${esc(p.unit)} CAD</span></p>
            <p class="card__desc">${esc(p.description)}</p>
            <ul class="card__list">${bullets}</ul>
            <div class="card__pick">
              <div class="field field--sm"><label for="q-${esc(p.id)}">Quantity</label><input id="q-${esc(p.id)}" type="number" inputmode="numeric" min="1" max="100000" step="1" placeholder="e.g. 12" data-qty></div>
              <div class="field field--sm"><label for="c-${esc(p.id)}">Colour</label><select id="c-${esc(p.id)}" data-colour>${colourOptions}</select></div>
            </div>
            <button class="btn btn--primary btn--block" type="button" data-pick>${esc(p.button)}</button>
            <button class="card__remove" type="button" data-remove hidden>Remove from quote</button>
          </div>
        </article>`
}).join('\n')

const site = JSON.parse(readFileSync(join(root, 'content/site.json'), 'utf8'))
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://affinitycreative.ca/#business',
      name: site.companyName,
      url: site.domain + '/',
      telephone: '+1-437-313-1510',
      email: site.email,
      image: site.domain + '/images/workwear/workwear-hero-1600.webp',
      address: { '@type': 'PostalAddress', streetAddress: '376 Birchmount Rd', addressLocality: 'Scarborough', addressRegion: 'ON', postalCode: 'M1K 1M6', addressCountry: 'CA' },
      areaServed: ['Toronto', 'Greater Toronto Area']
    },
    {
      '@type': 'Service',
      '@id': 'https://affinitycreative.ca/workwear/#service',
      name: 'Custom workwear, embroidery and printing',
      serviceType: 'Custom embroidered and printed workwear',
      provider: { '@id': 'https://affinitycreative.ca/#business' },
      areaServed: ['Toronto', 'Greater Toronto Area'],
      url: 'https://affinitycreative.ca/workwear/'
    },
    {
      '@type': 'WebPage',
      '@id': 'https://affinitycreative.ca/workwear/',
      url: 'https://affinitycreative.ca/workwear/',
      name: 'Custom Workwear Toronto & GTA | Embroidery & Printed Apparel | Affinity Creative',
      isPartOf: { '@type': 'WebSite', url: 'https://affinitycreative.ca/' },
      about: { '@id': 'https://affinitycreative.ca/workwear/#service' }
    }
  ]
}).replace(/</g, '\\u003c')

const productJson = JSON.stringify({
  campaign: config.campaign,
  whatsappNumber: config.whatsappNumber,
  whatsappMessage: config.whatsappMessage,
  products: config.products.map(({ id, name, price }) => ({ id, name, price }))
}).replace(/</g, '\\u003c')

const html = template
  .replaceAll('{{WA_ICON}}', WA_ICON)
  .replace('{{PRODUCT_CARDS}}', cards)
  .replace('{{JSON_LD}}', jsonLd)
  .replace('{{PRODUCT_JSON}}', productJson)

mkdirSync(join(root, 'public/workwear'), { recursive: true })
writeFileSync(join(root, 'public/workwear/index.html'), html)
console.log('Wrote public/workwear/index.html')

if (process.argv.includes('--deploy')) {
  const copy = (from, to) => {
    if (!existsSync(join(root, from))) throw new Error(`Missing ${from}`)
    mkdirSync(join(root, to, '..'), { recursive: true })
    cpSync(join(root, from), join(root, to), { recursive: true })
  }
  copy('public/workwear', 'deploy/workwear')
  copy('public/images/workwear', 'deploy/images/workwear')
  copy('public/api/workwear-quote.php', 'deploy/api/workwear-quote.php')
  console.log('Mirrored workwear files into deploy/ (no other deploy files touched).')
}
