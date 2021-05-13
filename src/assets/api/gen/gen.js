

import request from './../axios'



export function fetchList(query) {
  return request({
    url: '/api-generator/generator/page',
    method: 'get',
    params: query
  })
}

export function preview(table) {
  return request({
    url: '/api-generator/generator/preview',
    method: 'get',
    params: table
  })
}

export function fetchDsList(query) {
  return request({
    url: '/api-generator/dsconf/page',
    method: 'get',
    params: query
  })
}

export function fetchSelectDsList() {
  return request({
    url: '/api-generator/dsconf/list',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api-generator/dsconf/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api-generator/dsconf/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api-generator/dsconf/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api-generator/dsconf/',
    method: 'put',
    data: obj
  })
}

export function handleDown(table) {
  return request({
    url: '/api-generator/generator/code',
    method: 'post',
    data: table,
    responseType: 'arraybuffer'
  }).then((response) => { // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/zip' })
    const filename = table.tableName + '.zip'
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }, 0)
  })
}


export function getForm(tableName, dsName) {
  return request({
    url: '/api-generator/form/info',
    params: { tableName: tableName, dsName: dsName },
    method: 'get'
  })
}

export function postForm(formInfo, tableName, dsId) {
  return request({
    url: '/api-generator/form/',
    method: 'post',
    data: Object.assign({ formInfo, tableName, dsId })
  })
}

