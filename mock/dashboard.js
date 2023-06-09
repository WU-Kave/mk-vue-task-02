const Mock = require('mockjs')
// 生成任务列表数据
const generateTodoList = Mock.mock({
      'list|10': [{
        'id|+1': 1,
        'title': '@ctitle',
        'content': '@cparagraph(1,3)',
        'createTime': '@datetime',
        'updateTime': '@datetime',
        'done|1-2': true
      }]
    })
  
  console.log(generateTodoList)
  
  module.exports = [
    {
      url: '/dashboard/tasks',
      type: 'get',
      response: config => {
        const items = generateTodoList.list
        return {
          code: 20000,
          data: {
            total: items.length,
            items: items
          }
        }
      }
    }
  ]