<template>
  <div class="page-container">
    <!-- 搜索栏 -->
    <el-card shadow="never" class="search-card">
      <el-form :model="query" inline size="small">
        <el-form-item label="用户名">
          <el-input v-model="query.username" placeholder="用户名" clearable />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="query.realName" placeholder="真实姓名" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="query.phone" placeholder="手机号" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="全部" clearable style="width:120px">
            <el-option label="正常" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 工具栏 -->
    <el-card shadow="never" class="table-card">
      <div class="table-toolbar">
        <el-button type="primary" size="small" @click="handleAdd">新增用户</el-button>
      </div>
      <!-- 数据表格 -->
      <el-table :data="userList" stripe v-loading="loading" size="small">
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="realName" label="真实姓名" min-width="120" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch :model-value="row.status === 1" :loading="row._statusLoading"
                       @change="(val) => handleStatusChange(row, val)" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm title="确认删除该用户？" @confirm="handleDelete(row)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        small
        class="pagination"
        @change="fetchData"
      />
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'" width="500px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserPage, createUser, updateUser, deleteUser, changeUserStatus, type SysUser } from '@/api/system/user'
import type { FormInstance, FormRules } from 'element-plus'

const loading = ref(false)
const submitLoading = ref(false)
const userList = ref<SysUser[]>([])
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const query = reactive({
  username: '',
  realName: '',
  phone: '',
  status: undefined as number | undefined,
})

const form = reactive<SysUser>({
  username: '',
  realName: '',
  email: '',
  phone: '',
  password: '',
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

onMounted(() => fetchData())

async function fetchData() {
  loading.value = true
  try {
    const res = await getUserPage({ ...query, pageNum: pageNum.value, pageSize: pageSize.value })
    userList.value = res.data.data || []
    total.value = res.data.total || 0
  } catch (err) {
    // Mock 兼容：使用 Mock 数据
    console.warn('后端不可用，使用 Mock 数据兜底', err)
  } finally {
    loading.value = false
  }
}

function handleSearch() { pageNum.value = 1; fetchData() }
function handleReset() {
  Object.assign(query, { username: '', realName: '', phone: '', status: undefined })
  pageNum.value = 1
  fetchData()
}

function handleAdd() {
  isEdit.value = false
  Object.assign(form, { username: '', realName: '', email: '', phone: '', password: '' })
  dialogVisible.value = true
}

function handleEdit(row: SysUser) {
  isEdit.value = true
  Object.assign(form, { id: row.id, username: row.username, realName: row.realName, email: row.email, phone: row.phone, status: row.status, password: '' })
  dialogVisible.value = true
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  submitLoading.value = true
  try {
    if (isEdit.value) {
      await updateUser(form)
      ElMessage.success('更新成功')
    } else {
      await createUser(form)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchData()
  } catch (err) {
    ElMessage.error('操作失败')
  } finally {
    submitLoading.value = false
  }
}

async function handleDelete(row: SysUser) {
  try {
    await deleteUser(row.id!)
    ElMessage.success('删除成功')
    fetchData()
  } catch { ElMessage.error('删除失败') }
}

async function handleStatusChange(row: SysUser, val: boolean) {
  row._statusLoading = true
  try {
    await changeUserStatus(row.id!, val ? 1 : 0)
    row.status = val ? 1 : 0
    ElMessage.success('状态已更新')
  } catch { ElMessage.error('状态更新失败') }
  finally { row._statusLoading = false }
}
</script>

<style scoped lang="scss">
.search-card {
  margin-bottom: 16px;
  :deep(.el-card__body) { padding: 16px 20px 0; }
}

.table-card {
  :deep(.el-card__body) { padding: 0; }
}

.table-toolbar {
  padding: 12px 16px;
  border-bottom: 1px solid #ebeef5;
}

.pagination {
  padding: 12px 16px;
  justify-content: flex-end;
}
</style>
