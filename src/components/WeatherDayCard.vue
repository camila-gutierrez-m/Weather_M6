<script setup>
import { ref, onMounted } from 'vue'

const weatherData = ref(null)
const loading = ref(true)
const error = ref(null)
class Ubicacion {
  #id;
  #nombre;
  #lat;
  #lon;
constructor(id, nombre, lat, lon) {
    this.#id     = id;
    this.#nombre = nombre;
    this.#lat    = lat;
    this.#lon    = lon;
  }
  get id()     { return this.#id; }
  get nombre() { return this.#nombre; }
  get lat()    { return this.#lat; }
  get lon()    { return this.#lon; }

}
const ubicacion = new Ubicacion(1, "Santiago", -33.45, -70.66);
const lat = ubicacion.lat;
const lon = ubicacion.lon;


// Construcción de la URL de la API
const url = `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max` +
      `&current_weather=true` +
      `&timezone=America%2FSantiago` +
      `&forecast_days=7`

onMounted(async () => {
  try {
    const response = await fetch(url)
    
    // Verificar si la respuesta es correcta
    if (!response.ok) {
      throw new Error('Error al obtener los datos meteorológicos')
    }
    
    const data = await response.json()
    weatherData.value = data.current_weather
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
toString() {
    return `${this.#nombre} (lat: ${this.#lat}, lon: ${this.#lon})`;
  }
}

class DiaClima {
  static #DIAS_ES = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

  constructor(fecha, min, max, viento, codigoWMO) {
    this.fecha  = fecha;
    this.dia    = DiaClima.#DIAS_ES[new Date(fecha + "T12:00:00").getDay()];
    this.min    = Math.round(min);
    this.max    = Math.round(max);
    this.viento = Math.round(viento);

    const { estado, icono } = DiaClima.#interpretarWMO(codigoWMO);
    this.estado = estado;
    this.icono  = icono;
  }

  static #interpretarWMO(code) {
    if (code === 0)  return { estado: "Despejado",            icono: "☀️"  };
    if (code <= 2)   return { estado: "Parcialmente nublado", icono: "⛅"  };
    if (code === 3)  return { estado: "Nublado",              icono: "☁️"  };
    if (code <= 49)  return { estado: "Neblina",              icono: "🌫️" };
    if (code <= 59)  return { estado: "Llovizna",             icono: "🌦️" };
    if (code <= 69)  return { estado: "Lluvia",               icono: "🌧️" };
    if (code <= 79)  return { estado: "Nieve",                icono: "❄️"  };
    if (code <= 84)  return { estado: "Chubascos",            icono: "🌨️" };
    if (code <= 99)  return { estado: "Tormenta",             icono: "⛈️" };
    return { estado: "Desconocido", icono: "🌡️" };
  }    
  }

</script>

<template>
<div class="card mb-2">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <span style="font-size:1.5rem">{{icono}}</span>
            <strong> {{dia}}</strong>
            <small class="text-muted d-block">{{fecha}}</small>
          </div>
          <div class="text-end">
            <p class="mb-0">{{min}}° / {{max}}°</p>
            <small class="text-muted">{{estado}} · 💨 {{viento}} km/h</small>
          </div>
        </div>
      </div>`;
  <div class="weather-container">
    <h2>Clima en Santiago (Macul)</h2>
    
    <div v-if="loading">Cargando clima...</div>
    
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="weatherData">
      <p>Temperatura: {{ weatherData.temperature }} °C</p>
      <p>Velocidad del viento: {{ weatherData.windspeed }} km/h</p>
    </div>
  </div>
</template>
