export interface Technique {
  id: string
  slug: string
  title: string
  accent: string
  summary: string
  explanation: string
  idealUses: string[]
  garments: string[]
  finish: string[]
  durability: string
  image: string
}

export interface Industry {
  id: string
  title: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

export interface ServiceArea {
  region: string
  areas: string[]
}

export interface HomeContent {
  hero: {
    eyebrow: string
    headline: string
    body: string
    trustLine: string
  }
  pillarsIntro: {
    eyebrow: string
    headline: string
    body: string
  }
  touchpoints: {
    headline: string
    body: string
    items: string[]
  }
  finalCta: {
    headline: string
    body: string
  }
}
