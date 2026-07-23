import homepageContent from '../../content/homepage.json'
import navigationContent from '../../content/navigation.json'
import siteContent from '../../content/site.json'
import industriesContent from '../../content/industries.json'
import serviceAreasContent from '../../content/service-areas.json'
import type { HomeContent, Industry, ServiceArea } from '../types/content'
import type { NavigationItem, SiteSettings } from '../types/site'

export function useSiteContent() {
  return {
    site: siteContent as SiteSettings,
    navigation: navigationContent as NavigationItem[],
    homepage: homepageContent as HomeContent,
    industries: industriesContent as Industry[],
    serviceAreas: serviceAreasContent as ServiceArea[]
  }
}
