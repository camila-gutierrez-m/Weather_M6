<template>
  <div class="card">
  <h3>{{ producto.nombre }}</h3>
    <p >$ {{ producto.precio }}</p>
    
  </div>
</template>

<script setup>
defineProps({
  producto: {
    type: Object,
    required: true,
  },
});
</script>
