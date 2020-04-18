import request from '@/utils/request'

const url = '/api/v1/sorts'

export function addSort(params) {
  return request({
    url: `${url}`,
    method: 'post',
    data: params
  })
}

export function deleteSort(id) {
  return request({
    url: `${url}/${id}`,
    method: 'delete'
  })
}

export function editSort(params) {
  return request({
    url: `${url}/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getSort(id) {
  return request({
    url: `${url}/${id}`,
    method: 'get'
  })
}

export function getSortList() {
  return request({
    url: url,
    method: 'get'
  })
}
