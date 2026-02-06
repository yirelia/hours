<template>
  <el-config-provider :locale="zhCn">
    <div class="hours-container">
    <!-- 左侧项目列表 -->
    <aside class="project-panel">
      <div class="panel-header">
        <h3 class="panel-title">项目列表</h3>
      </div>
      <div class="search-box">
        <el-input
          v-model="projectSearch"
          placeholder="搜索项目"
          clearable
          :prefix-icon="Search"
        />
      </div>
      <div class="project-list">
        <div
          v-for="project in filteredProjects"
          :key="project.value"
          :class="['project-item', { active: selectedProject === project.value }]"
          @click="handleSelectProject(project.value)"
        >
          <el-icon class="project-icon"><Folder /></el-icon>
          <span class="project-name">{{ project.label }}</span>
        </div>
        <div v-if="filteredProjects.length === 0" class="empty-tip">
          暂无匹配项目
        </div>
      </div>
    </aside>

    <!-- 右侧人员列表 -->
    <main class="member-panel">
      <div class="panel-header">
        <h3 class="panel-title">
          {{ selectedProjectName ? `${selectedProjectName} - 人员列表` : '人员列表' }}
        </h3>
        <div class="header-actions">
          <el-button type="success" @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
        </div>
      </div>

      <div class="filter-bar">
        <span class="filter-label">时间范围</span>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
      </div>

      <div class="member-content">
        <el-table
          :data="users"
          style="width: 100%"
          stripe
          v-loading="loading"
        >
          <el-table-column prop="projectName" label="项目名称" width="120" />
          <el-table-column prop="realname" label="人员" width="200" />
          <el-table-column prop="hours" label="总工时(人/天)" >
            <template #default="{ row }">
              <span>{{ (row.hours/ 8).toFixed(1) }}</span>
            </template>  
          </el-table-column>  
        </el-table>

      </div>
    </main>
  </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Download, Folder } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useAllProjects } from '@/entities/project'
import { ProjectUser } from '@/entities/project/model/types'
import { ProjectUserRequestDTO } from '@/entities/project/api/dto'

const { projectOptions, loadProjectAllUser, users } = useAllProjects()

const projectSearch = ref('')
const selectedProject = ref<number | null>(null)
const dateRange = ref<string[]>([])
const loading = ref(false)


interface ProjectOption {
  label: string
  value: number
}




// 过滤后的项目列表
const filteredProjects = computed(() => {
  const options = projectOptions() as ProjectOption[]
  if (!projectSearch.value) {
    return options
  }
  return options.filter(p =>
    p.label.toLowerCase().includes(projectSearch.value.toLowerCase())
  )
})

// 选中的项目名称
const selectedProjectName = computed(() => {
  const options = projectOptions() as ProjectOption[]
  const project = options.find(p => p.value === selectedProject.value)
  return project?.label || ''
})


// 选择项目
const handleSelectProject = (projectId: number) => {
  selectedProject.value = projectId
}


// 搜索
const handleSearch = async () => {
 await loadMembers()
}

// 加载人员列表
const  loadMembers = async () => {
  const paramm: ProjectUserRequestDTO = {
    projectId: selectedProject.value!,
    dateFrom: dateRange.value[0],
    dateTo: dateRange.value[1],
  }
  await loadProjectAllUser(paramm)
  console.log(users.value)
  debugger
}

// 导出
const handleExport = () => {
  ElMessage.success('导出成功')
}

onMounted(() => {
})
</script>

<style scoped>
.hours-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #F5F7FA;
}

/* 左侧项目面板 */
.project-panel {
  width: 280px;
  height: 100%;
  background-color: var(--background);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.search-box {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.project-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--foreground);
}

.project-item:hover {
  background-color: var(--muted);
}

.project-item.active {
  background-color: var(--primary);
  color: #fff;
}

.project-icon {
  font-size: 18px;
}

.project-name {
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-tip {
  text-align: center;
  color: var(--muted-foreground);
  padding: 40px 0;
  font-size: 14px;
}

/* 右侧人员面板 */
.member-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
}

.filter-label {
  font-size: 14px;
  color: var(--foreground);
  white-space: nowrap;
}

.member-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 8px;
  margin-top: auto;
}

.page-info {
  font-size: 14px;
  color: var(--muted-foreground);
}
</style>
