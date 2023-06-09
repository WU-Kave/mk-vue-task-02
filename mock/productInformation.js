const Mock = require('mockjs')

const productList = Mock.mock({
  'items|10': [
    //
    {
      id: '@id',
      name: '@ctitle(2,10)',
      describe: '@csentence(5,20)',
      remarks: '@csentence(5,30)',
    },
  ],
})

const productDetail = Mock.mock({
  'items|1': [
    //
    {
      id: '@id',
      name: '@ctitle(2,10)',
      describe: '@csentence(5,20)',
      remarks: '@csentence(5,30)',
      'projects|2-6': [
        {
          id: '@id',
          name: '@ctitle(2,10)',
        },
      ],
    },
  ],
})

module.exports = [
  {
    url: '/productInformation/productList',
    type: 'get',
    response: config => {
      const items = productList.items
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
    url: '/productInformation/productDetail',
    type: 'get',
    response: config => {
      const items = productDetail.items
      return {
        code: 20000,
        data: items,
      }
    },
  },
]
