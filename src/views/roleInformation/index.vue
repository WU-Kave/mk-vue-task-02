<template>
  <div>
    <h1>roleInformation</h1>
    <!-- 条件筛选 -->

    <!-- 操作栏 -->

    <!-- 表格 -->
    <base-table-common :tableData="tableData" v-loading="tableLoading">
      <base-table-column-common type="selection" width="60"></base-table-column-common>
      <base-table-column-common prop="date" label="日期" width="180"></base-table-column-common>
      <base-table-column-common prop="name" label="姓名" width="180"></base-table-column-common>
      <base-table-column-common prop="address" label="地址"></base-table-column-common>
    </base-table-common>

    <!-- 分页 -->
    <Pagination v-show="true" :total="pageObj.total" :page.sync="pageObj.pageData.page" :limit.sync="pageObj.pageData.pageSize" @pagination="fetchData" />

    <!-- 弹框 -->
    <dialog-common v-model="dialogValue"></dialog-common>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogValue: false,
      tableData: [],
      tableLoading: false,
      //分页对象
      pageObj: {
        isShow: true,
        position: 'left', //分页组件位置
        total: 100,
        pageData: {
          page: 1,
          size: 10,
        },
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // mock get data from network
    fetchData() {
      this.tableLoading = true
      this.mockData()
        .then(res => {
          this.tableData = res.data
          //TODO 处理分页信息，total应该由后端给值
          const total = res.data.length
          this.handlePageTotal(total)
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    mockData() {
      return new Promise(resolve => {
        const tableData = [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ]
        const res = {
          code: 200,
          data: tableData,
          msg: 'success',
        }
        setTimeout(() => {
          resolve(res)
        }, 400)
      })
    },
    //分页处理
    handlePageTotal(totalCount) {
      this.pageObj.total = totalCount
    },
    //页码变化
    handleCurrentChange(e) {
      console.log('页码', e)
      this.pageObj.page = e
      // this.fetchData();
    },
    //条数变化
    handleSizeChange(e) {
      console.log('条数', e)
      this.pageObj.size = e
      this.pageObj.page = 1
      // this.fetchData();
    },
  },
}
</script>

<style></style>
