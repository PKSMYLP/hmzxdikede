import { loginApi } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    Token(state, payload) {
      state.token = payload
      setToken(payload)
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await loginApi(data)
      commit('Token', res)
    }
  }
}
