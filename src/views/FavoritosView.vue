<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch('user/fetchFavoritos')
  store.dispatch('user/fetchPreferencias')
})


const favoritos = computed(() => store.state.user.favoritos)
const preferencias = computed(() => store.state.user.preferencias)
</script>

<template>
  <div>
    <h1>Mis favoritos</h1>
    <p>Unidad de temperatura: {{ preferencias.unidad }}</p>
    <ul>
      <li v-for="lugar in favoritos" :key="lugar.id">{{ lugar.nombre }}</li>
    </ul>
  </div>
</template>