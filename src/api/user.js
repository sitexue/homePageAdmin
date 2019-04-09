import request from '@/utils/request'

export function userList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    data: data
  })
}

export function userDel(data) {
  return request({
    url: '/user/del',
    method: 'delete',
    data: data
  })
}

export function userUpdate(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data
  })
}