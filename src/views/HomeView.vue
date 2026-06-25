<script setup>
import { ref, onMounted } from "vue";
import { ciudades } from "@/data/ciudades";
import { useWeather } from "@/composables/useWeather";
import CityCard from "@/components/cityCard.vue";

const { fetchCityWeather } = useWeather();

const cities = ref([]);

onMounted(async () => {
  cities.value = await Promise.all(
    ciudades.map(c => fetchCityWeather(c))
  );
});
</script>

<template>
  <div class="row">
    <CityCard
      v-for="city in cities"
      :key="city.id"
      :city="city"
    />
  </div>
</template>
