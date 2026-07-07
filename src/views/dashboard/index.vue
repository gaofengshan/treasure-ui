<template>
  <div class="dashboard">
    <div class="kpi-row">
      <el-card shadow="never" class="kpi-card">
        <div class="kpi-content">
          <div class="kpi-info">
            <span class="kpi-label">资金余额</span>
            <span class="kpi-value">¥ 1,286,500,000</span>
            <span class="kpi-trend up">↑ 2.3% 较昨日</span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 48 48" width="40" height="40">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#1a5c8a" stroke-width="2" opacity="0.3"/>
              <path d="M16 24h16M24 16v16" stroke="#1a5c8a" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="kpi-card">
        <div class="kpi-content">
          <div class="kpi-info">
            <span class="kpi-label">今日流入</span>
            <span class="kpi-value">¥ 86,320,000</span>
            <span class="kpi-trend up">↑ 5.1% 较昨日</span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 48 48" width="40" height="40">
              <path d="M24 36V12M12 24l12-12 12 12" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="kpi-card">
        <div class="kpi-content">
          <div class="kpi-info">
            <span class="kpi-label">今日流出</span>
            <span class="kpi-value">¥ 52,180,000</span>
            <span class="kpi-trend down">↓ 1.8% 较昨日</span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 48 48" width="40" height="40">
              <path d="M24 12v24M12 24l12 12 12-12" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="kpi-card">
        <div class="kpi-content">
          <div class="kpi-info">
            <span class="kpi-label">待审批</span>
            <span class="kpi-value">23</span>
            <span class="kpi-trend warning">⚠ 3 笔超时</span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 48 48" width="40" height="40">
              <rect x="8" y="12" width="32" height="28" rx="3" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.5"/>
              <path d="M16 12V8a4 4 0 0 1 16 0v4" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
              <circle cx="24" cy="28" r="2" fill="#f59e0b"/>
              <path d="M24 22v6" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </el-card>
    </div>

    <el-row :gutter="16" class="dashboard-row">
      <el-col :span="16">
        <el-card shadow="never" class="section-card">
          <template #header>
            <span class="section-title">近期交易</span>
          </template>
          <el-table :data="recentTransactions" stripe style="width: 100%" size="small">
            <el-table-column prop="date" label="日期" width="100" />
            <el-table-column prop="type" label="类型" width="80" />
            <el-table-column prop="amount" label="金额">
              <template #default="{ row }">
                <span :class="row.amount.startsWith('+') ? 'text-green' : 'text-red'">
                  {{ row.amount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="account" label="对方账户" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.status === '已完成' ? 'success' : 'warning'" size="small">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="section-card">
          <template #header>
            <span class="section-title">待办事项</span>
          </template>
          <div v-for="item in todoList" :key="item.title" class="todo-item">
            <div class="todo-left">
              <el-tag :type="item.tag" size="small" effect="plain">{{ item.badge }}</el-tag>
              <span class="todo-title">{{ item.title }}</span>
            </div>
            <span class="todo-time">{{ item.time }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const recentTransactions = [
  { date: '2026-07-07', type: '收款', amount: '+¥ 5,200,000', account: '中国银行-北京分行', status: '已完成' },
  { date: '2026-07-07', type: '付款', amount: '-¥ 1,800,000', account: '工商银行-上海支行', status: '已完成' },
  { date: '2026-07-06', type: '上收', amount: '+¥ 12,000,000', account: '建设银行-总行', status: '已完成' },
  { date: '2026-07-06', type: '付款', amount: '-¥ 3,500,000', account: '农业银行-广州分行', status: '审批中' },
  { date: '2026-07-05', type: '收款', amount: '+¥ 8,000,000', account: '中国银行-深圳分行', status: '已完成' },
]

const todoList = [
  { title: '资金上收审批 - 子公司A', badge: '审批', tag: 'warning' as const, time: '10分钟前' },
  { title: '大额支付复核 - ¥1,800,000', badge: '复核', tag: 'danger' as const, time: '30分钟前' },
  { title: '银行余额对账 - 中国银行', badge: '对账', tag: 'info' as const, time: '1小时前' },
  { title: '资金预算执行报告', badge: '报告', tag: 'success' as const, time: '2小时前' },
]
</script>

<style scoped lang="scss">
.dashboard {
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 16px;
  }

  .kpi-card {
    border-radius: 8px;
    :deep(.el-card__body) { padding: 20px; }
  }

  .kpi-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .kpi-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .kpi-label {
    font-size: 13px;
    color: #909399;
  }

  .kpi-value {
    font-size: 24px;
    font-weight: 700;
    color: #303133;
  }

  .kpi-trend {
    font-size: 12px;
    &.up { color: #22c55e; }
    &.down { color: #ef4444; }
    &.warning { color: #f59e0b; }
  }

  .kpi-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .dashboard-row {
    margin-top: 0;
  }

  .section-card {
    border-radius: 8px;
    margin-bottom: 16px;

    .section-title { font-size: 15px; font-weight: 600; }
  }

  .text-green { color: #22c55e; }
  .text-red { color: #ef4444; }

  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child { border-bottom: none; }

    .todo-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .todo-title {
      font-size: 13px;
      color: #303133;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .todo-time {
      font-size: 11px;
      color: #909399;
      flex-shrink: 0;
      margin-left: 8px;
    }
  }
}
</style>
