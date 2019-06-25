import request from '@/utils/request'

export function photoAlbumList(data) {
  return request({
    url: '/photo/albumList',
    method: 'get',
    data: data
  })
}

export function photoAlbumDel(data) {
  return request({
    url: '/photo/albumDel',
    method: 'delete',
    data: data
  })
}

export function photoAlbumAdd(data) {
  return request({
    url: '/photo/albumAdd',
    method: 'post',
    data: data
  })
}

export function photoAlbumUpdate(data) {
  return request({
    url: '/photo/albumUpdate',
    method: 'post',
    data: data
  })
}

export function photoList(data) {
  return request({
    url: '/photo/photoList',
    method: 'get',
    data: data
  })
}

export function photoAdd(data) {
  return request({
    url: '/photo/photoAdd',
    method: 'post',
    data: data
  })
}

export function photoDel(data) {
  return request({
    url: '/photo/photoDel',
    method: 'delete',
    data: data
  })
}
