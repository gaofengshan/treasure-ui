import type { MockMethod } from 'vite-plugin-mock'

const userMap: Record<string, { password: string; roles: string[]; token: string; name: string; avatar: string }> = {
  admin: {
    password: 'admin123',
    roles: ['admin'],
    token: 'mock-token-admin-xxxxx',
    name: '系统管理员',
    avatar: '',
  },
}

const mock: MockMethod[] = [
  {
    url: '/api/v1/auth/login',
    method: 'post',
    response: ({ body }: { body: { username: string; password: string } }) => {
      const { username, password } = body
      const user = userMap[username]
      if (!user) {
        return { code: 401, message: '用户名或密码错误', data: null }
      }
      if (user.password !== password) {
        return { code: 401, message: '用户名或密码错误', data: null }
      }
      return {
        code: 200,
        message: '登录成功',
        data: { token: user.token },
      }
    },
  },
  {
    url: '/api/v1/auth/user-info',
    method: 'get',
    response: ({ headers }: { headers: Record<string, string> }) => {
      const token = headers.authorization?.replace('Bearer ', '')
      if (!token || !token.startsWith('mock-token-')) {
        return { code: 401, message: 'Token无效', data: null }
      }
      return {
        code: 200,
        message: 'ok',
        data: {
          userInfo: {
            userId: '1',
            username: 'admin',
            realName: '系统管理员',
            avatar: '',
            email: 'admin@treasury.com',
            phone: '13800138000',
          },
          permissions: ['*:*:*'],
          menus: [
            { path: '/dashboard', title: '首页', icon: 'ep:home-filled' },
            {
              title: '账户管理', icon: 'ep:collection',
              children: [
                { path: '/account/bank-account', title: '银行账户', icon: 'ep:coin' },
                { path: '/account/inner-account', title: '内部账户', icon: 'ep:wallet' },
              ],
            },
            {
              title: '资金归集', icon: 'ep:upload',
              children: [
                { path: '/fund/collect', title: '资金上收', icon: 'ep:upload' },
                { path: '/fund/allocate', title: '资金下拨', icon: 'ep:download' },
              ],
            },
            { path: '/payment', title: '支付结算', icon: 'ep:money' },
            { path: '/budget', title: '资金预算', icon: 'ep:document' },
            { path: '/report', title: '报表分析', icon: 'ep:data-analysis' },
            {
              title: '系统管理', icon: 'ep:setting',
              children: [
                { path: '/system/user', title: '用户管理', icon: 'ep:user' },
                { path: '/system/role', title: '角色管理', icon: 'ep:setting' },
                { path: '/system/menu', title: '菜单配置', icon: 'ep:menu' },
              ],
            },
          ],
        },
      }
    },
  },
  {
    url: '/api/v1/auth/logout',
    method: 'post',
    response: () => {
      return { code: 200, message: '退出成功', data: null }
    },
  },
]

export default mock
