import axios from 'axios'
import { getToken } from '@/utils/auth'
import qs from 'qs'
axios.interceptors.request.use(config => {
  if (config.url.includes('oauth')) {
    config.headers.Authorization = 'Basic d2ViQXBwOjEyMzQ1Ng=='
  } else {
    config.headers.Authorization = getToken()
  }
  return config
})
if (process.env.NODE_ENV == 'development') {
    // 本地调试地址
    // axios.defaults.baseURL = 'http://192.168.199.158:9923/';
    // axios.defaults.baseURL = 'http://192.168.199.158:9900/';
    // axios.defaults.baseURL = '/server';
    axios.defaults.baseURL = 'http://192.168.199.158:9900';
}else if (process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'http://boss.movevi.com:8721/';
}

export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
export function post(url,params){

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      contentType:'application/json',
      data:params
    }).then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err.data)
    });

  });
}
export function postForm(url,params){

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      contentType:'application/x-www-form-urlencoded',
      data:qs.stringify(params)
    }).then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err.data)
    });

  });
}
export function getVerify(){
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/sys/getVerify',
      withCredentials: true,
      responseType: 'blob',
      headers: {
        "request-type": "wap"
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
        reject(err.data)
    });
  });
}
export function getAccessToken(username,password) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `http://192.168.199.158:9900/api-uaa/oauth/token?grant_type=password&userType=USER_BACKEND&username=${username}&password=${password}`,
    }).then(res => {
          resolve(res.data);
      })
      .catch(err => {
        console.log(err)
          reject(err)
      })
  });
}

