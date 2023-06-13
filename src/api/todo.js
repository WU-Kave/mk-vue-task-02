import request from '@/utils/request'

export function fetchTodoList() {
  // return new Promise((resolve, reject) => {
  //   request({
  //     url:"/dashboard/tasks",
  //     method: 'get',
  //   })
  // })
  return request({
    url: '/dashboard/tasks',
    method: 'get',
  })
}
export function completeTodoItem() {}
export function deleteTodoItem() {}

export function getWeeklyWorkloadSummary() {
  return request({
    url: '/dashboard/weeklyWorkloadSummary',
    method: 'get',
  })
}

export function getMonthlyWorkloadSummary() {
  return request({
    url: '/dashboard/monthlyWorkloadSummary',
    method: 'get',
  })
}
