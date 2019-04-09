import request from '@/utils/request'

export function talkList(data) {
  return request({
    url: '/talk/list',
    method: 'get',
    data: data
  })
}

export function talkInfo(data) {
    return request({
      url: '/talk/info',
      method: 'get',
      data: data
    })
  }

export function talkDel(data) {
  return request({
    url: '/talk/del',
    method: 'delete',
    data: data
  })
}

export function talkAdd(data) {
    return request({
      url: '/talk/add',
      method: 'post',
      data: data
    })
  }

export function talkUpdate(data) {
  return request({
    url: '/talk/update',
    method: 'post',
    data: data
  })
}