<template>
  <div>
    <h1>roleInformation</h1>
    <!-- 条件筛选 -->

    <!-- 操作栏 -->
    <el-button @click="handleAdd()" type="text" size="small">添加</el-button>
    <el-button @click="handleDelete()" type="text" size="small">删除</el-button>

    <!-- 表格 -->
    <base-table-common :tableData="tableData" v-loading="tableLoading">
      <base-table-column-common type="selection" width="60"></base-table-column-common>
      <base-table-column-common prop="date" label="日期" width="180"></base-table-column-common>
      <base-table-column-common prop="name" label="姓名" width="180"></base-table-column-common>
      <base-table-column-common prop="address" label="地址"></base-table-column-common>

      <base-table-column-common prop="address" label="地址"></base-table-column-common>

      <base-table-column-common fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </base-table-column-common>

    </base-table-common>

    <!-- 分页 -->
    <Pagination :total="pageObj.total" :page.sync="pageObj.pageData.page" :limit.sync="pageObj.pageData.pageSize" @pagination="fetchData" />

    <!-- 弹框 -->
    <dialog-common v-model="dialogValue"></dialog-common>
  </div>
</template>

<script>
import hanldeMixin from '@/components/Pagination/handle.js';
import { mockData } from './mockData.js';
export default {
  mixins: [hanldeMixin],
  data() {
    return {
      //dialog开关
      dialogValue: false,
      //表单数组数据
      tableData: [],
      //表单加载loading
      tableLoading: false,
      //分页对象
      pageObj: {
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
      mockData()
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
    //更新
    handleUpdate() {
      console.log(`handleUpdate`);
      this.dialogValue = true;
    },
    //删除
    handleDelete() {
      console.log(`handleDelete`)
    },
  },
}
</script>

<style></style>
