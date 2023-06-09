<template>
  <div>
    <h1>demandManagement</h1>
    <h1 @click="dialogVisible = true">
      {{ product.title ? product.title : '请选择产品' }} --
      {{ project.title ? project.title : '请选择项目' }}
    </h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="需求列表" name="demandList">
        <el-button type="primary" size="default" style="margin: 10px">添加</el-button>

        <el-table :data="demandList" border stripe>
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="id" label="ID" min-width="60"> </el-table-column>
          <el-table-column prop="requirementDescription" label="需求描述"> </el-table-column>
          <el-table-column prop="scheduling" label="排程" width="60" sortable> </el-table-column>
          <el-table-column prop="presenter" label="提出人"> </el-table-column>
          <el-table-column prop="proposedTime" label="提出时间" sortable> </el-table-column>
          <el-table-column prop="remarks" label="备注"> </el-table-column>
          <el-table-column prop="developmentResponsiblePerson" label="开发责任人"> </el-table-column>
          <el-table-column prop="testConclusion" label="测试结论"> </el-table-column>
          <el-table-column prop="creationTime" label="创建时间" sortable> </el-table-column>
          <el-table-column prop="creator" label="创建人"> </el-table-column>
          <el-table-column prop="testRegressionTimes" label="测试回归次数" sortable> </el-table-column>
          <el-table-column label="操作" fixed="right" width="160" align="center">
            <template v-slot="{ row }">
              <el-button type="danger" size="small">删除</el-button>
              <el-button type="primary" size="small">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="测试任务表" name="testTaskTable">
        <el-table :data="testTaskList" border stripe>
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="developer" label="开发人" width="60"> </el-table-column>
          <el-table-column prop="submissionTime" label="提交时间 sortable"> </el-table-column>
          <el-table-column prop="selfTestOrNot" label="是否自测" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.row.selfTestOrNot ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="testPassed" label="测试是否通过" align="center">
            <template slot-scope="scope">
              {{ scope.row.selfTestOrNot ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="problemDescription" label="问题描述"> </el-table-column>
          <el-table-column prop="remarks" label="备注"> </el-table-column>
          <el-table-column prop="testedBy" label="测试人" width="80"> </el-table-column>
          <el-table-column label="操作" fixed="right" width="160" align="center">
            <template v-slot="{ row }">
              <el-button type="danger" size="small">删除</el-button>
              <el-button type="primary" size="small">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="缺陷列表" name="defectList">
        <el-table :data="bugList" border stripe>
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="developer" label="开发人员" width="60"> </el-table-column>
          <el-table-column prop="tester" label="提出者"> </el-table-column>
          <el-table-column prop="discoveryTime" label="提出时间 sortable"> </el-table-column>
          <el-table-column prop="problemDescription" label="问题描述"> </el-table-column>
          <el-table-column prop="remarks" label="备注"> </el-table-column>
          <el-table-column label="操作" fixed="right" width="160" align="center">
            <template v-slot="{ row }">
              <el-button type="danger" size="small">删除</el-button>
              <el-button type="primary" size="small">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="项目资料" name="projectInformation">项目资料</el-tab-pane>
    </el-tabs>

    <el-dialog title="切换" :visible.sync="dialogVisible" width="60%">
      <el-form :model="form" ref="form" label-width="80px" :inline="true" size="normal">
        <el-form-item label="产品">
          <el-select v-model="product" placeholder="请选择产品" @change="refreshProjects" value-key="id">
            <el-option v-for="item in productList" :key="item.id" :label="item.title" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-select v-model="project" placeholder="请选择项目" :disabled="!product.id" value-key="id">
            <el-option v-for="item in projectList" :key="item.id" :label="item.title" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span></span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmProject">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPrductList, getProjectList, getDemandList, getTestTaskList, getBugList } from '@/api/demandManagement'
export default {
  data() {
    return {
      product: {},
      project: {},
      productList: [],
      projectList: [],
      dialogVisible: false,
      form: {},
      activeName: 'demandList',
      demandList: [],
      testTaskList: [],
      bugList: [],
    }
  },
  computed: {},
  async created() {
    let { data } = await getPrductList()
    this.productList = data.items
    this.getDemandList()
    this.getTestTaskList()
    this.getBugList()
  },
  methods: {
    confirmProject() {
      this.dialogVisible = false
      this.getDemandList()
    },
    // 获取需求列表并默认排序
    async getDemandList() {
      const { data } = await getDemandList()
      const scheduleLessThan0 = [],
        normalScheduling = []
      data.items.forEach(item => {
        if (item.scheduling < 0) {
          scheduleLessThan0.push(item)
        } else {
          normalScheduling.push(item)
        }
      })
      normalScheduling.sort((a, b) => {
        return new Date(b.creationTime) - new Date(a.creationTime)
      })
      this.demandList = [...normalScheduling, ...scheduleLessThan0]
    },
    async refreshProjects() {
      const { data } = await getProjectList(this.product.id)
      this.projectList = data.items
      this.getDemandList()
    },
    handleClick() {
      console.log('handleClick')
    },
    // 获取待测试任务列表
    async getTestTaskList() {
      const { data } = await getTestTaskList()
      this.testTaskList = data.items
    },
    // 获取待测试任务列表
    async getBugList() {
      const { data } = await getBugList()
      this.bugList = data.items
    },
  },
}
</script>

<style></style>
