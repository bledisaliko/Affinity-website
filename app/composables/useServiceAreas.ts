import serviceAreasContent from '../../content/service-areas.json'
import type { ServiceArea } from '../types/content'

const serviceAreas = serviceAreasContent as ServiceArea[]

export function useServiceAreas() {
  const areaNames = serviceAreas.flatMap((group) => group.areas)

  return {
    serviceAreas,
    areaNames
  }
}
