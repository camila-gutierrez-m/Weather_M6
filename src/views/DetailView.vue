<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ciudades } from "@/data/ciudades";
import { useWeather } from "@/composables/useWeather";

const route = useRoute();
const { fetchCityWeather } = useWeather();

const city = ref(null);

onMounted(async () => {
  const id = Number(route.params.id);
  const base = ciudades.find(c => c.id === id);
  city.value = await fetchCityWeather(base);
});
</script>

<template>
  <div v-if="city">
    <div class="text-center">
      <h2>{{ city.nombre }}</h2>
      <div style="font-size: 4rem">{{ city.iconoActual }}</div>
      <p>{{ city.estadoActual }} · {{ city.tempActual }}°C</p>
    </div>

    <div v-for="day in city.forecast" :key="day.fecha" class="card my-2 p-2">
      <strong>{{ day.dia }}</strong>
      <span>{{ day.min }} / {{ day.max }}°</span>
      <span>{{ day.estado }}</span>
    </div>
  </div>
</template>