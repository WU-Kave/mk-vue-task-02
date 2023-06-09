<template>
  <el-table-column :type="type" :label="label" :prop="prop" :width="width" :min-width="minWidth" show-overflow-tooltip >
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
  
  
  