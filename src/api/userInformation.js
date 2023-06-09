import request from '@/utils/request'

// userInformation

export function getUserList() {
  return request({
    url: '/userInformation/userList',
    method: 'get',
  })
}
