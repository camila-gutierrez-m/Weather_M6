import { ref } from "vue";
import { buildWeatherUrl } from "@/services/openMeteo";

function interpretarWMO(code) {
  if (code === 0) return { estado: "Despejado", icono: "☀️" };
  if (code <= 2) return { estado: "Parcialmente nublado", icono: "⛅" };
  if (code === 3) return { estado: "Nublado", icono: "☁️" };
  if (code <= 49) return { estado: "Neblina", icono: "🌫️" };
  if (code <= 59) return { estado: "Llovizna", icono: "🌦️" };
  if (code <= 69) return { estado: "Lluvia", icono: "🌧️" };
  if (code <= 79) return { estado: "Nieve", icono: "❄️" };
  if (code <= 99) return { estado: "Tormenta", icono: "⛈️" };
  return { estado: "Desconocido", icono: "🌡️" };
}

export function useWeather() {
  const loading = ref(false);
  const error = ref(null);

  async function fetchCityWeather(city) {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(buildWeatherUrl(city.lat, city.lon));
      const data = await res.json();

      const current = data.current_weather;
      const daily = data.daily;

      const forecast = daily.time.map((date, i) => {
        const wmo = interpretarWMO(daily.weathercode[i]);

        return {
          fecha: date,
          dia: new Date(date).toLocaleDateString("es-CL", { weekday: "long" }),
          min: Math.round(daily.temperature_2m_min[i]),
          max: Math.round(daily.temperature_2m_max[i]),
          viento: Math.round(daily.windspeed_10m_max[i]),
          estado: wmo.estado,
          icono: wmo.icono
        };
      });

      return {
        ...city,
        tempActual: Math.round(current.temperature),
        vientoActual: Math.round(current.windspeed),
        estadoActual: interpretarWMO(current.weathercode).estado,
        iconoActual: interpretarWMO(current.weathercode).icono,
        forecast
      };

    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return { fetchCityWeather, loading, error };
}