import type { Component } from 'vue'
import { Files, MonitorCog, PanelsTopLeft, Shirt, Truck } from 'lucide-vue-next'

export interface ServiceMenuItem {
  title: string
  description: string
  to: string
  icon: Component
}

export interface FeaturedServiceLink {
  label: string
  to: string
}

export const serviceMenuItems: ServiceMenuItem[] = [
  {
    title: 'Custom Apparel',
    description: 'Embroidery, DTF, screen printing, hats and workwear',
    to: '/apparel/',
    icon: Shirt
  },
  {
    title: 'Business Print',
    description: 'Cards, flyers, brochures, posters and direct mail',
    to: '/business-print/',
    icon: Files
  },
  {
    title: 'Signs & Vehicle Graphics',
    description: 'Vinyl graphics, vehicle decals, wraps and fleet branding',
    to: '/signs-vehicle-graphics/',
    icon: Truck
  },
  {
    title: 'Glass Finishes',
    description: 'Frosted, dusted and patterned privacy films',
    to: '/glass-finishes/',
    icon: PanelsTopLeft
  },
  {
    title: 'Websites & Digital Marketing',
    description: 'Web design, SEO, Google Ads and social campaigns',
    to: '/digital-marketing/',
    icon: MonitorCog
  }
]

export const featuredServiceLinks: FeaturedServiceLink[] = [
  { label: 'Embroidery', to: '/embroidery/' },
  { label: 'Vinyl Graphics', to: '/vinyl-graphics/' }
]
