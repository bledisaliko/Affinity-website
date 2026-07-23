export interface ServiceQuoteStep {
  title: string
  description: string
}

export interface ServiceQuoteConfig {
  serviceName: string
  headline: string
  cta: string
  accent: string
  primaryOptions: string[]
  steps: [ServiceQuoteStep, ServiceQuoteStep, ServiceQuoteStep, ServiceQuoteStep, ServiceQuoteStep]
}

const configs: Record<string, ServiceQuoteConfig> = {
  apparel: {
    serviceName: 'Custom Apparel',
    headline: 'Plan your apparel order in minutes.',
    cta: 'Start My Apparel Quote',
    accent: '#7655d9',
    primaryOptions: ['T-shirts', 'Polos', 'Hoodies', 'Jackets', 'Workwear', 'Hats', 'Uniforms', 'Other apparel'],
    steps: [
      { title: 'Garment type', description: 'Choose every garment included in the order.' },
      { title: 'Quantity and size breakdown', description: 'A starting estimate is enough. Exact sizes can be confirmed later.' },
      { title: 'Decoration and artwork', description: 'Tell us how the garments should be branded and what artwork is available.' },
      { title: 'Decoration locations', description: 'Select where each logo, name or graphic should appear.' },
      { title: 'Deadline, delivery and contact', description: 'Share timing, delivery and the best way to reach you.' }
    ]
  },
  embroidery: {
    serviceName: 'Custom Embroidery',
    headline: 'Build an embroidery quote around the garment and stitch work.',
    cta: 'Request an Embroidery Quote',
    accent: '#7655d9',
    primaryOptions: ['Polos', 'Work shirts', 'Jackets', 'Hats and caps', 'Beanies and toques', 'Hoodies', 'Other garments'],
    steps: [
      { title: 'Garment and material', description: 'Tell us what will be embroidered and who supplies the garments.' },
      { title: 'Quantity and size breakdown', description: 'Estimate the pieces, sizes and number of designs.' },
      { title: 'Logo and digitizing', description: 'Share the logo file and embroidery details if you know them.' },
      { title: 'Location, size and thread', description: 'Select locations and thread preferences.' },
      { title: 'Deadline and contact', description: 'Share timing, delivery and the best way to reach you.' }
    ]
  },
  'business-print': {
    serviceName: 'Business Print',
    headline: 'Build a print quote with the right print details.',
    cta: 'Request Print Pricing',
    accent: '#d88400',
    primaryOptions: ['Business cards', 'Flyers', 'Postcards', 'Brochures', 'Door hangers', 'Posters', 'Booklets', 'Labels and stickers', 'Direct-mail pieces', 'Other print'],
    steps: [
      { title: 'Print product', description: 'Choose the printed piece you need priced.' },
      { title: 'Size, pages and material', description: 'Share the final size, pages and stock details if known.' },
      { title: 'Quantity and versions', description: 'Tell us quantity, versions and variable details.' },
      { title: 'Artwork and finishing', description: 'Upload artwork and select finishing options.' },
      { title: 'Deadline, delivery and contact', description: 'Share timing, delivery and the best way to reach you.' }
    ]
  },
  'signs-vehicle-graphics': {
    serviceName: 'Signs and Vehicle Graphics',
    headline: 'Show us the surface. We will plan the right coverage.',
    cta: 'Start a Graphics Quote',
    accent: '#ff7355',
    primaryOptions: ['Vehicle lettering', 'Vehicle decals', 'Partial wrap', 'Fleet graphics', 'Storefront graphics', 'Coroplast signs', 'Banners', 'Other graphics'],
    steps: [
      { title: 'Project type', description: 'Choose the graphic or sign project you need.' },
      { title: 'Dimensions and surface', description: 'Share approximate size, material and desired coverage.' },
      { title: 'Photos', description: 'Upload photos so scale and access can be reviewed.' },
      { title: 'Artwork, material and installation', description: 'Share artwork, material preferences and installation needs.' },
      { title: 'Deadline and contact', description: 'Share timing, location and the best way to reach you.' }
    ]
  },
  'vinyl-graphics': {
    serviceName: 'Vinyl Graphics',
    headline: 'Share the surface, size and artwork. We will plan the right vinyl solution.',
    cta: 'Request a Vinyl Graphics Quote',
    accent: '#ff7355',
    primaryOptions: ['Vehicle lettering', 'Printed decals', 'Fleet branding', 'Storefront window vinyl', 'Adhesive window vinyl', 'Signs and panels', 'Trailers and equipment', 'Other vinyl'],
    steps: [
      { title: 'Application', description: 'Choose where the vinyl graphics will be applied.' },
      { title: 'Dimensions and quantity', description: 'Share size, panel count and surface details.' },
      { title: 'Photos', description: 'Upload photos and describe existing conditions.' },
      { title: 'Artwork and coverage', description: 'Share artwork status, finish and installation needs.' },
      { title: 'Deadline and contact', description: 'Share timing, location and the best way to reach you.' }
    ]
  },
  'glass-finishes': {
    serviceName: 'Glass Finishes',
    headline: 'Measure the glass. Choose the finish. Get a clear quote.',
    cta: 'Request a Glass-Film Quote',
    accent: '#168b96',
    primaryOptions: ['Frosted privacy film', 'Decorative film', 'Printed window graphics', 'Safety markings', 'Office glass', 'Storefront glass', 'Residential glass', 'Other glass project'],
    steps: [
      { title: 'Glass project', description: 'Tell us what kind of glass finish project this is.' },
      { title: 'Glass dimensions', description: 'Add each panel size or provide an approximate square footage.' },
      { title: 'Photos and site condition', description: 'Upload room and glass photos so access can be reviewed.' },
      { title: 'Privacy goal and finish', description: 'Choose the privacy level and visual finish.' },
      { title: 'Installation and contact', description: 'Share location, timing and the best way to reach you.' }
    ]
  },
  'digital-marketing': {
    serviceName: 'Websites and Digital Marketing',
    headline: 'Get a tailored quote that drives results.',
    cta: 'Start My Digital Quote',
    accent: '#078aa2',
    primaryOptions: ['Business website', 'Landing page', 'Local SEO', 'Google Ads', 'Facebook and Instagram ads', 'Brand and campaign creative', 'Email campaign', 'Other digital service'],
    steps: [
      { title: 'Business offer', description: 'Tell us what the business sells and where it operates.' },
      { title: 'Target audience', description: 'Define who should see and act on the message.' },
      { title: 'Current online presence', description: 'Share links and what is or is not working now.' },
      { title: 'Services, goals and budget', description: 'Select the services, goals and budget range.' },
      { title: 'Brand assets, timeline and contact', description: 'Upload useful files and tell us when the work is needed.' }
    ]
  }
}

export function getServiceQuoteConfig(slug: string): ServiceQuoteConfig {
  return configs[slug] ?? configs['business-print']!
}
