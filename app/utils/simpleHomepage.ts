export interface HomepageImage {
  src: string
  alt: string
}

export interface ServiceSection {
  number: string
  title: string
  body: string
  action: string
  href: string
  image: HomepageImage
}

export interface MethodSection {
  number: string
  title: string
  body: string
  image: HomepageImage
}

export interface SplitPanel {
  title: string
  body: string
  image: HomepageImage
}

export interface ProcessStep {
  number: string
  title: string
  body: string
}

export const heroImages = {
  main: {
    src: '/images/simple/custom-apparel.jpg',
    alt: 'Custom printed apparel hanging in a studio'
  },
  small: {
    src: '/images/simple/business-print.jpg',
    alt: 'Printed business materials arranged on a work table'
  }
} satisfies Record<string, HomepageImage>

export const serviceSections: ServiceSection[] = [
  {
    number: '01',
    title: 'Custom Apparel',
    body: 'T-shirts, polos, hoodies, jackets, workwear, hats and uniforms finished with embroidery, DTF or screen printing.',
    action: 'Ask about apparel',
    href: '/apparel/',
    image: {
      src: '/images/simple/custom-apparel.jpg',
      alt: 'Branded shirts and jackets on a clothing rack'
    }
  },
  {
    number: '02',
    title: 'Business Print',
    body: 'Business cards, flyers, brochures, menus, postcards, folders, stickers and direct-mail materials.',
    action: 'Ask about printing',
    href: '/business-print/',
    image: {
      src: '/images/simple/business-print.jpg',
      alt: 'Printed brochures and business cards for a company'
    }
  },
  {
    number: '03',
    title: 'Signs & Large Format',
    body: 'Coroplast signs, banners, storefront graphics, vehicle decals, wraps and fleet branding.',
    action: 'Ask about signs',
    href: '/signs-vehicle-graphics/',
    image: {
      src: '/images/simple/signs-large-format.jpg',
      alt: 'Modern storefront and office graphics'
    }
  },
  {
    number: '04',
    title: 'Web & Marketing',
    body: 'Business websites, landing pages, local SEO and campaign creative for Google, Facebook and Instagram.',
    action: 'Ask about digital',
    href: '/digital-marketing/',
    image: {
      src: '/images/simple/web-marketing.jpg',
      alt: 'Designer working on a website and campaign'
    }
  }
]

export const methodSections: MethodSection[] = [
  {
    number: '01',
    title: 'Embroidery',
    body: 'A clean stitched finish for polos, jackets, hats, work shirts and uniforms.',
    image: {
      src: '/images/homepage-methods/embroidery.png',
      alt: 'Embroidery machine stitching a logo'
    }
  },
  {
    number: '02',
    title: 'DTF Printing',
    body: 'Detailed full-colour printing for T-shirts, hoodies, gradients and smaller runs.',
    image: {
      src: '/images/homepage-methods/dtf.png',
      alt: 'DTF transfer being applied to fabric'
    }
  },
  {
    number: '03',
    title: 'Screen Printing',
    body: 'Bold, durable printing for events, teams, repeat orders and larger quantities.',
    image: {
      src: '/images/homepage-methods/screenprint.png',
      alt: 'Screen printing ink being pulled across a screen'
    }
  }
]

export const splitPanels: SplitPanel[] = [
  {
    title: 'For your team.',
    body: 'Uniforms and branded apparel that look professional on the job, at events and in front of customers.',
    image: {
      src: '/images/simple/team.png',
      alt: 'Custom apparel ready for a business team'
    }
  },
  {
    title: 'For your customers.',
    body: 'Print, signs and campaigns that make your business easier to notice, understand and remember.',
    image: {
      src: '/images/simple/business-print.jpg',
      alt: 'Printed marketing materials prepared for customers'
    }
  }
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell us what you need',
    body: 'Share the product, quantity, artwork and required date.'
  },
  {
    number: '02',
    title: 'Review the options',
    body: 'We help select the right material and production method.'
  },
  {
    number: '03',
    title: 'Approve the artwork',
    body: 'Review the layout before the project moves into production.'
  },
  {
    number: '04',
    title: 'Receive the finished work',
    body: 'Pickup or delivery details are confirmed with the quote.'
  }
]
