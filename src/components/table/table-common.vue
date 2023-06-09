<template>
  <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" v-loading="loading" style="width: 100%">
    <!-- <el-table-column label="测试插槽" prop="date" sortable></el-table-column> -->
  </el-table>
</template>
  
  <script>
export default {
  name: 'MyTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
  