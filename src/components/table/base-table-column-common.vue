<template>
  <el-table-column :type="type" :label="label" :prop="prop" :width="width" :min-width="minWidth" :fixed="fixed" show-overflow-tooltip>
    <slot />
  </el-table-column>
</template>
  <script>
export default {
  name: 'table-column-common',
  props: {
    type: {
      type: String,
      default: '',
    },
    fixed: {
      type: String,
      default: '', // [true, left, right]
    },
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    width: {
      type: String,
    },
    minWidth: {
      type: String,
      default: '120px',
    },
  },
}
</script>
  
<style scoped>
</style>
  
  
  