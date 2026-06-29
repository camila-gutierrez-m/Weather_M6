<template>
  <header>
    <nav class="d-flex justify-content-between align-items-center px-3">
      <RouterLink to="/" class="brand">🌤️ Weather Chile</RouterLink>
      <RouterLink to="/favoritos" class="nav-link">⭐ Favoritos</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
</script>

<style scoped>
header {
  background-color: #9FA1FF;
  padding: 0.75rem 1rem;
}

.brand {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover,
.brand:hover {
  color: #e0e0ff;
}
</style>
