<template>
  <div>
    <h1>beTestedList</h1>
    <el-card shadow="always">
      <el-table :data="demandList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="projectName" label="项目名称"> </el-table-column>
        <el-table-column prop="id" label="需求Id"> </el-table-column>
        <el-table-column prop="number" label="需求编号"> </el-table-column>
        <el-table-column prop="module" label="模块"> </el-table-column>
        <el-table-column prop="describe" label="需求描述"> </el-table-column>
        <el-table-column prop="implementationPlan" label="实现方案"> </el-table-column>
        <el-table-column prop="scheduling" label="排程"> </el-table-column>
        <el-table-column prop="remarks" label="备注"> </el-table-column>
        <el-table-column prop="whichRoundOfTesting" label="第几轮测试"> </el-table-column>
        <el-table-column prop="testPassed" label="测试是否通过" align="center">
          <template slot-scope="scope">
            {{ scope.row.selfTestOrNot ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="testedBy" label="测试人"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template v-slot="{ row }">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">导出</el-button>
            <el-button type="primary" size="small">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getDemandList } from '@/api/beTestedList'

export default {
  data() {
    return {
      demandList: [],
    }
  },
  async created() {
    const { data } = await getDemandList()
    this.demandList = data.items
  },
}
</script>

<style></style>
