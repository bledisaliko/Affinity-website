export interface SocialLink {
  label: string
  url: string
}

export interface SiteSettings {
  companyName: string
  domain: string
  phone: string
  phoneHref: string
  email: string
  emailHref: string
  address: string
  businessHours: string
  servingLine: string
  defaultOgImage: string
  socialLinks: SocialLink[]
  copyright: string
}

export interface NavigationItem {
  label: string
  href: string
  category?: string
}
