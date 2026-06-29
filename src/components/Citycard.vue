<script setup>
import { useRouter } from 'vue-router'
import { useSearchHistory } from '@/composables/useSearchHistory'

defineProps(['city'])

const router = useRouter()
const { addToHistory } = useSearchHistory()

function goToDetail(city) {
  addToHistory(city)
  router.push(`/detalle/${city.id}`)
}
</script>

<template>
  <div class="col g-4">
    <div class="card h-100 text-center">
      <div class="card-body">
        <div style="font-size: 3rem">{{ city.iconoActual }}</div>
        <h3>{{ city.nombre }}</h3>
        <p class="fw-bold">
          {{ city.forecast[0].min }}° / {{ city.forecast[0].max }}°
        </p>
        <p class="text-muted">{{ city.estadoActual }}</p>
        <p>💨 {{ city.vientoActual }} km/h</p>
        <button class="btn btn-primary" @click="goToDetail(city)">
          Ver detalle
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 20px;
  border-radius: 20px;
}
</style>
