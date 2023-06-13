<template>
  <div class="dashboard">
    <!-- 顶部导航栏 -->
    <el-header style="margin: 20px">
      <div class="user-info">
        <i class="el-icon-user"></i>
        <span>欢迎，{{ userName }}</span>
      </div>
    </el-header>
     <!-- 数据统计图 -->
     <el-main>
      <div class="chart-header">
        <h3 class="title">数据统计</h3>
        <el-radio-group v-model="chartType" size="mini" @change="handleChangeChartType">
          <el-radio-button label="today">今日</el-radio-button>
          <el-radio-button label="week">本周</el-radio-button>
          <el-radio-button label="month">本月</el-radio-button>
        </el-radio-group>
      </div>
      <el-card class="chart" shadow="hover">
        
          <!-- <el-chart :data="chartData" :settings="chartSettings" /> -->
          <el-row :gutter="200" class="panel">
            <el-col :span="8">
              <el-card body-style>
                <div></div>
                <div>
                <div>全部任务</div>
                <div>{{ todoList.length }}</div>
              </div>
              </el-card>
            
            </el-col>
            <el-col :span="8">
              <el-card body-style>
                <div>待办事项</div>
                <div>{{ todoList.filter(item=>!item.done).length }}</div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card body-style>
                <div>已完成事项</div>
                <div>{{ todoList.filter(item=>item.done).length }}</div>
            </el-card>
            </el-col>
          </el-row>
         
        
      </el-card>
    </el-main>
    <el-container style="height: auto">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px">
        <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>待办事项</span>
          </template>
          <el-menu-item index="1-1">全部</el-menu-item>
          <el-menu-item index="1-2">工作</el-menu-item>
          <el-menu-item index="1-3">生活</el-menu-item>
        </el-submenu> -->
          <el-menu-item index="0">
            <i class="el-icon-document-copy"></i>
            <span>全部事项</span>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-tickets"></i>
            <span>待办事项</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-check"></i>
            <span>已完成事项</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card shadow="always">
          <el-table :data="filteredTodoList" border stripe>
            <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="title" label="任务名称"> </el-table-column>
            <el-table-column prop="content" label="任务内容"> </el-table-column>
            <el-table-column prop="createTime" label="任务创建时间"> </el-table-column>
            <el-table-column prop="updateTime" label="任务更新时间"> </el-table-column>
            <el-table-column prop="done" label="任务是否完成" :formatter="formatterDone"> </el-table-column>
            <el-table-column label="操作" fixed="right" width="240" align="center">
              <template v-slot="scope">
                <el-button type="danger" size="small" @click="deleteListItem">删除</el-button>
                <el-button type="primary" size="small" @click="exportRow(scope.row)">导出</el-button>
                <el-button type="primary" size="small" @click="handleOpenDetail(scope.row)">明细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
     <!-- 明细对话框 -->
     <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="beforeClose">
      <span slot="title">{{ currentRow.title }}的详细信息</span>
      <el-form label-position="top">
        <el-form-item label="任务名称：">{{ currentRow.title }}</el-form-item>
        <el-form-item label="任务内容：">{{ currentRow.content }}</el-form-item>
        <el-form-item label="任务创建时间：">{{ currentRow.createTime }}</el-form-item>
        <el-form-item label="任务更新时间：">{{ currentRow.updateTime }}</el-form-item>
        <el-form-item label="任务是否完成：">{{ currentRow.done?'已完成':'未完成' }}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>


    <!-- 待办事项列表 -->
    <!-- <el-main>
      <div class="list-header">
        <h3 class="title">待办事项</h3>
        <el-input
          placeholder="搜索事项"
          v-model="searchValue"
          suffix-icon="el-icon-search"
          clearable
          @clear="resetSearch"
          @keyup.enter.native="handleSearch"
        />
      </div>
      <el-card class="todo-list" shadow="hover">
        <el-scrollbar>
          <el-row v-if="!isLoading && filteredTodoList.length === 0">
            <el-col :span="24">
              <div class="empty-todo">
                <i class="el-icon-s-flag"></i>
                <p>No Pending Items</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="24">
              <el-row v-for="(item, index) in filteredTodoList" :key="item.id">
                <el-col :span="1" class="icon">
                  <el-checkbox v-model="item.checked" @change="handleItemChange(item.id)" />
                </el-col>
                <el-col :span="19" class="title">
                  <div class="name">{{ item.name }}</div>
                  <div class="desc">{{ item.desc }}</div>
                </el-col>
                <el-col :span="4" class="action">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="completeItem(item.id)">标记为已完成</el-dropdown-item>
                      <el-dropdown-item @click="deleteItem(item.id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-card>
    </el-main> -->

    <!-- 已完成事项列表 -->
    <!-- <el-main>
      <div class="list-header">
        <h3 class="title">已完成事项</h3>
      </div>
      <el-card class="done-list" shadow="hover">
        <el-scrollbar>
          <el-row v-if="!isLoading && doneList.length === 0">
            <el-col :span="24">
              <div class="empty-done">
                <i class="el-icon-s-check"></i>
                <p>No Completed Items</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="24">
              <el-row v-for="(item, index) in doneList" :key="item.id">
                <el-col :span="1" class="icon">
                  <el-checkbox v-model="item.checked" @change="handleItemChange(item.id)" />
                </el-col>
                <el-col :span="19" class="title">
                  <div class="name">{{ item.name }}</div>
                  <div class="desc">{{ item.desc }}</div>
                </el-col>
                <el-col :span="4" class="action">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="deleteItem(item.id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-card>
    </el-main> -->
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import * as xlsx from 'xlsx'
import { mapGetters } from 'vuex'
import { fetchTodoList, completeTodoItem, deleteTodoItem } from '@/api/todo'
import { fetchDoneList, deleteDoneItem } from '@/api/done'
import { getMockChartData } from '@/utils/mockData'

