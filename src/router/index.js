import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store' 

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
{
path: '/',
name: 'home',
component: HomeView,
meta: { requiresAuth: true } 
},
{
path: '/Detalle/:id',
name: 'DetalleCiudad',
component: () => import('../views/DetailView.vue')
},
{
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: () => import('../views/FavoritosView.vue'),
    meta: { requiresAuth: true }
  },
]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router