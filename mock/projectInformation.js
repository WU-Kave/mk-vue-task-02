const Mock = require('mockjs')

const projectList = Mock.mock({
  'items|10': [
    //
    {
      id: '@id',
      name: '@ctitle(2,10)',
      projectCodeNumber: '@id',
      describe: '@csentence(5,20)',
      remarks: '@csentence(5,30)',
      developLeader: '@cname()',
      testLeader: '@cname()',
    },
  ],
})

module.exports = [
  {
    url: '/projectInformation/projectList',
    type: 'get',
    response: config => {
      const items = projectList.items
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
