/**
 * Rule-based recommendation engine
 * Matches user answers to the best path
 */

import pathsData from '@/data/paths.json'
import productsData from '@/data/products.json'

export type Answers = {
  budget: 'low' | 'medium' | 'high'
  what_to_make: 'earrings' | 'bracelets' | 'necklaces' | 'mixed'
  speed: 'fast' | 'medium' | 'slow'
  goal: 'hobby' | 'gifts' | 'sell' | 'explore'
  time: 'under1' | '1to3' | '3plus'
  fear: 'wrong_stuff' | 'too_hard' | 'too_expensive' | 'too_much_stuff'
}

const paths = pathsData.paths as any[]
const products = productsData.products as any[]

export function recommendPath(answers: Answers): string {
  const { budget, speed, goal } = answers

  // Core rules from the plan
  if (budget === 'low' && speed === 'fast' && (goal === 'hobby' || goal === 'explore')) {
    return 'beading'
  }
  if (budget === 'low' && speed === 'fast' && goal === 'gifts') {
    return 'beading'
  }
  if (budget === 'medium' && speed === 'medium') {
    return 'wire-wrapping'
  }
  if (budget === 'high' || goal === 'sell' || answers.fear === 'too_hard') {
    return 'silver-curious'
  }
  if (budget === 'medium' && goal === 'explore') {
    return 'wire-wrapping'
  }

  // Default fallback
  return 'beading'
}

export function getPath(id: string) {
  return paths.find(p => p.id === id)
}

export function getPaths() {
  return paths
}

export function getProductsForPath(pathId: string) {
  const mustHave = products.filter(p => p.path_id === pathId && p.category === 'must-have' && !p.avoid)
  const niceToHave = products.filter(p => p.path_id === pathId && p.category === 'nice-to-have' && !p.avoid)
  const avoid = products.filter(p => p.path_id === pathId && p.category === 'avoid')

  return { mustHave, niceToHave, avoid }
}

export function estimateCost(pathId: string): string {
  const { mustHave, niceToHave } = getProductsForPath(pathId)
  const mustCost = mustHave.reduce((sum, p) => {
    const [lo, hi] = p.price_nok.split('-').map((s: string) => parseInt(s.replace(/\D/g, '')))
    return sum + (lo || 0)
  }, 0)
  return `${mustCost}+ kr`
}
