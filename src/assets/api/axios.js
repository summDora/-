import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import {Message} from 'element-ui'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import qs from 'qs'
import { initRouter } from "@/router";
import store from "@/store";
const router = initRouter(store.state.setting.asyncRoutes);
axios.defaults.timeout = 30000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// NProgress Configuration
NProgress.configure({
  showSpinner: false
})

// HTTPrequest拦截
axios.interceptors.request.use(config => {
    if (config.url.includes('oauth')) {
        config.headers.Authorization = 'Basic d2ViQXBwOjEyMzQ1Ng=='
    } else {
        config.headers.Authorization = getToken()
    }


  // 处理get 请求的数组 springmvc 可以处理
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }

  return config
}, error => {
  return Promise.reject(error)
})


// HTTPresponse拦截
axios.interceptors.response.use(res => {
  NProgress.done()
  const status = Number(res.status) || 200
  const message = res.data.msg || '系统未知错误,请反馈给管理员'

  if (status !== 200 || res.data.code === 1) {
    Message({
      message: message,
      type: 'error'
    })
    if (status == 500) {
      router.push('/login')
    }
    return Promise.reject(new Error(message))
  }
  return res
}, error => {
    NProgress.done()
    console.log(error)
  return Promise.reject(new Error(error))
})

if (process.env.NODE_ENV == 'development') {
    // 本地调试地址
    // axios.defaults.baseURL = '/server';
    axios.defaults.baseURL = 'http://192.168.199.158:9900';
}else if (process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'http://boss.movevi.com:8721/';
}

export default axios
