import request from '@/utils/request'

// parameterSetting

export function getParameterSetting() {
  return request({
    url: '/parameterSetting',
    method: 'get',
  })
}
