<template>
  <el-table :data="tableData" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-table>
</template>

  <script>
export default {
  name: 'table-common',
  props: {
    /**
     * 表格数据
     * 传入示例：见官方链接
     * tableData = [
     *   {
     *     name: 'xxxx',
     *     age: 18,
     *     address: 'xxxx',
     *   }
     * ]
     */
    tableData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {}
  },
}
</script>