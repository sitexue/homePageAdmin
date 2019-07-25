import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import qs from 'qs'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    /*if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }*/
    if (
      config.method === "get" ||
      config.method === "delete"
    ) {
      // 序列化
      config.params = config.data;
    }
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    if (response === 'errError: Request failed with status code 401') {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    const res = response.data
    if (res.status !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      if (res.status === 401) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.error('err' + error) // for debug
    if (error.response) {
      if (/^40\d$/.test(error.response.status)) {
        Message({
          message: error.response.statusText,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
