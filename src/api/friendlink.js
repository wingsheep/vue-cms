import request from '@/utils/request'

const url = '/api/v1/friendlinks'

export function addFriendlink(params) {
  return request({
    url: `${url}`,
    method: 'post',
    data: params
  })
}

export function deleteFriendlink(id) {
  return request({
    url: `${url}/${id}`,
    method: 'delete'
  })
}

export function editFriendlink(params) {
  return request({
    url: `${url}/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getFriendlink(id) {
  return request({
    url: `${url}/${id}`,
    method: 'get'
  })
}

export function getFriendlinkList() {
  return request({
    url: url,
    method: 'get'
  })
}
