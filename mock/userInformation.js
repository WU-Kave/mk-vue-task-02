const Mock = require('mockjs')

const userList = Mock.mock({
  'items|10': [
    // ID 姓名 用户类型 手机号
    {
      id: '@id',
      name: '@cname(2,3)',
      'userType|1': ['实施', '测试', '开发', '产品经理'],
      phone: /1[35789]\d{9}/,
    },
  ],
})

module.exports = [
  {
    url: '/userInformation/userList',
    type: 'get',
    response: config => {
      const items = userList.items
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
