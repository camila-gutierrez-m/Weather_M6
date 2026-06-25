export function buildWeatherUrl(lat, lon) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&current_weather=true&timezone=America%2FSantiago&forecast_days=7`;
  }