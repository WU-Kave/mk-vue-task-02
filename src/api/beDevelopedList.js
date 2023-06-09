import request from '@/utils/request'

// beDevelopedList

export function getDemandList() {
  return request({
    url: '/beDevelopedList/demandList',
    method: 'get',
  })
}
