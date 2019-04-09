import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false

const upUrl = process.env.VUE_APP_BASE_API + '/upload/filesUpload'
const filePath = process.env.VUE_APP_BASE_URL

Vue.prototype.plus = {
  upUrl,
  filePath
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
