import request from '@/utils/request'

const url = '/api/v1/users'

export function addUser(params) {
  return request({
    url: `${url}`,
    method: 'post',
    data: params
  })
}

export function deleteUser(id) {
  return request({
    url: `${url}/${id}`,
    method: 'delete'
  })
}

export function editUser(params) {
  return request({
    url: `${url}/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getUser(id) {
  return request({
    url: `${url}/${id}`,
    method: 'get'
  })
}

export function getUserList() {
  return request({
    url: url,
    method: 'get'
  })
}
