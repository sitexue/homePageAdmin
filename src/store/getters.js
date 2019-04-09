const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar || require('../assets/img/headimg.jpg'),
  name: state => state.user.name,
  level: state => state.user.level
}
export default getters
