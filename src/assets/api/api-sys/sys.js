
import request from './../axios'
import qs from 'qs'

// 系统目录
export function allMenuList(query) {
  return request({
    url: '/api-sys/sys/menu/treedata',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 系统目录
export function sysMenuList(query) {
  return request({
    url: '/api-sys/sys/menu/treedata?type=1',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 物业公司目录
export function saleMenuList(query) {
  return request({
    url: '/api-sys/sys/menu/treedata?type=2',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}

// 游戏目录
export function gameMenuList(query) {
  return request({
    url: '/api-sys/sys/menu/treedata?type=3',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}

// 直播目录
export function liveMenuList(query) {
  return request({
    url: '/api-sys/sys/menu/treedata?type=4',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}


// 新增 修改 菜单
export function addMenu(query) {
  return request({
    url: '/api-sys/sys/menu/save',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}

// 删除菜单
export function delMenu(query) {
  return request({
    url: '/api-sys/sys/menu/del?id='+query,
    method: 'POST',
  })
}

export function menuInfo(query) {
  return request({
    url: '/api-sys/sys/menu/edit?id='+query,
    method: 'get',
  })
}

// 字典列表
export function dictList(query) {
  return request({
    url: '/api-sys/sys/dict/query',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 新增 修改 字典
export function addDict(query) {
  return request({
    url: '/api-sys/sys/dict/save',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 删除 字典
export function delDict(query) {
  return request({
    url: '/api-sys/sys/dict/del?id='+query,
    method: 'post',
  })
}

// 用户列表
export function userList(query) {
  return request({
    url: '/api-sys/sys/user/query',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 添加 修改 用户
export function addUser(query) {
  return request({
    url: '/api-sys/sys/user/save',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}


// 检查用户名
export function checkAccount(query) {
  return request({
    url: '/api-sys/sys/user/checkAccount',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}

// 删除用户
export function delUser(query) {
  return request({
    url: '/api-sys/sys/user/remove',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 角色分配
export function saveAssign(query) {
  return request({
    url: '/api-sys/sys/user/saveAssign',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
export function getUserRole(query) {
  return request({
    url: '/api-sys/sys/user/treeRole/'+query,
    method: 'post'
  })
}
// 获取用户角色

// 部门列表
export function departList(query) {
  return request({
    url: '/api-sys/sys/department/getList',
    method: 'post',
    params:query
  })
}
// 添加 修改 部门
export function addDepart(query) {
  return request({
    url: '/api-sys/sys/department/save',
    method: 'post',
    params:query
  })
}
// 删除部门
export function delDepart(query) {
  return request({
    url: '/api-sys/sys/department/del/'+query,
    method: 'post'
  })
}

// 角色列表
export function roleList(query) {
  return request({
    url: '/api-sys/sys/role/query',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}
// 添加 修改 角色
export function addRole(query) {
  return request({
    url: '/api-sys/sys/role/save',
    method: 'post',
    params:query
  })
}
// 删除角色
export function delRole(query) {
  return request({
    url: '/api-sys/sys/role/del?id='+query,
    method: 'post'
  })
}

// 分配权限
export function setRole(query) {
  return request({
    url: '/api-sys/sys/role/setRoleMenu',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data:qs.stringify(query)
  })
}


// 获取角色权限
export function getRole(query) {
  return request({
    url: '/api-sys/sys/role/menuTree?id='+query,
    method: 'post'
  })
}


// 地区列表
export function getRegion(query) {
  return request({
    url: '/api-sys/sys/sysRegion/query',
    method: 'post',
    data:qs.stringify(query)
  })
}


// 地区列表
export function regionTree(query) {
  return request({
    url: '/api-sys/sys/sysRegion/queryTree',
    method: 'post',
    data:qs.stringify(query)
  })
}



// 授权管理
export function oauthClient(query) {
  return request({
    url: '/api-sys/sys/oauth/client/query',
    method: 'post',
    data:qs.stringify(query)
  })
}


// 跑步机更新
export function treadmillUpdate(query) {
  return request({
    url: '/api-sys/sys/treadmillUpdate/query',
    // url: '/api-sys/oauth/client/query',
    method: 'post',
    data:qs.stringify(query)
  })
}


// 固件更新
export function sysFirmwareUpdate(query) {
  return request({
    url: '/api-sys/sys/sysFirmwareUpdate/query',
    // url: '/api-sys/oauth/client/query',
    method: 'post',
    data:qs.stringify(query)
  })
}