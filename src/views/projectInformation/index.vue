<template>
  <div>
    <h1>projectInformation</h1>
    <el-card shadow="always">
      <el-table :data="projectList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="项目名"> </el-table-column>
        <el-table-column prop="projectCodeNumber" label="项目代码编号"> </el-table-column>
        <el-table-column prop="describe" label="项目描述"> </el-table-column>
        <el-table-column prop="remarks" label="备注"> </el-table-column>
        <el-table-column prop="developLeader" label="研发负责人"> </el-table-column>
        <el-table-column prop="testLeader" label="测试负责人"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="160" align="center">
          <template v-slot="{ row }">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getProjectList } from '@/api/projectInformation'

export default {
  data() {
    return {
      projectList: [],
    }
  },
  async created() {
    const { data } = await getProjectList()
    this.projectList = data.items
  },
}
</script>

<style></style>
