import servicesContent from '../../content/services.json'
import type { Service, ServiceCategory } from '../types/service'

const services = (servicesContent as Service[]).slice().sort((a, b) => a.displayOrder - b.displayOrder)

export function useServices() {
  const featuredServices = services.filter((service) => service.featured)
  const categories = Array.from(new Set(services.map((service) => service.category))) as ServiceCategory[]

  function getServiceBySlug(slug: string) {
    return services.find((service) => service.slug === slug)
  }

  function getServicesByCategory(category: ServiceCategory) {
    return services.filter((service) => service.category === category)
  }

  return {
    services,
    featuredServices,
    categories,
    getServiceBySlug,
    getServicesByCategory
  }
}
