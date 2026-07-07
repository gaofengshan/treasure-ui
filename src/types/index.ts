export interface Result<T = any> {
  code: number
  message: string
  data: T
}

export interface LoginParams {
  username: string
  password: string
  remember?: boolean
}

export interface UserInfo {
  userId: string
  username: string
  realName: string
  avatar?: string
  email?: string
  phone?: string
}

export interface RouteMeta {
  title: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
  roles?: string[]
  permissions?: string[]
}

export interface MenuItem {
  path: string
  title: string
  icon?: string
  children?: MenuItem[]
  meta?: RouteMeta
}
