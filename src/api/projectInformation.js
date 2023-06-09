import request from '@/utils/request'

// projectInformation

export function getProjectList() {
  return request({
    url: '/projectInformation/projectList',
    method: 'get',
  })
}
