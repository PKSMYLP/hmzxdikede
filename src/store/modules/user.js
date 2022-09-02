import { loginApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    loginTime: '' // 登录的时间
  },
  mutations: {
    Token(state, payload) {
      state.token = payload
      setToken(payload)
    },
    // 删除token
    removeToken(state) {
      state.token = null
      removeToken()
    },
    // 记录登录时间
    setLoginTime(state, time) {
      state.loginTime = time
    }
  },
  actions: {
    // 登录
    async login({ commit }, data) {
      const res = await loginApi(data)
      // console.log(res)
      commit('Token', res.data.token)
      commit('setLoginTime', +new Date())
    },
    // 退出
    logout({ commit }) {
      // 删除token
      commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
      // 删除用户资料
      // commit('removeUserInfo') // 删除用户信息
    }
  }
}
