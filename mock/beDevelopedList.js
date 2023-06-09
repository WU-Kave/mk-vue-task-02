const Mock = require('mockjs')

const demandList = Mock.mock({
  'items|10': [
    // 表格: 项目名称   需求Id   需求编号  模块  需求描述  实现方案  排程  备注  第几轮测试(计算得出)  测试是否通过  测试人
    {
      projectName: '@ctitle(2,10)',
      id: '@id',
      number: '@id',
      module: '@ctitle(2,8)',
      describe: '@csentence(5,20)',
      implementationPlan: '@csentence(5,30)',
      scheduling: '@integer(-2,4)',
      remarks: '@csentence(5,30)',
      whichRoundOfTesting: '@integer(0,20)',
      testPassed: '@boolean()',
      testedBy: '@cname()',
    },
  ],
})

module.exports = [
  {
    url: '/beDevelopedList/demandList',
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
]
