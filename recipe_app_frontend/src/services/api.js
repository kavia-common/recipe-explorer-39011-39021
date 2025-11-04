import { mockRecipes } from '../data/mockRecipes.js'

const BASE = import.meta?.env?.VITE_API_BASE

/**
// PUBLIC_INTERFACE
 */
export async function fetchRecipes(searchTerm = '') {
  /** Fetch recipes from API or fall back to mock data.
   * Returns: Promise<Array<{id,title,image,summary,ingredients,steps}>>.
   */
  const usingMock = !BASE
  if (!BASE) {
    console.warn('[recipes] VITE_API_BASE not set. Using mock data.')
  }
  try {
    if (usingMock) {
      return simulateFilter(mockRecipes, searchTerm)
    }
    const url = `${BASE.replace(/\/$/, '')}/recipes${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.warn(`[recipes] API fetch failed, using mock data.`, err?.message || err)
    return simulateFilter(mockRecipes, searchTerm)
  }
}

/**
// PUBLIC_INTERFACE
 */
export async function fetchRecipeById(id) {
  /** Fetch single recipe from API or mock by id. */
  const usingMock = !BASE
  try {
    if (usingMock) {
      return mockRecipes.find(r => r.id === id) || null
    }
    const url = `${BASE.replace(/\/$/, '')}/recipes/${encodeURIComponent(id)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn(`[recipes] API detail failed, using mock.`, err?.message || err)
    return mockRecipes.find(r => r.id === id) || null
  }
}

function simulateFilter(list, q) {
  if (!q) return list
  const s = q.toLowerCase()
  return list.filter(
    r =>
      r.title.toLowerCase().includes(s) ||
      (r.summary || '').toLowerCase().includes(s) ||
      (r.ingredients || []).some(i => i.toLowerCase().includes(s)),
  )
}
