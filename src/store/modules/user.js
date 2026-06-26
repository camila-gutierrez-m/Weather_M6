import api from '@/services/api'

export default {
  namespaced: true,
  state: () => ({
    favoritos: [],
    preferencias: { unidad: 'C', tema: 'claro' },
  }),
  mutations: {
    SET_FAVORITOS(state, lista) { state.favoritos = lista },
    SET_PREFERENCIAS(state, prefs) { state.preferencias = prefs },
  },
  actions: {
    async fetchFavoritos({ commit }) {
      const { data } = await api.get('/user/favoritos')
      commit('SET_FAVORITOS', data)
    },
    async fetchPreferencias({ commit }) {
      const { data } = await api.get('/user/preferencias')
      commit('SET_PREFERENCIAS', data)
    },
  },
}