Protafolio M7 — Mejoras de Autenticación y Estado de Usuario
Resumen
Se integró un sistema de autenticación con estado global usando Vuex, rutas protegidas con Vue Router y personalización por usuario, sin necesidad de backend externo.

Cambios realizados
1. Instalación de Vuex
Se instaló Vuex 4 (compatible con Vue 3) como gestor de estado global:

npm install vuex@4
2. Store de autenticación (src/store/modules/auth.js)
Se creó un módulo Vuex que maneja el login, logout y persistencia de sesión en localStorage.

Login simulado con usuarios predefinidos (sin backend)
Token y usuario guardados en localStorage para persistir la sesión al recargar
Getters: isAuthenticated, currentUser
Usuarios de prueba:

Email	Contraseña
camila@mail.com	1234
test@mail.com	1234
3. Store principal (src/store/index.js)
Se configuró el store principal registrando el módulo auth:

import { createStore } from 'vuex'
import auth from './modules/auth'

export default createStore({
  modules: { auth }
})
4. Registro del store en la app (src/main.js)
Se importó y registró el store en la instancia de Vue:

import store from './store'
app.use(store)
5. Vista de Login (src/views/LoginView.vue)
Se creó un formulario de login con:

Campos de email y contraseña
Mensaje de error si las credenciales son incorrectas
Redirección automática al Home tras login exitoso
6. Rutas protegidas (src/router/index.js)
Se agregaron rutas nuevas y un guard de navegación global:

/login — Vista de login (pública)
/favoritos — Vista de favoritos (requiere autenticación)
/ — Home (requiere autenticación)
El guard redirige a /login si el usuario intenta acceder a una ruta protegida sin sesión activa:

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
Estructura de archivos agregados/modificados
src/
├── store/
│   ├── index.js          ← modificado
│   └── modules/
│       ├── auth.js       ← nuevo
│       └── user.js       ← nuevo
├── views/
│   ├── LoginView.vue     ← nuevo
│   └── FavoritosView.vue ← nuevo
├── router/
│   └── index.js          ← modificado
└── main.js               ← modificado
Flujo de autenticación
Usuario entra a la app
        ↓
¿Tiene token en localStorage?
   ↙ No              ↘ Sí
/login             /home (u otra ruta protegida)
   ↓
Ingresa credenciales
   ↓
¿Credenciales correctas?
   ↙ No              ↘ Sí
Muestra error     Guarda token + user en Vuex
                        ↓
                  Redirige a /home
🚀 Instalación y uso Clona el repositorio: git clone https://github.com/camila-gutierrez-m/Weather_M6.git
