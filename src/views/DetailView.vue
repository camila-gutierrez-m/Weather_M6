<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ciudades } from '@/data/ciudades'
import { useWeather } from '@/composables/useWeather'
import { useSearchHistory } from '@/composables/useSearchHistory'

const route = useRoute()
const router = useRouter()
const { fetchCityWeather } = useWeather()
const { addToHistory } = useSearchHistory()

const city = ref(null)
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  const id = Number(route.params.id)
  const base = ciudades.find((c) => c.id === id)
  if (!base) {
    error.value = 'Ciudad no encontrada.'
    isLoading.value = false
    return
  }
  try {
    city.value = await fetchCityWeather(base)
    addToHistory(base) // registrar visita en historial
  } catch (e) {
    error.value = 'No se pudo cargar el clima. Intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container py-4">
    <button class="btn btn-outline-secondary mb-3" @click="router.back()">← Volver</button>

    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else-if="city">
      <div class="text-center mb-4">
        <div style="font-size: 5rem">{{ city.iconoActual }}</div>
        <h2>{{ city.nombre }}</h2>
        <p class="lead">{{ city.estadoActual }} · {{ city.tempActual }}°C</p>
        <p>💨 {{ city.vientoActual }} km/h</p>
      </div>

      <h5 class="mb-3">Pronóstico 7 días</h5>
      <div v-for="day in city.forecast" :key="day.fecha" class="card mb-2 p-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span style="font-size: 1.5rem" class="me-2">{{ day.icono }}</span>
            <strong class="text-capitalize">{{ day.dia }}</strong>
            <small class="text-muted d-block">{{ day.fecha }}</small>
          </div>
          <div class="text-end">
            <p class="mb-0 fw-bold">{{ day.min }}° / {{ day.max }}°</p>
            <small class="text-muted">{{ day.estado }} · 💨 {{ day.viento }} km/h</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
