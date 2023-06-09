import request from '@/utils/request'

export function fetchTodoList(){
  // return new Promise((resolve, reject) => {
  //   request({
  //     url:"/dashboard/tasks",
  //     method: 'get',
  //   })
  // })
   return  request({
    url:"/dashboard/tasks",
    method: 'get',
  })
}
export function completeTodoItem(){}
export function deleteTodoItem(){}
