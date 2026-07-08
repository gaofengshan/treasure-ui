import request from '@/utils/request'
import type { Result } from '@/types'

export interface SysUser {
  id?: number
  username: string
  password?: string
  realName?: string
  email?: string
  phone?: string
  status?: number
  createTime?: string
  _statusLoading?: boolean
}

export interface PageResult<T> {
  code: number
  message: string
  data: T[]
  total: number
  pages: number
  pageNum: number
  pageSize: number
}

export function getUserPage(params: any): Promise<Result<PageResult<SysUser>>> {
  return request.get('/system/user/page', { params })
}

export function getUserById(id: number): Promise<Result<SysUser>> {
  return request.get(`/system/user/${id}`)
}

export function createUser(data: SysUser): Promise<Result<number>> {
  return request.post('/system/user', data)
}

export function updateUser(data: SysUser): Promise<Result<void>> {
  return request.put('/system/user', data)
}

export function deleteUser(id: number): Promise<Result<void>> {
  return request.delete(`/system/user/${id}`)
}

export function changeUserStatus(id: number, status: number): Promise<Result<void>> {
  return request.put(`/system/user/${id}/status`, { status })
}

export function changeUserPassword(id: number, password: string): Promise<Result<void>> {
  return request.put(`/system/user/${id}/password`, { password })
}
