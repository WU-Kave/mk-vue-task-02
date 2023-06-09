const Mock = require('mockjs')

const parameterSetting = Mock.mock({
  'items|1': [
    // 表格: 项目名称   需求Id   需求编号  模块  需求描述  实现方案  排程  备注  第几轮测试(计算得出)  测试是否通过  测试人
    {
      enterpriseName: 'MK科技有限公司',
      userType: [
        {
          id: '@id',
          type: '实施',
        },
        {
          id: '@id',
          type: '测试',
        },
        {
          id: '@id',
          type: '开发',
        },
        {
          id: '@id',
          type: '产品经理',
        },
      ],
    },
  ],
})

module.exports = [
  {
    url: '/parameterSetting',
    type: 'get',
    response: config => {
      const items = parameterSetting.items
      return {
        code: 20000,
        data: items,
      }
    },
  },
]
