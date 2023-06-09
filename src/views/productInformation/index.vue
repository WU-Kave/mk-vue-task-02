<template>
  <div>
    <h1>productInformation</h1>
    <el-card shadow="always">
      <el-table :data="productList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="name" label="产品名"> </el-table-column>
        <el-table-column prop="describe" label="产品描述"> </el-table-column>
        <el-table-column prop="remarks" label="备注"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template v-slot="{ row }">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">导出</el-button>
            <el-button type="primary" size="small" @click="handleOpenDetail(row)">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="" :visible.sync="dialogVisible" width="75%">
      <el-descriptions class="margin-top" title="产品明细" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small">添加项目</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label"> ID </template>
          {{ productDetail.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 产品名 </template>
          {{ productDetail.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 产品描述 </template>
          {{ productDetail.describe }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 备注 </template>
          {{ productDetail.remarks }}
        </el-descriptions-item>
      </el-descriptions>
      <h3>项目子表</h3>
      <el-table :data="productDetail.projects" border stripe>
        <el-table-column type="index" width="80"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="name"> </el-table-column>
      </el-table>

      <span></span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPrductList, getPrductDetail } from '@/api/productInformation'
export default {
  data() {
    return {
      productList: [],
      dialogVisible: false,
      productDetail: {},
    }
  },
  async created() {
    const { data } = await getPrductList()
    this.productList = data.items
  },
  methods: {
    async handleOpenDetail(row) {
      // console.log(row)
      const { data } = await getPrductDetail(row.id)
      this.productDetail = data
      this.dialogVisible = true
    },
  },
}
</script>

<style></style>
