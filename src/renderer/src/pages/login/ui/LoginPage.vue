<template>
  <div class="login-container">
    <!-- 左侧品牌区域 -->
    <div class="left-panel">
      <div class="brand-icon">
        <span class="brand-icon-text">⏱</span>
      </div>
      <h1 class="brand-title">工时统计系统</h1>
      <p class="brand-subtitle">高效管理团队工时，提升项目效率</p>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="right-panel">
      <div class="login-card">
        <h2 class="login-title">欢迎登录</h2>
        <p class="login-subtitle">请输入您的账号信息</p>

        <el-form
          ref="formRef"
          :model="loginForm"
          :rules="rules"
          class="login-form"
        >
          <el-form-item prop="username">
            <label class="form-label">用户名</label>
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
            />
          </el-form-item>

          <el-form-item prop="password">
            <label class="form-label">密码</label>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  username: 'simtek',
  password: 'Simtek123!$'
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        ElMessage.success('登录成功')
        router.push('/hours')
      } catch (error) {
        ElMessage.error('登录失败，请重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #F5F7FA;
}

.left-panel {
  width: 720px;
  height: 100%;
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.brand-icon {
  width: 80px;
  height: 80px;
  background-color: #FFFFFF;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand-icon-text {
  font-size: 40px;
}

.brand-title {
  color: #FFFFFF;
  font-size: 36px;
  font-weight: 600;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
}

.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
}

.login-card {
  width: 400px;
  padding: 40px;
  background-color: var(--card);
  border-radius: var(--radius-m);
  border: 1px solid var(--border);
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: var(--muted-foreground);
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 8px;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-input__wrapper) {
  height: 40px;
}
</style>
