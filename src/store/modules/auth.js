export default {
  namespaced: true,
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
  mutations: {
    SET_USER(state, user) { state.user = user },
    SET_TOKEN(state, token) { state.token = token },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
    },
  },
  actions: {
    async login({ commit }, credentials) {
      
      const usuarios = [
        { email: 'camila@mail.com', password: '1234', name: 'Camila' },
        { email: 'test@mail.com', password: '1234', name: 'Test User' },
      ]

      const usuario = usuarios.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      )

      if (!usuario) {
        throw new Error('Usuario o contraseña incorrectos')
      }

      const fakeToken = 'token-' + usuario.email
      localStorage.setItem('token', fakeToken)
      localStorage.setItem('user', JSON.stringify(usuario))

      commit('SET_TOKEN', fakeToken)
      commit('SET_USER', usuario)
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      commit('CLEAR_AUTH')
    },
  },
}