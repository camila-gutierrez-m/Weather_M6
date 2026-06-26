<script setup>
import { ref, onMounted } from "vue";

const weatherData = ref([]);
const loading = ref(true);
const error = ref(null);

class Ubicacion {
  #id;
  #nombre;
  #lat;
  #lon;

  constructor(id, nombre, lat, lon) {
    this.#id = id;
    this.#nombre = nombre;
    this.#lat = lat;
    this.#lon = lon;
  }

  get id() {
    return this.#id;
  }
  get nombre() {
    return this.#nombre;
  }
  get lat() {
    return this.#lat;
  }
  get lon() {
    return this.#lon;
  }

  toString() {
    return `${this.#nombre} (lat: ${this.#lat}, lon: ${this.#lon})`;
  }
}

class DiaClima {
  static #DIAS_ES = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  constructor(fecha, min, max, viento, codigoWMO) {
    this.fecha = fecha;

    this.dia = DiaClima.#DIAS_ES[new Date(fecha + "T12:00:00").getDay()];
    this.min = Math.round(min);
    this.max = Math.round(max);
    this.viento = Math.round(viento);

    const { estado, icono } = DiaClima.#interpretarWMO(codigoWMO);
    this.estado = estado;
    this.icono = icono;
  }

  static #interpretarWMO(code) {
    if (code === 0) return { estado: "Despejado", icono: "☀️" };
    if (code <= 2) return { estado: "Parcialmente nublado", icono: "⛅" };
    if (code === 3) return { estado: "Nublado", icono: "☁️" };
    if (code <= 49) return { estado: "Neblina", icono: "🌫️" };
    if (code <= 59) return { estado: "Llovizna", icono: "🌦️" };
    if (code <= 69) return { estado: "Lluvia", icono: "🌧️" };
    if (code <= 79) return { estado: "Nieve", icono: "❄️" };
    if (code <= 84) return { estado: "Chubascos", icono: "🌨️" };
    if (code <= 99) return { estado: "Tormenta", icono: "⛈️" };
    return { estado: "Desconocido", icono: "🌡️" };
  }
}

onMounted(() => {
  try {
    weatherData.value = [
      new DiaClima("2026-06-25", 11.5, 22.1, 14, 0),
      new DiaClima("2026-06-26", 13.0, 19.8, 25, 3),
      new DiaClima("2026-06-27", 9.2, 15.4, 10, 61),
    ];
  } catch (err) {
    error.value = "Error al cargar el clima";
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  console.log("Navegando al inicio...");
};
</script>

<template>

  <div class="container mt-4">
    <div v-if="loading" class="text-center text-muted">Cargando...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div
      v-else
      v-for="(clima, index) in weatherData"
      :key="index"
      class="card mb-3"
    >
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <span style="font-size: 1.5rem" class="me-2">{{ clima.icono }}</span>
          <strong>{{ clima.dia }}</strong>
          <small class="text-muted d-block">{{ clima.fecha }}</small>
        </div>
        <div class="text-end">
          <p class="mb-0">{{ clima.min }}° / {{ clima.max }}°</p>
          <small class="text-muted"
            >{{ clima.estado }} · 💨 {{ clima.viento }} km/h</small
          >
        </div>
      </div>
    </div>
  </div>
</template>
