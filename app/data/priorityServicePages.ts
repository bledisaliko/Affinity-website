import type { ServicePage } from './multipageContent'

export const priorityServicePages: ServicePage[] = [
  {
    slug: 'embroidery',
    path: '/embroidery/',
    navTitle: 'Custom Embroidery',
    navDescription: 'Logo embroidery for polos, jackets, hats, beanies and uniforms',
    seoTitle: 'Custom Embroidery Toronto & GTA | Affinity Creative',
    seoDescription: 'Custom logo embroidery for polos, jackets, hats, beanies, work shirts and uniforms across Toronto and the GTA. Request an embroidery quote from Affinity Creative.',
    eyebrow: 'Custom Embroidery',
    heading: 'Custom Embroidery for Workwear, Hats and Uniforms.',
    body: 'Add a clean, professional stitched logo to polos, jackets, work shirts, hats, beanies and staff uniforms. Affinity Creative prepares the artwork for embroidery, recommends practical logo sizes and helps choose garments that suit the way your team works.',
    support: 'For uniforms, commercial embroidery, logo embroidery, staff apparel, hats and workwear across Toronto and the GTA.',
    primaryAction: { label: 'Request an Embroidery Quote', href: '/contact/?service=embroidery#quote' },
    secondaryAction: { label: 'Call 437-313-1510', href: 'tel:+14373131510' },
    images: [
      { src: '/images/embroidery/embroidered-company-polo.webp', alt: 'Embroidered company logo on a work polo' },
      { src: '/images/apparel/branded-baseball-hat.webp', alt: 'Custom embroidered baseball caps in assorted colours' },
      { src: '/images/apparel/branded-work-jacket.webp', alt: 'Work jacket suitable for logo embroidery' }
    ],
    categoryHeading: 'What we embroider.',
    categoryIntro: 'Embroidery that works on a polo may need adjustment for a curved cap, a stretchy beanie or a jacket with seams and pockets. Small text and fine lines may need to be simplified before the logo is digitized into stitches.',
    categories: [
      { title: 'Polos', body: 'A common choice for left-chest logo embroidery on customer-facing uniforms, office teams and field staff.', image: { src: '/images/embroidery/embroidered-company-polo.webp', alt: 'Logo embroidery on a company polo' } },
      { title: 'Work Shirts', body: 'Durable shirts for crews and technicians where the logo needs to look clean after repeated wear.', image: { src: '/images/apparel/printed-company-tshirt.webp', alt: 'Branded company work shirts in several colours' } },
      { title: 'Jackets', body: 'Softshells, shells and outerwear can carry a stitched logo when seams, pockets and fabric thickness are considered.', image: { src: '/images/apparel/branded-work-jacket.webp', alt: 'Work jacket prepared for logo embroidery' } },
      { title: 'Hats and Caps', body: 'Structured caps need artwork sized for the front or side panel. Curved surfaces limit small text and fine detail.', image: { src: '/images/apparel/branded-baseball-hat.webp', alt: 'Custom embroidered cap concept' } },
      { title: 'Beanies and Toques', body: 'Stretchy knits can affect logo shape, so simple marks and practical stitch sizes usually work best.', image: { src: '/images/apparel/beanies-emroidery.png', alt: 'Embroidered beanies and toques with logo patches' } },
      { title: 'Hoodies', body: 'A stitched left-chest logo can give hoodies a more uniform-ready finish than a large printed graphic.', image: { src: '/images/apparel/custom-printed-hoodie.webp', alt: 'Custom hoodie suitable for embroidered logo placement' } }
    ],
    splitHeading: 'How artwork becomes embroidery.',
    splitBody: 'A normal logo file cannot be sent directly to the embroidery machine. It must first be digitized into stitch instructions. The digitizing process sets stitch type, direction, density, underlay and colour order for the final size and garment. Gradients, tiny text and very fine lines often need a practical embroidery version.',
    splitImage: { src: '/images/embroidery/embroidered-company-polo.webp', alt: 'Close-up of stitched logo embroidery on a polo' },
    quoteBody: 'Embroidery pricing depends on the garment, quantity, logo size, stitch count, number of locations, digitizing, thread colours, garment handling and required date. Thread colour is matched practically to the logo and garment.',
    faqs: [
      { id: 'embroidery-minimum', category: 'Embroidery', question: 'Is there a minimum embroidery order?', answer: 'Minimums depend on the garment, logo and setup. Send the quantity and logo so the practical options can be reviewed before quoting.' },
      { id: 'embroidery-hats', category: 'Embroidery', question: 'Can you embroider hats and beanies?', answer: 'Yes. Hats, caps, beanies and toques can be embroidered when the artwork is sized and simplified for the available area.' },
      { id: 'embroidery-jackets', category: 'Embroidery', question: 'Can you embroider jackets?', answer: 'Yes. Jacket embroidery depends on the fabric, lining, seams, pockets and access for the embroidery equipment.' },
      { id: 'embroidery-file', category: 'Embroidery', question: 'What file should I send?', answer: 'Send the best logo file you have, such as vector artwork, a PDF or a high-resolution image. We will review whether it needs cleanup before digitizing.' },
      { id: 'embroidery-digitizing', category: 'Embroidery', question: 'What is embroidery digitizing?', answer: 'Digitizing turns artwork into stitch instructions for the machine, including stitch direction, density, underlay, colour order and final size.' },
      { id: 'embroidery-colours', category: 'Embroidery', question: 'Can you match my logo colours?', answer: 'Thread colours can be matched closely in practical terms, but thread and fabric do not reproduce colour the same way as a screen.' },
      { id: 'embroidery-sizes', category: 'Embroidery', question: 'Can I mix garment sizes?', answer: 'Yes, mixed sizes are normal. The logo placement may still need to be confirmed for the garment style and size range.' },
      { id: 'embroidery-reorder', category: 'Embroidery', question: 'Can I reorder later?', answer: 'Usually, yes. Keeping the digitized logo, garment details and thread choices organized helps make later orders more consistent.' }
    ],
    ctaHeading: 'Send the logo and garment idea.',
    ctaBody: 'Include the quantity, logo location and required date. We will review the details and recommend the next step.',
    ctaPrimary: { label: 'Request an Embroidery Quote', href: '/contact/?service=embroidery#quote' },
    ctaSecondary: { label: 'Email Your Logo', href: 'mailto:info@affinitycreative.ca' },
    internalLinks: [
      { label: 'Compare embroidery with DTF and screen printing', href: '/blog/embroidery-dtf-screen-printing/' },
      { label: 'Explore custom apparel options', href: '/apparel/' }
    ]
  },
  {
    slug: 'vinyl-graphics',
    path: '/vinyl-graphics/',
    navTitle: 'Vinyl Graphics',
    navDescription: 'Vehicle decals, fleet graphics, storefront lettering and adhesive vinyl',
    seoTitle: 'Vinyl Graphics & Vehicle Decals GTA | Affinity Creative',
    seoDescription: 'Vinyl graphics, vehicle decals, fleet branding, storefront lettering and adhesive window vinyl for businesses across Toronto and the GTA.',
    eyebrow: 'Vinyl Graphics',
    heading: 'Vinyl Graphics for Vehicles, Windows and Storefronts.',
    body: 'Turn company vehicles, storefront glass and business surfaces into clear, recognizable advertising. Affinity Creative designs and produces vehicle decals, fleet graphics, window lettering and adhesive vinyl for businesses across Toronto and the GTA.',
    support: 'For vans, trucks, fleets, storefront windows, signs, trailers, toolboxes and business surfaces.',
    primaryAction: { label: 'Request a Vinyl Graphics Quote', href: '/contact/?service=vehicle-graphics#quote' },
    secondaryAction: { label: 'Call 437-313-1510', href: 'tel:+14373131510' },
    images: [
      { src: '/images/vehicle-graphics/vehicle-lettering.webp', alt: 'Commercial vehicle lettering and vinyl decals' },
      { src: '/images/signs/storefront-vinyl.webp', alt: 'Storefront window vinyl lettering for a business' },
      { src: '/images/vehicle-graphics/commercial-vehicle-wrap.webp', alt: 'Service vehicle with commercial vinyl graphics' }
    ],
    categoryHeading: 'Vinyl that fits the surface.',
    categoryIntro: 'Vehicle decals, storefront window vinyl and sign panels use different artwork decisions. Photos, dimensions and intended coverage help keep the quote useful.',
    categories: [
      { title: 'Vehicle Lettering', body: 'Simple cut-vinyl lettering for business names, phone numbers, websites, services and unit details.', image: { src: '/images/vehicle-graphics/vehicle-lettering.webp', alt: 'Vehicle lettering on a service vehicle' } },
      { title: 'Printed Decals', body: 'Full-colour decals for logos, door graphics, rear graphics and artwork that includes gradients or detailed colour.', image: { src: '/images/vehicle-graphics/partial-vehicle-wrap.webp', alt: 'Printed vehicle decal graphics' } },
      { title: 'Fleet Branding', body: 'Consistent logo, colour, typography and message across several vehicles, even when the models are not identical.', image: { src: '/images/vehicle-graphics/commercial-vehicle-wrap.webp', alt: 'Fleet vehicle vinyl graphics' } },
      { title: 'Storefront Window Vinyl', body: 'Logo, hours, service lists, door lettering, short-term campaign panels and permanent-looking storefront graphics.', image: { src: '/images/signs/storefront-vinyl.webp', alt: 'Storefront window vinyl lettering' } },
      { title: 'Adhesive Window Vinyl', body: 'Cut vinyl or printed vinyl for glass panels, doors and windows when privacy, promotion or identification is needed.', image: { src: '/images/window-graphics/storefront-window-graphics.webp', alt: 'Adhesive window vinyl for storefront glass' } },
      { title: 'Signs and Panels', body: 'Vinyl applied to coroplast, aluminum composite panels, directional signs and reception panels where suitable.', image: { src: '/images/signs/coroplast-signs.webp', alt: 'Vinyl graphics applied to sign panels' } },
      { title: 'Trailers and Equipment', body: 'Business decals for trailers, equipment, toolboxes and other surfaces that can support the material and installation.', image: { src: '/images/signs/vinyl-banners.webp', alt: 'Business surface prepared for vinyl graphics' } },
      { title: 'Window Graphics', body: 'Readable window lettering, QR codes where appropriate and clear rear layouts for vehicles or storefronts.', image: { src: '/images/window-graphics/storefront-window-graphics.webp', alt: 'Window lettering and vinyl graphics' } }
    ],
    splitHeading: 'Cut vinyl or printed vinyl?',
    splitBody: 'Cut vinyl is best for solid-colour lettering, logos, hours and simple shapes. Printed vinyl is best for full-colour graphics, gradients, photographs and more detailed artwork. The right choice depends on the surface, artwork, exposure and how the graphic needs to be read.',
    splitImage: { src: '/images/signs/storefront-vinyl.webp', alt: 'Cut vinyl and printed vinyl storefront graphics' },
    quoteBody: 'For vehicles, send the year, make, model, body style, photos of all sides, existing graphics, desired coverage, number of vehicles, logo files and required date. For storefronts, send straight photos, approximate dimensions, number of panels, interior or exterior application, existing vinyl, installation height, artwork and required date.',
    faqs: [
      { id: 'vinyl-decals-wrap', category: 'Vinyl Graphics', question: 'What is the difference between decals and a wrap?', answer: 'Decals usually cover selected areas such as doors, rear panels or windows. A wrap uses larger vinyl coverage and may involve more design, material and installation planning.' },
      { id: 'vinyl-full-wrap', category: 'Vinyl Graphics', question: 'Do I need a full vehicle wrap?', answer: 'Not always. Many businesses only need lettering, decals or a partial wrap to make the vehicle clear and professional.' },
      { id: 'vinyl-fleet', category: 'Vinyl Graphics', question: 'Can several fleet vehicles share one design?', answer: 'Yes. Several vehicle models can still look connected when the logo, colours, typography and layout rules stay consistent.' },
      { id: 'vinyl-storefront', category: 'Vinyl Graphics', question: 'Can vinyl be installed on storefront windows?', answer: 'Yes. Storefront windows can use cut vinyl, printed vinyl, door lettering, hours, services and campaign panels when the glass and installation details are suitable.' },
      { id: 'vinyl-removal', category: 'Vinyl Graphics', question: 'Can you remove old vinyl?', answer: 'Old vinyl may be removable depending on its age, material, surface, exposure and adhesive condition. Photos help identify what should be reviewed.' },
      { id: 'vinyl-files', category: 'Vinyl Graphics', question: 'What files do you need for vehicle graphics?', answer: 'Vector logo files are best, along with vehicle photos, dimensions and the year, make, model and body style.' },
      { id: 'vinyl-qr', category: 'Vinyl Graphics', question: 'Can the design include a QR code?', answer: 'Yes, when the size, viewing distance and destination make sense. The code should be tested before production.' },
      { id: 'vinyl-lifespan', category: 'Vinyl Graphics', question: 'How long does vinyl last?', answer: 'The useful life depends on the selected material, surface, exposure, installation and care. Product specifications are confirmed during quoting.' }
    ],
    ctaHeading: 'Show us the vehicle or surface.',
    ctaBody: 'Send photos, approximate dimensions, the logo and the level of coverage you have in mind. We will help narrow the vinyl and design direction.',
    ctaPrimary: { label: 'Request a Vinyl Graphics Quote', href: '/contact/?service=vehicle-graphics#quote' },
    ctaSecondary: { label: 'Call 437-313-1510', href: 'tel:+14373131510' },
    internalLinks: [
      { label: 'Explore broader signs and vehicle graphics', href: '/signs-vehicle-graphics/' },
      { label: 'Read vehicle graphics marketing tips', href: '/blog/vehicle-graphics-marketing/' },
      { label: 'Compare glass privacy film options', href: '/glass-finishes/' }
    ]
  }
]
