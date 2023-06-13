const Mock = require('mockjs')
// 生成任务列表数据
const generateTodoList = Mock.mock({
  'list|10': [
    {
      'id|+1': 1,
      title: '@ctitle',
      content: '@cparagraph(1,3)',
      createTime: '@datetime',
      updateTime: '@datetime',
      'done|1-2': true,
    },
  ],
})

// week图表
const weeklyWorkloadSummary = Mock.mock({
  list: {
    'xAxis|7': ['@date("MM-dd")'],
    'chartSeries|3': [
      {
        'data|7': ['@integer(0,20)'],
        type: 'line',
      },
    ],
  },
})

// month图表
const monthlyWorkloadSummary = Mock.mock({
  list: {
    'xAxis|30': ['@date("MM-dd")'],
    'chartSeries|3': [
      {
        'data|30': ['@integer(0,20)'],
        type: 'line',
      },
    ],
  },
})

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
          items: items,
        },
      }
    },
  },
  {
    url: '/dashboard/weeklyWorkloadSummary',
    type: 'get',
    response: config => {
      const items = weeklyWorkloadSummary.list
      return {
        code: 20000,
        data: items,
      }
    },
  },
  {
    url: '/dashboard/monthlyWorkloadSummary',
    type: 'get',
    response: config => {
      const items = monthlyWorkloadSummary.list
      return {
        code: 20000,
        data: items,
      }
    },
  },
]
