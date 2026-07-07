import request from '@/utils/request'
import type { LoginParams, Result, UserInfo, MenuItem } from '@/types'

interface LoginResult {
  token: string
}

interface UserInfoResult {
  userInfo: UserInfo
  permissions: string[]
  menus: MenuItem[]
}

export function loginApi(data: LoginParams): Promise<Result<LoginResult>> {
  return request.post('/auth/login', data)
}

export function getUserInfoApi(): Promise<Result<UserInfoResult>> {
  return request.get('/auth/user-info')
}

export function logoutApi(): Promise<Result<null>> {
  return request.post('/auth/logout')
}
