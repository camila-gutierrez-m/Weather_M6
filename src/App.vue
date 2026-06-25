<template>
  <header>
    <nav>
      <RouterLink to="/">Weather In Chile</RouterLink> |
      
    </nav>
  </header>


  <RouterView />
  </template>

<script setup>

</script>


<style scoped>
header {
  background-color: #35495e;
  padding: 1rem;
  text-align: center;
}

nav a {
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

main {
  padding: 2rem;
  display: flex;
  justify-content: center;
}
</style>
