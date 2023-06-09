import request from '@/utils/request'

// productInformation

export function getPrductList() {
  return request({
    url: '/productInformation/productList',
    method: 'get',
  })
}

export function getPrductDetail(id) {
  return request({
    url: '/productInformation/productDetail',
    method: 'get',
    params: { id },
  })
}
