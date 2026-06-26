<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Correo" required />
    <input v-model="password" type="password" placeholder="Contraseña" required />
    <p v-if="error" class="error">{{ error }}</p>
    <button type="submit" :disabled="loading">Ingresar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value })
    router.push('/')
  } catch (e) {
    error.value = 'Usuario o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>