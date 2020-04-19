import request from '@/utils/request'

const url = '/api/v1/labels'

export function addLabel(params) {
  return request({
    url: `${url}`,
    method: 'post',
    data: params
  })
}

export function deleteLabel(id) {
  return request({
    url: `${url}/${id}`,
    method: 'delete'
  })
}

export function editLabel(params) {
  return request({
    url: `${url}/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getLabel(id) {
  return request({
    url: `${url}/${id}`,
    method: 'get'
  })
}

export function getLabelList() {
  return request({
    url: url,
    method: 'get'
  })
}
