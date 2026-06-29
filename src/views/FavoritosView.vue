<script setup>
import { useRouter } from 'vue-router'
import { useSearchHistory } from '@/composables/useSearchHistory'
import { ciudades } from '@/data/ciudades'

const router = useRouter()
const { history, removeFromHistory, clearHistory } = useSearchHistory()

function formatDate(iso) {
  return new Date(iso).toLocaleString('es-CL', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  })
}

function goToCity(cityId) {
  router.push(`/detalle/${cityId}`)
}
</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>⭐ Historial de búsquedas</h2>
      <button
        v-if="history.length > 0"
        class="btn btn-outline-danger btn-sm"
        @click="clearHistory"
      >
        Limpiar historial
      </button>
    </div>

    <div v-if="history.length === 0" class="text-center text-muted mt-5">
      <p style="font-size: 3rem">🔍</p>
      <p>Aún no has visitado ninguna ciudad.<br />
        <RouterLink to="/">Ver ciudades disponibles</RouterLink>
      </p>
    </div>

    <div v-else>
      <div
        v-for="item in history"
        :key="item.id"
        class="card mb-2 p-3 d-flex flex-row justify-content-between align-items-center"
      >
        <div>
          <strong>{{ item.nombre }}</strong>
          <small class="text-muted d-block">Visitado: {{ formatDate(item.visitedAt) }}</small>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" @click="goToCity(item.id)">
            Ver clima
          </button>
          <button class="btn btn-outline-secondary btn-sm" @click="removeFromHistory(item.id)">
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
