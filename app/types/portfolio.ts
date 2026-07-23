export type PortfolioCategory =
  | 'Apparel'
  | 'Embroidery'
  | 'DTF'
  | 'Screen Print'
  | 'Business Print'
  | 'Signs'
  | 'Window Graphics'
  | 'Vehicle Graphics'
  | 'Websites'
  | 'Marketing'

export interface PortfolioProject {
  id: string
  slug: string
  title: string
  category: PortfolioCategory
  industry: string
  shortDescription: string
  fullDescription: string
  featuredImage: string
  gallery: string[]
  servicesUsed: string[]
  technique?: string
  location?: string
  featured: boolean
  displayOrder: number
  seoTitle: string
  metaDescription: string
}
