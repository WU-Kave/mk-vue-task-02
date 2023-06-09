<template>
  <div>
    <h1>userInformation</h1>
    <el-card shadow="always">
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="userType" label="用户类型"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="80" align="center">
          <template v-slot="{ row }">
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getUserList } from '@/api/userInformation'

export default {
  data() {
    return {
      userList: [],
    }
  },
  async created() {
    const { data } = await getUserList()
    this.userList = data.items
  },
}
</script>

<style></style>
