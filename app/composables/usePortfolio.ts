import portfolioContent from '../../content/portfolio.json'
import type { PortfolioCategory, PortfolioProject } from '../types/portfolio'

const projects = (portfolioContent as PortfolioProject[]).slice().sort((a, b) => a.displayOrder - b.displayOrder)

export function usePortfolio() {
  const featuredProjects = projects.filter((project) => project.featured)
  const categories: Array<PortfolioCategory | 'All'> = [
    'All',
    'Apparel',
    'Embroidery',
    'DTF',
    'Screen Print',
    'Business Print',
    'Signs',
    'Window Graphics',
    'Vehicle Graphics',
    'Websites',
    'Marketing'
  ]

  function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug)
  }

  function getProjectsByService(serviceTitle: string) {
    return projects.filter((project) => project.servicesUsed.includes(serviceTitle))
  }

  return {
    projects,
    featuredProjects,
    categories,
    getProjectBySlug,
    getProjectsByService
  }
}
