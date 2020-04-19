
import request from '@/utils/request'

const url = '/api/v1/articles'

export function addArticle(params) {
  return request({
    url: `${url}`,
    method: 'post',
    data: params
  })
}

export function deleteArticle(id) {
  return request({
    url: `${url}/${id}`,
    method: 'delete'
  })
}

export function editArticle(params) {
  return request({
    url: `${url}/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getArticle(id) {
  return request({
    url: `${url}/${id}`,
    method: 'get'
  })
}

export function getArticleList() {
  return request({
    url: url,
    method: 'get'
  })
}
