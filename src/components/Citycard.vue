<script setup>
defineProps(["city"]);
const goBack = () => {
  router.push('/'); 
};
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

        <router-link
          class="btn btn-primary"
          :to="`/detalle/${city.id}`"
        >
          Detalle
        </router-link>
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