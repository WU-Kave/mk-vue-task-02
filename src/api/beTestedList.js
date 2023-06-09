import request from '@/utils/request'

// beTestedList

export function getDemandList() {
  return request({
    url: '/beTestedList/demandList',
    method: 'get',
  })
}
