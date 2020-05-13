import request from '@/utils/request'

const url = '/api/v1/comments'

export function addComment(params) {
  return request({
    url: `${url}`,
    method: 'post',
    data: params
  })
}

export function deleteComment(id) {
  return request({
    url: `${url}/${id}`,
    method: 'delete'
  })
}

export function editComment(params) {
  return request({
    url: `${url}/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getComment(id) {
  return request({
    url: `${url}/${id}`,
    method: 'get'
  })
}

export function getCommentList(params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
