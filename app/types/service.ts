export type ServiceCategory =
  | 'Apparel'
  | 'Decoration'
  | 'Business Print'
  | 'Signs'
  | 'Digital Marketing'

export interface Service {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: ServiceCategory
  heroHeading: string
  shortDescription: string
  fullDescription: string
  featuredImage: string
  gallery: string[]
  icon?: string
  benefits: string[]
  applications: string[]
  methods: string
  quoteNeeds: string[]
  quoteCopy: string
  combineWith: string[]
  nextStep: string
  relatedTechniques: string[]
  relatedFaqs: string[]
  featured: boolean
  displayOrder: number
  seoTitle: string
  metaDescription: string
}
