<template>
  <el-dialog :title="title" :visible.sync="selectValue" :width="width" @close="close" :modal="modal" :top="top">
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="ok">{{ oktitle }}</el-button>
    </span>
  </el-dialog>
</template>
  <script>
export default {
  props: {
    top: {
      type: String,
      default: '15vh',
    },
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示',
    },
    oktitle: {
      type: String,
      default: '确 定',
    },
    width: {
      type: String,
      default: '50%',
    },
    modal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectValue: false,
    }
  },
  watch: {
    selectValue(val, oldVal) {
      if (val != oldVal) {
        this.$emit('input', this.selectValue)
      }
    },
    value(val, oldVal) {
      if (val != oldVal) {
        this.selectValue = val
      }
    },
  },
  methods: {
    ok() {
      this.selectValue = false
      this.$emit('DialogOk')
    },
    cancel() {
      this.selectValue = false
      this.$emit('DialogCancel')
    },
    close() {
      this.selectValue = false
      this.$emit('DialogClose')
    },
  },
}
</script>