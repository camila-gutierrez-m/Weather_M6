# 🌤️ Portafolio M8 — Aplicación de Clima con Vue 3

Aplicación web para consultar el pronóstico meteorológico de ciudades de Chile, construida con Vue 3, Vite y Bootstrap 5. Consume la API pública de [Open-Meteo](https://open-meteo.com/) sin necesidad de registro ni API key.


## ✨ Características

- Consulta del clima actual y pronóstico a 7 días para múltiples ciudades chilenas
- Historial local de ciudades visitadas, persistido en `localStorage`
- Iconos y descripciones del estado del tiempo según código WMO
- Diseño responsivo con Bootstrap 5 (1, 2 o 3 columnas según pantalla)
- Sin autenticación ni backend propio — la app funciona de forma completamente autónoma
- Indicadores de carga (spinner) y manejo de errores en todas las vistas
- Navegación con Vue Router (SPA sin recarga de página)

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.2.47 | Framework principal (Composition API) |
| [Vite](https://vitejs.dev/) | ^3.2.10 | Bundler y servidor de desarrollo |
| [Vue Router 4](https://router.vuejs.org/) | ^4.1.6 | Enrutamiento SPA |
| [Bootstrap 5](https://getbootstrap.com/) | ^5.3.8 | Estilos y componentes UI |
| [Open-Meteo API](https://open-meteo.com/) | — | Datos meteorológicos (gratuita, sin key) |

> **Nota:** Vuex fue eliminado del proyecto. El estado se maneja con composables de Vue 3 y `localStorage` directamente.

---

## 📁 Estructura del proyecto

```
Protafolio M7/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js                        # Punto de entrada de la aplicación
    ├── App.vue                        # Componente raíz con navbar y RouterView
    │
    ├── assets/
    │   └── main.css                   # Estilos globales base
    │
    ├── components/
    │   ├── Citycard.vue               # Tarjeta de ciudad en el listado principal
    │   └── WeatherDayCard.vue         # Tarjeta de día individual (componente auxiliar)
    │
    ├── composables/
    │   ├── useWeather.js              # Lógica de consumo de la API del clima
    │   └── useSearchHistory.js        # Historial local de ciudades visitadas
    │
    ├── data/
    │   └── ciudades.js                # Listado estático de ciudades con coordenadas
    │
    ├── router/
    │   └── index.js                   # Definición de rutas de la aplicación
    │
    ├── services/
    │   └── openMeteo.js               # Constructor de URL para la API Open-Meteo
    │
    └── views/
        ├── HomeView.vue               # Vista principal: listado de todas las ciudades
        ├── DetailView.vue             # Vista de detalle de una ciudad (pronóstico 7 días)
        └── FavoritosView.vue          # Vista de historial de búsquedas locales
```

---

## 🚀 Instalación y ejecución

### Prerrequisitos

- [Node.js](https://nodejs.org/) versión 16 o superior
- npm (incluido con Node.js)

### Pasos

```bash
# 1. Clonar o descomprimir el proyecto
cd "Protafolio M7"

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173` (o el puerto que indique Vite en consola).

### Construcción para producción

```bash
npm run build
```

Los archivos optimizados quedarán en la carpeta `dist/`.

```bash
# Previsualizar el build de producción localmente
npm run preview
```

---

## 🏗️ Arquitectura y decisiones técnicas

### Composition API con `<script setup>`

Todos los componentes y vistas usan la sintaxis `<script setup>` de Vue 3, que reduce el boilerplate y mejora la legibilidad respecto a la Options API.

### Sin Vuex — estado con composables

El proyecto no utiliza Vuex. El estado se gestiona de dos formas:

- **Estado local** (`ref`, `reactive`) dentro de cada componente o vista.
- **Estado compartido** a través del composable `useSearchHistory`, que expone un `ref` reactivo al historial persistido en `localStorage`.

Este enfoque es más liviano y suficiente para la escala de la aplicación.

### Sin backend ni autenticación

La app consume directamente la API pública de Open-Meteo desde el cliente. No requiere servidor propio, base de datos ni sistema de login.

### Persistencia local

El historial de ciudades visitadas se guarda en `localStorage` bajo la clave `weather_search_history`, sobreviviendo a cierres y recargas del navegador.

---

## 🧩 Componentes

### `Citycard.vue`

Tarjeta que representa una ciudad en el listado principal.

**Props recibidas:**
| Prop | Tipo | Descripción |
|---|---|---|
| `city` | Object | Objeto con datos del clima de la ciudad |

**Propiedades esperadas en `city`:**
```js
{
  id: Number,
  nombre: String,
  iconoActual: String,       // Emoji del estado actual
  estadoActual: String,      // Descripción textual del estado
  tempActual: Number,        // Temperatura actual en °C
  vientoActual: Number,      // Viento actual en km/h
  forecast: Array            // Arreglo de días (ver useWeather)
}
```

**Comportamiento:** Al hacer clic en "Ver detalle", registra la ciudad en el historial y navega a `/detalle/:id`.

---

### `WeatherDayCard.vue`

Componente auxiliar que demuestra el uso de clases ES6 (`Ubicacion`, `DiaClima`) para modelar datos meteorológicos. Contiene datos de ejemplo hardcodeados y no está conectado a la API.

---

## 🔧 Composables

### `useWeather.js`

Encapsula la lógica de consulta a la API de Open-Meteo.

```js
import { useWeather } from '@/composables/useWeather'

const { fetchCityWeather, loading, error } = useWeather()

// Obtener datos del clima para una ciudad
const cityData = await fetchCityWeather({ id, nombre, lat, lon })
```

**Retorna:**
- `fetchCityWeather(city)` — función async que recibe un objeto ciudad y devuelve el objeto enriquecido con datos del clima
- `loading` — `ref<Boolean>` que indica si hay una petición en curso
- `error` — `ref<Error|null>` con el último error ocurrido

**Objeto devuelto por `fetchCityWeather`:**
```js
{
  // Datos originales de la ciudad
  id, nombre, lat, lon,

  // Clima actual
  tempActual: Number,        // °C redondeado
  vientoActual: Number,      // km/h redondeado
  estadoActual: String,      // "Despejado", "Lluvia", etc.
  iconoActual: String,       // Emoji correspondiente

  // Pronóstico 7 días
  forecast: [
    {
      fecha: String,         // "2026-06-25"
      dia: String,           // "miércoles"
      min: Number,           // °C mínima
      max: Number,           // °C máxima
      viento: Number,        // km/h
      estado: String,
      icono: String
    }
  ]
}
```

---

### `useSearchHistory.js`

Gestiona el historial local de ciudades visitadas con persistencia en `localStorage`.

```js
import { useSearchHistory } from '@/composables/useSearchHistory'

const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory()
```

**API:**

| Función / Propiedad | Descripción |
|---|---|
| `history` | `ref<Array>` reactivo con el historial (más reciente primero) |
| `addToHistory(city)` | Agrega o mueve una ciudad al inicio del historial |
| `removeFromHistory(cityId)` | Elimina una ciudad del historial por su `id` |
| `clearHistory()` | Borra todo el historial |

**Límite:** máximo 10 entradas. Las más antiguas se descartan automáticamente.

**Estructura de cada entrada en `history`:**
```js
{
  id: Number,
  nombre: String,
  visitedAt: String   // ISO 8601, ej: "2026-06-29T14:35:00.000Z"
}
```

---

## 📄 Vistas (Views)

### `HomeView.vue` — `/`

Vista principal. Carga en paralelo el clima de todas las ciudades definidas en `ciudades.js` usando `Promise.all`. Muestra un spinner mientras carga y una grilla responsiva de tarjetas `CityCard` al terminar.

**Flujo:**
1. `onMounted` dispara peticiones paralelas para todas las ciudades
2. Las ciudades que fallen se filtran silenciosamente (no rompen el resto)
3. Se renderiza la grilla con las ciudades exitosas

---

### `DetailView.vue` — `/detalle/:id`

Vista de detalle de una ciudad. Muestra el clima actual y el pronóstico de 7 días.

**Flujo:**
1. Obtiene el `id` de los params de la ruta
2. Busca la ciudad base en `ciudades.js`
3. Llama a `fetchCityWeather` y registra la visita en el historial
4. Maneja estados de carga, error y ciudad no encontrada
5. Botón "← Volver" usa `router.back()` para navegar al origen

---

### `FavoritosView.vue` — `/favoritos`

Vista del historial de ciudades visitadas. Lee del composable `useSearchHistory` y muestra las entradas ordenadas de más reciente a más antigua.

**Funcionalidades:**
- Ver todas las ciudades visitadas con fecha y hora
- Botón "Ver clima" para ir directamente al detalle
- Botón "✕" para eliminar una entrada individual
- Botón "Limpiar historial" para borrar todo
- Estado vacío cuando no hay historial

---

## 🌐 Servicios

### `openMeteo.js`

Construye la URL de consulta a la API de Open-Meteo.

```js
import { buildWeatherUrl } from '@/services/openMeteo'

const url = buildWeatherUrl(lat, lon)
// https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&daily=...
```

**Parámetros solicitados a la API:**
- `temperature_2m_max` y `temperature_2m_min` (pronóstico diario)
- `weathercode` (código WMO de condición climática)
- `windspeed_10m_max` (viento máximo diario)
- `current_weather` (clima actual)
- `forecast_days=7`
- `timezone=America/Santiago`

---

## 🗺️ Rutas de la aplicación

| Ruta | Nombre | Vista | Descripción |
|---|---|---|---|
| `/` | `home` | `HomeView` | Listado de todas las ciudades |
| `/detalle/:id` | `DetalleCiudad` | `DetailView` | Detalle y pronóstico de una ciudad |
| `/favoritos` | `favoritos` | `FavoritosView` | Historial de búsquedas locales |

---

## 📦 Historial de búsqueda local

El historial se almacena en `localStorage` bajo la clave `weather_search_history` como un array JSON. Es accesible entre sesiones del navegador y persiste aunque se cierre la pestaña.

```json
[
  { "id": 2, "nombre": "Santiago", "visitedAt": "2026-06-29T14:00:00.000Z" },
  { "id": 4, "nombre": "Temuco",   "visitedAt": "2026-06-29T13:45:00.000Z" }
]
```

Para limpiar el historial manualmente desde la consola del navegador:
```js
localStorage.removeItem('weather_search_history')
```

---

## 🌍 API utilizada

**Open-Meteo** — API meteorológica gratuita y de código abierto.

- Sitio oficial: [https://open-meteo.com](https://open-meteo.com)
- No requiere registro ni API key
- Límite de uso: 10.000 llamadas diarias (más que suficiente para uso personal)
- Datos basados en modelos de NOAA, ECMWF y Meteofrance

### Tabla de códigos WMO utilizados

| Código | Estado | Icono |
|---|---|---|
| 0 | Despejado | ☀️ |
| 1–2 | Parcialmente nublado | ⛅ |
| 3 | Nublado | ☁️ |
| 45–49 | Neblina | 🌫️ |
| 51–59 | Llovizna | 🌦️ |
| 61–69 | Lluvia | 🌧️ |
| 71–79 | Nieve | ❄️ |
| 80–84 | Chubascos | 🌨️ |
| 85–99 | Tormenta | ⛈️ |

---

## 🏙️ Ciudades disponibles

Definidas en `src/data/ciudades.js`:

| ID | Ciudad | Latitud | Longitud |
|---|---|---|---|
| 1 | San Antonio | -33.5928 | -71.6083 |
| 2 | Santiago | -33.4489 | -70.6693 |
| 3 | Rancagua | -34.1703 | -70.7400 |
| 4 | Temuco | -38.7342 | -72.6042 |
| 5 | Valparaíso | -33.0393 | -71.6170 |

Para agregar más ciudades, edita el archivo `src/data/ciudades.js` siguiendo el mismo formato:
```js
{ id: 6, nombre: "Concepción", lat: -36.8201, lon: -73.0444 }
```

---

## 📜 Scripts disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo con HMR
npm run build     # Genera el build optimizado para producción en /dist
npm run preview   # Sirve el build de producción localmente
```

---

## 📝 Notas de desarrollo

- El proyecto fue refactorizado para eliminar el sistema de autenticación (login/Vuex) que era innecesario para una app de clima pública.
- La gestión de estado global se simplificó usando composables de Vue 3 en lugar de Vuex, lo que reduce dependencias y complejidad.
- Todos los errores de red se manejan de forma silenciosa en el listado principal (las ciudades que fallan no rompen las demás) y de forma visible en la vista de detalle.

Repositorio: git clone https://github.com/camila-gutierrez-m/Weather_M6.git