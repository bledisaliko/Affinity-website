import faqsContent from '../../content/faqs.json'
import type { FaqItem } from '../types/content'

const faqs = faqsContent as FaqItem[]

export function useFaqs() {
  function getFaqsByIds(ids: string[]) {
    return ids
      .map((id) => faqs.find((faq) => faq.id === id))
      .filter((faq): faq is FaqItem => Boolean(faq))
  }

  function getFaqsByCategory(category: string) {
    return faqs.filter((faq) => faq.category === category)
  }

  return {
    faqs,
    getFaqsByIds,
    getFaqsByCategory
  }
}
