<template>
  <div class="hours-container">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="sidebar-logo-text">⏱</span>
        </div>
        <span class="sidebar-title">工时统计</span>
      </div>

      <nav class="nav-container">
        <div
          v-for="item in navItems"
          :key="item.key"
          :class="['nav-item', { active: activeNav === item.key }]"
          @click="activeNav = item.key"
        >
          <el-icon :size="20">
            <component :is="item.icon" />
          </el-icon>
          <span class="nav-text">{{ item.label }}</span>
        </div>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部栏 -->
      <header class="top-bar">
        <h1 class="page-title">工时查询</h1>
        <div class="user-info">
          <div class="user-avatar">
            <span>{{ userStore.userInfo?.name?.charAt(0) || '管' }}</span>
          </div>
          <span class="user-name">{{ userStore.userInfo?.name || '管理员' }}</span>
        </div>
      </header>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 查询条件卡片 -->
        <div class="query-card">
          <h3 class="query-title">查询条件</h3>
          <div class="query-row">
            <div class="query-field">
              <label class="field-label">项目</label>
              <el-select v-model="queryForm.project" placeholder="请选择项目" clearable>
                <el-option label="全部项目" value="" />
                <el-option label="项目A" value="projectA" />
                <el-option label="项目B" value="projectB" />
                <el-option label="项目C" value="projectC" />
              </el-select>
            </div>

            <div class="query-field">
              <label class="field-label">人员</label>
              <el-select v-model="queryForm.person" placeholder="请选择人员" clearable>
                <el-option label="全部人员" value="" />
                <el-option label="张三" value="zhangsan" />
                <el-option label="李四" value="lisi" />
                <el-option label="王五" value="wangwu" />
              </el-select>
            </div>

            <div class="query-field date-field">
              <label class="field-label">日期范围</label>
              <el-date-picker
                v-model="queryForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </div>

            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              查询
            </el-button>

            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </div>
        </div>

        <!-- 数据表格卡片 -->
        <div class="table-card">
          <div class="table-header">
            <h3 class="table-title">人员工时列表</h3>
            <el-button type="success" @click="handleExport">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </div>

          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
          >
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="department" label="部门" width="150" />
            <el-table-column prop="project" label="项目" width="180" />
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="hours" label="工时(h)" width="100" />
            <el-table-column prop="description" label="工作内容" min-width="200" />
            <el-table-column label="操作" width="120" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleView(row)">查看</el-button>
                <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <span class="page-info">共 {{ total }} 条记录，每页 {{ pageSize }} 条</span>
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="total"
              layout="prev, pager, next"
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Clock, TrendCharts, Setting, Search, Refresh, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/entities/user'

const userStore = useUserStore()

const activeNav = ref('hours')

const navItems = [
  { key: 'hours', label: '工时查询', icon: Clock },
  { key: 'report', label: '统计报表', icon: TrendCharts },
  { key: 'settings', label: '系统设置', icon: Setting }
]

const queryForm = reactive({
  project: '',
  person: '',
  dateRange: [] as string[]
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(128)

interface HoursRecord {
  id: string
  name: string
  department: string
  project: string
  date: string
  hours: number
  description: string
}

const tableData = ref<HoursRecord[]>([])

const generateMockData = (): HoursRecord[] => {
  const names = ['张三', '李四', '王五', '赵六']
  const departments = ['研发部', '产品部', '测试部', '设计部']
  const projects = ['项目A', '项目B', '项目C']
  const descriptions = [
    '完成模块开发',
    '需求分析与设计',
    '功能测试与验证',
    'UI界面优化'
  ]

  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    name: names[i % names.length],
    department: departments[i % departments.length],
    project: projects[i % projects.length],
    date: `2024-01-${String(10 + i).padStart(2, '0')}`,
    hours: 6 + (i % 3),
    description: descriptions[i % descriptions.length]
  }))
}

const handleSearch = () => {
  currentPage.value = 1
  tableData.value = generateMockData()
  ElMessage.success('查询成功')
}

const handleReset = () => {
  queryForm.project = ''
  queryForm.person = ''
  queryForm.dateRange = []
  handleSearch()
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleView = (row: HoursRecord) => {
  ElMessage.info(`查看: ${row.name} - ${row.date}`)
}

const handleEdit = (row: HoursRecord) => {
  ElMessage.info(`编辑: ${row.name} - ${row.date}`)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  tableData.value = generateMockData()
}

onMounted(() => {
  tableData.value = generateMockData()
})
</script>

<style scoped>
.hours-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #F5F7FA;
}

/* 侧边栏样式 */
.sidebar {
  width: 220px;
  height: 100%;
  background-color: #304156;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 60px;
  padding: 0 20px;
}

.sidebar-logo {
  width: 36px;
  height: 36px;
  background-color: var(--primary);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-logo-text {
  color: #FFFFFF;
  font-size: 18px;
}

.sidebar-title {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
}

.nav-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: rgba(64, 158, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(64, 158, 255, 0.2);
  color: var(--primary);
}

.nav-text {
  font-size: 14px;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--foreground);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-size: 14px;
}

.user-name {
  font-size: 14px;
  color: var(--foreground);
}

/* 内容区域样式 */
.content-area {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
}

.query-card {
  background-color: var(--background);
  border-radius: var(--radius-s);
  border: 1px solid var(--border);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.query-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.query-row {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.query-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
}

.query-field.date-field {
  width: 280px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
}

/* 表格卡片样式 */
.table-card {
  flex: 1;
  background-color: var(--background);
  border-radius: var(--radius-s);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  border-bottom: 1px solid var(--border);
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 20px;
}

.page-info {
  font-size: 14px;
  color: var(--muted-foreground);
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-date-editor) {
  width: 100%;
}
</style>
