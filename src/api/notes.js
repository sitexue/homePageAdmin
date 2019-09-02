import request from '@/utils/request'

export function notesList(data) {
  return request({
    url: '/notes/list',
    method: 'get',
    data: data
  })
}

export function notesInfo(data) {
    return request({
      url: '/notes/info',
      method: 'get',
      data: data
    })
  }

export function notesDel(data) {
  return request({
    url: '/notes/del',
    method: 'delete',
    data: data
  })
}

export function notesAdd(data) {
    return request({
      url: '/notes/add',
      method: 'post',
      data: data
    })
  }

export function notesUpdate(data) {
  return request({
    url: '/notes/update',
    method: 'post',
    data: data
  })
}

export function exportFile(data) {
  return request({
    url: '/notes/exportFile',
    method: 'post',
    data: data
  })
}