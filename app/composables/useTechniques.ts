import techniquesContent from '../../content/techniques.json'
import type { Technique } from '../types/content'

const techniques = techniquesContent as Technique[]

export function useTechniques() {
  function getTechniqueByTitle(title: string) {
    return techniques.find((technique) => technique.title === title)
  }

  return {
    techniques,
    getTechniqueByTitle
  }
}
