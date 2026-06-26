<script setup>
import { ref, onMounted } from "vue";
import { ciudades } from "@/data/ciudades";
import { useWeather } from "@/composables/useWeather";
import CityCard from "@/components/cityCard.vue";

const { fetchCityWeather } = useWeather();

const cities = ref([]);
const isLoading = ref(true); 

onMounted(async () => {
  try {
    
    const weatherPromises = ciudades.map(async (city) => {
      try {
        return await fetchCityWeather(city);
      } catch (error) {
        console.error(`Error cargando el clima para ${city}:`, error);
        return null; 
      }
    });

    const results = await Promise.all(weatherPromises);
    
  
    cities.value = results.filter(city => city !== null);
  } catch (error) {
    console.error("Error general al cargar las ciudades:", error);
  } finally {
    isLoading.value = false; 
  }
});
</script>

<template>
  <div class="row">
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando clima...</span>
      </div>
    </div>

    <template v-else>
      <CityCard
        v-for="city in cities"
        :key="city.id"
        :city="city"
      />
      <div v-if="cities.length === 0" class="text-center text-muted">
        No se pudo cargar el clima de ninguna ciudad.
      </div>
    </template>
  </div>
</template>