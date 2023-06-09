<template>
  <div>
    <h1>parameterSetting</h1>
    <el-card shadow="always">
      <!-- card body -->
      <el-form :model="form" label-width="80px" :inline="false" size="normal">
        <el-form-item label="企业名称">
          <el-input v-model="form.enterpriseName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">添加用户类型</el-button>
        </el-form-item>
        <el-form-item>
          <el-table :data="form.userType" border stripe>
            <el-table-column type="index" label="序号" width="80"> </el-table-column>
            <el-table-column prop="id" label="ID"> </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getParameterSetting } from '@/api/parameterSetting'
export default {
  data() {
    return {
      form: {},
    }
  },
  async created() {
    const { data } = await getParameterSetting()
    this.form = data
  },
}
</script>

<style></style>
