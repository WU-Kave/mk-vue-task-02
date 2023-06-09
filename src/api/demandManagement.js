import request from '@/utils/request'

export function getPrductList() {
  return request({
    url: '/demandManagement/productList',
    method: 'get',
  })
}

export function getProjectList({ productID }) {
  return request({
    url: '/demandManagement/projectList',
    method: 'get',
    params: { productID },
  })
}

export function getDemandList() {
  return request({
    url: '/demandManagement/demandList',
    method: 'get',
  })
}

export function getTestTaskList() {
  return request({
    url: '/demandManagement/testTaskList',
    method: 'get',
  })
}

export function getBugList() {
  return request({
    url: '/demandManagement/bugList',
    method: 'get',
  })
}
