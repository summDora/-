import request from './../axios'

export function fetchList(query) {
  return request({
    url: '/api-generator/form/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/api-generator/form',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api-generator/form/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api-generator/form/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api-generator/form',
    method: 'put',
    data: obj
  })
}
