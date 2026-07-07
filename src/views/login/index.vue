<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">
          <svg viewBox="0 0 48 48" width="48" height="48">
            <rect x="8" y="20" width="32" height="24" rx="2" fill="none" stroke="#1a5c8a" stroke-width="2.5"/>
            <path d="M16 20V14a8 8 0 0 1 16 0v6" fill="none" stroke="#1a5c8a" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="24" cy="32" r="3" fill="#1a5c8a"/>
            <path d="M24 35v3" stroke="#1a5c8a" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 class="system-title">集团司库管理系统</h2>
        <p class="system-subtitle">Group Treasury Management System</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <p>默认账号: admin / admin123</p>
        <p>&copy; 2026 公司名称. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

onMounted(() => {
  const remembered = localStorage.getItem('rememberedUser')
  if (remembered) {
    form.username = remembered
    form.remember = true
  }
})

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    await userStore.login({
      username: form.username,
      password: form.password,
      remember: form.remember,
    })
    ElMessage.success('登录成功')
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (err: any) {
    ElMessage.error(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0d2b4e 0%, #1a5c8a 50%, #2c6faa 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
}

.login-card {
  width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .logo-icon {
    margin-bottom: 16px;
  }

  .system-title {
    font-size: 24px;
    font-weight: 600;
    color: #1a5c8a;
    margin-bottom: 6px;
  }

  .system-subtitle {
    font-size: 12px;
    color: #909399;
    letter-spacing: 1px;
  }
}

.login-form {
  :deep(.el-input__wrapper) {
    border-radius: 8px;
    padding: 4px 12px;
  }

  :deep(.el-input__inner) {
    height: 42px;
  }
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #1a5c8a;
  border-color: #1a5c8a;

  &:hover {
    background-color: #1669a0;
    border-color: #1669a0;
  }
}

.login-footer {
  text-align: center;
  margin-top: 24px;

  p {
    font-size: 12px;
    color: #999;
    line-height: 1.8;
  }
}
</style>
