const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  loginTime: state => state.user.loginTime // 登录的时间戳
}
export default getters
