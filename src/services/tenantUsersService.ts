import api from './api'

export interface AddTenantUserData {
  email: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  permissions?: any
}

export interface UpdateTenantUserData {
  role: 'owner' | 'admin' | 'member' | 'viewer'
  permissions?: any
}

// Get all users of a tenant
export const getTenantUsers = (tenantId: number) => {
  return api.get(`/tenant-users/tenant/${tenantId}`)
}

// Add user to tenant
export const addTenantUser = (tenantId: number, data: any) => {
  return api.post(`/tenant-users/${tenantId}`, data)
}

// Update tenant user role
export const updateTenantUser = (tenantId: number, userId: number, data: any) => {
  return api.patch(`/tenant-users/${tenantId}/${userId}`, data)
}

// Legacy method
export const updateTenantUserRole = updateTenantUser

// Remove user from tenant
export const removeTenantUser = (tenantId: number, userId: number) => {
  return api.delete(`/tenant-users/${tenantId}/${userId}`)
}
