/**
 * Composable: useSearchHistory
 * Historial local de ciudades buscadas/visitadas, persistido en localStorage.
 */
import { ref } from 'vue'

const STORAGE_KEY = 'weather_search_history'
const MAX_ITEMS = 10

// Estado compartido entre todos los componentes que usen este composable
const history = ref(loadHistory())

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
}

export function useSearchHistory() {
  /**
   * Agrega una ciudad al historial.
   * Si ya existe, la mueve al inicio (más reciente primero).
   */
  function addToHistory(city) {
    const exists = history.value.findIndex((c) => c.id === city.id)
    if (exists !== -1) history.value.splice(exists, 1)

    history.value.unshift({
      id: city.id,
      nombre: city.nombre,
      visitedAt: new Date().toISOString(),
    })

    // Mantener máximo MAX_ITEMS entradas
    if (history.value.length > MAX_ITEMS) {
      history.value = history.value.slice(0, MAX_ITEMS)
    }
    saveHistory()
  }

  /**
   * Elimina una ciudad del historial por id.
   */
  function removeFromHistory(cityId) {
    history.value = history.value.filter((c) => c.id !== cityId)
    saveHistory()
  }

  /**
   * Borra todo el historial.
   */
  function clearHistory() {
    history.value = []
    saveHistory()
  }

  return { history, addToHistory, removeFromHistory, clearHistory }
}
