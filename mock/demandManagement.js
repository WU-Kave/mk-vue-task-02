const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(2, 5)',
      'status|1': ['未开始', '商讨中', '进行中', '已完成'],
      author: 'name',
      display_time: '@datetime',
    },
  ],
})

const demandList = Mock.mock({
  'items|10': [
    // 需求编号，模块，需求描述，排程，提出人，提出时间，备注，开发责任人，测试结论，创建时间，创建人，测试回归次数
    {
      id: '@id',
      module: '@ctitle(2,5)',
      requirementDescription: '@csentence(5,20)',
      scheduling: '@integer(-2,4)',
      presenter: '@cname()',
      proposedTime: '@date()',
      remarks: '@csentence(5,30)',
      developmentResponsiblePerson: '@cname()',
      'testConclusion|1': ['通过', '不通过'],
      creationTime: '@date()',
      creator: '@cname()',
      testRegressionTimes: '@integer(0,10)',
    },
  ],
})

const testTaskList = Mock.mock({
  'items|10': [
    // 标题(第xxx轮测试)，开发人，提交时间，是否自测，测试是否通过，问题描述，备注 )， 测试人
    {
      title: '@cword(5,20)',
      developer: '@cname()',
      submissionTime: '@date()',
      selfTestOrNot: '@boolean()',
      testPassed: '@boolean()',
      problemDescription: '@csentence(5,20)',
      remarks: '@csentence(5,20)',
      testedBy: '@cname()',
    },
  ],
})

const bugList = Mock.mock({
  'items|10': [
    {
      title: '@cword(5,20)',
      developer: '@cname()',
      tester: '@cname()',
      discoveryTime: '@date()',
      problemDescription: '@csentence(5,20)',
      remarks: '@csentence(5,20)',
    },
  ],
})

module.exports = [
  {
    url: '/demandManagement/productList',
    type: 'get',
    response: config => {
      const items = data.items
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
    url: '/demandManagement/projectList',
    type: 'get',
    response: config => {
      const items = data.items
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
    url: '/demandManagement/demandList',
    type: 'get',
    response: config => {
      const items = demandList.items
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
    url: '/demandManagement/testTaskList',
    type: 'get',
    response: config => {
      const items = testTaskList.items
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
    url: '/demandManagement/bugList',
    type: 'get',
    response: config => {
      const items = bugList.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items,
        },
      }
    },
  },
]
