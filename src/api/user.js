import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/getUserInfo',
    method: 'get'
  })
}

export function getGithubUserInfo(data) {
  return request({
    url: '/api/github/userInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
