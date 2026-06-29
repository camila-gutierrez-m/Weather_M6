<script setup>
import { ref, onMounted } from 'vue'
import { ciudades } from '@/data/ciudades'
import { useWeather } from '@/composables/useWeather'
import CityCard from '@/components/Citycard.vue'  // fix: nombre de archivo exacto

const { fetchCityWeather } = useWeather()
const cities = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const results = await Promise.all(
      ciudades.map((city) =>
        fetchCityWeather(city).catch((e) => {
          console.error(`Error al cargar ${city.nombre}:`, e)
          return null
        })
      )
    )
    cities.value = results.filter(Boolean)
  } catch (e) {
    console.error('Error general al cargar ciudades:', e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container-fluid py-4">
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando clima...</span>
      </div>
    </div>

    <template v-else>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <CityCard v-for="city in cities" :key="city.id" :city="city" />
      </div>
      <div v-if="cities.length === 0" class="text-center text-muted mt-4">
        No se pudo cargar el clima de ninguna ciudad.
      </div>
    </template>
  </div>
</template>
