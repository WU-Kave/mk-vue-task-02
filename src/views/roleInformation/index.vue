<template>
  <div>
    <h1>roleInformation</h1>
    <!-- 条件筛选 -->

    <!-- 操作栏 -->
    <el-button @click="handleAdd()" type="primary">添加</el-button>
    <el-button @click="handleDelete()" type="danger">删除</el-button>

    <!-- 表格 -->
    <base-table-common :tableData="tableData" v-loading="tableLoading">
      <base-table-column-common type="selection" width="60"></base-table-column-common>
      <base-table-column-common prop="date" label="日期" width="180"></base-table-column-common>
      <base-table-column-common prop="name" label="姓名" width="180"></base-table-column-common>
      <base-table-column-common prop="address" label="地址"></base-table-column-common>

      <base-table-column-common prop="address" label="地址"></base-table-column-common>

      <base-table-column-common fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="primary">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
        </template>
      </base-table-column-common>
    </base-table-common>

    <!-- 分页 -->
    <Pagination :total="total" :page.sync="pageParam.page" :limit.sync="pageParam.pageSize" @pagination="fetchData" />

    <!-- 弹框 -->
    <dialog-common v-model="dialogValue" :title="title"></dialog-common>
  </div>
</template>

<script>
import { mockData } from './mockData.js'
import { editTitle } from './dialog.js'
export default {
  data() {
    return {
      //dialog开关
      dialogValue: false,
      //表单数组数据
      tableData: [],
      //表单加载loading
      tableLoading: false,
      //分页对象
      total: 0,
      pageParam: {
        page: 1,
        size: 10,
      },
      //弹框标题
      title: '',
      //当前表单容器
      form: {},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // mock get data from network
    fetchData() {
      this.tableLoading = true
      const { page, size } = this.pageParam
      const pageParam = {
        page,
        size,
      }
      console.log("[pageParam]", pageParam)
      mockData()
        .then(res => {
          this.tableData = res.data
          //TODO 处理分页信息，total应该由后端给值
          this.total = res.data.length
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    //页码变化
    handleCurrentChange(e, cb) {
      console.log('页码', e)
      this.pageParam.page = e
      cb()
    },
    //条数变化
    handleSizeChange(e, cb) {
      console.log('条数', e)
      this.pageParam.size = e
      this.pageParam.page = 1
      cb()
    },
    //新增
    handleAdd() {
      editTitle.bind(this)('新增角色')
      this.dialogValue = true
    },
    //编辑
    handleUpdate() {
      editTitle.bind(this)('编辑角色')
      this.dialogValue = true
    },
    //删除
    handleDelete() {
      console.log(`handleDelete`)
    },
  },
}
</script>

<style></style>