export default {
  name: 'Dashboard',
  data() {
    return {
      //数字翻牌器
       allTasks: {number:[100],
       content:'{nt}个'},
        unfinishedTasks: 50,
        finishedTasks: 50,
      dialogVisible: false,
      currentRow: {},
      filteredTodoList: [],
      isLoading: true,
      userName: '张三',
      searchValue: '',
      todoList: [],
      doneList: [],
      chartData: [],
      chartType: 'today',
      chartSettings: {
        height: 300,
        margin: [16, 16],
        showLegend: false,
        showTooltip: true,
        xField: 'name',
        yField: 'value',
        meta: {
          name: {
            alias: '日期',
          },
          value: {
            alias: '事项数量',
          },
        },
      },
    }
  },
  created() {
    console.log('created测试数据')
    // console.log(this.filteredTodoList)
    this.filteredTodoList = this.todoList
  },
  computed: {
    // filteredTodoList(){
    //   console.log('计算属性测试数据1',this.todoListcopy1===null)

    // },
    ...mapGetters(['getToken']),
  },
  methods: {
    //查看表格每行内容明细
    handleOpenDetail(val){
      this.currentRow=val;
      this.dialogVisible = true;
    },
     // 关闭对话框前清空数据
     beforeClose(done) {
      this.currentRow = {};
      done();
    },
    //导出每行内容的方法
    exportRow(val) {
      console.log('测试xlsx',xlsx)
      //1,将指定的数据转换为二维数组
      console.log(val)
      let data = Object.keys(val).map(key=>[key,val[key]])
      console.log('data数据测试',data)
      //2，创建工作簿和工作表对象
      let wb = xlsx.utils.book_new()
      let ws = xlsx.utils.aoa_to_sheet(data)

      // 将工作表添加到工作簿中
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
       // 将工作簿转化为二进制流文件并保存至本地(简便易懂)
       let fileName = val.title+'.xlsx';
      xlsx.writeFile(wb, fileName);

      // // 将工作簿转换为二进制数据
      // let wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'binary' })

      // // 使用 file-saver 将二进制数据导出为文件
      // saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), val.title+'.xlsx')
    },

    // 定义一个辅助函数，用于将字符串转换为 ArrayBuffer 对象
    s2ab(s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
      return buf
    },
    //删除表格中能够数据的方法
    deleteListItem() {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 执行删除操作
          this.deleteAction()
        })
        .catch(() => {})
    },
    deleteAction() {
      // 执行删除操作的逻辑
      // ...
    },
    //格式化表格中任务是否完成的方法
    formatterDone(value) {
      console.log(value)
      console.log('formatter方法')
      return value.done ? '是' : '否'
    },
    //
    async fetchTodoList() {
      console.log('断点')
      console.log(await fetchTodoList())
      const { data } = await fetchTodoList()
      console.log(data)
      this.todoList = data.items
      // console.log(this.todoList)
      console.log('jiezhi')
      this.handleMenuSelect('0')
      // fetchTodoList().then((res) => {
      //     console.log("断点2")
      //     console.log(res)
      //     this.todoList = res.data.list.map((item) => {
      //       item.checked = false
      //       return item
      //     })
      //   })
      //   .finally(() => {
      //     this.isLoading = false
      //   })
    },
    fetchDoneList() {
      fetchDoneList()
        .then(res => {
          this.doneList = res.data.list.map(item => {
            item.checked = false
            return item
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    fetchChartData() {
      if (process.env.NODE_ENV === 'development') {
        this.chartData = getMockChartData(this.chartType)
      } else {
        // todo: 使用后端API获取统计数据
      }
    },
    handleMenuSelect(index) {
      console.log('menu selected:', index)
      // console.log(typeof(index))
      switch (index) {
        case '0':
          //显示所有任务列表
          this.filteredTodoList = this.todoList
          break
        case '1':
          console.log('case1')
          this.filteredTodoList = this.todoList.filter(item => !item.done)
          break
        case '2':
          this.filteredTodoList = this.todoList.filter(item => item.done)
          break
      }
    },
    handleSearch() {
      // 搜索事项
      console.log('search value:', this.searchValue)
    },
    resetSearch() {
      this.searchValue = ''
    },
    completeItem(id) {
      completeTodoItem(id)
        .then(res => {
          const itemIndex = this.todoList.findIndex(item => item.id === id)
          const item = this.todoList.splice(itemIndex, 1)[0]
          item.checked = true
          this.doneList.unshift(item)
        })
        .catch(err => {
          console.error('complete item failed:', err.message)
        })
    },
    deleteItem(id) {
      const isDone = this.doneList.findIndex(item => item.id === id) > -1
      if (isDone) {
        deleteDoneItem(id)
          .then(res => {
            const itemIndex = this.doneList.findIndex(item => item.id === id)
            this.doneList.splice(itemIndex, 1)
          })
          .catch(err => {
            console.log('delete done item failed:', err.message)
          })
      } else {
        deleteTodoItem(id)
          .then(res => {
            const itemIndex = this.todoList.findIndex(item => item.id === id)
            this.todoList.splice(itemIndex, 1)
          })
          .catch(err => {
            console.error('delete todo item failed:', err.message)
          })
      }
    },
    handleChangeChartType(type) {
      console.log('chart type changed:', type)
      this.fetchChartData()
    },
    handleItemChange(id) {
      // 更新事项状态，包括选中和取消选中
      const isDone = this.doneList.findIndex(item => item.id === id) > -1
      const list = isDone ? this.doneList : this.todoList
      const itemIndex = list.findIndex(item => item.id === id)
      list[itemIndex].checked = !list[itemIndex].checked
    },
  },
  mounted() {
    this.fetchTodoList()
    // this.fetchDoneList()
    // this.fetchChartData()
  },
}
</script>

<style scoped >
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;

  font-size: 14px;
  margin-left: 16px;
  & i {
    margin-right: 4px;
  }
}

.el-menu-vertical-demo {
  width: 200px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0;
  }
  & .el-input {
    width: 280px;
  }
}

.action {
  display: flex;
  justify-content: flex-end;
  & .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  & .el-dropdown-item {
    min-width: 80px;
  }
}

.empty-todo,
.empty-done {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #cccccc;
  font-size: 18px;
  & i {
    font-size: 48px;
    margin-right: 8px;
  }
  & p {
    margin: 0;
  }
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  & .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0;
  }
}
.chart-container {
  height: 100%;
  display: flex;
  justify-content: center;
}
.chart {
  padding: 20px;
  min-height: auto;
}
.panel>.el-col{
    text-align: center;
    font-size: 22px;
    font-weight: bolder;
  }

</style>
