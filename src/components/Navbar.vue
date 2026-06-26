<template>
  <nav>
    <template v-if="isAuthenticated">
      <span>{{ user?.name }}</span>
      <button @click="logout">Cerrar sesión</button>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const user = computed(() => store.getters['auth/currentUser'])

async function logout() {
  await store.dispatch('auth/logout')
  router.push('/login')
}
</script>