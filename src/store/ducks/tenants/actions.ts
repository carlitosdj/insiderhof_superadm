import {action} from 'typesafe-actions'
import {TenantsTypes, Tenant, TenantMetrics, TenantUser, TenantSettings} from './types'

// Load all
export const loadTenantsRequest = (filters?: {
  status?: string
  plan?: string
  search?: string
  page?: number
  take?: number
}) => action(TenantsTypes.LOAD_TENANTS_REQUEST, {filters})
export const loadTenantsSuccess = (data: {tenants: Tenant[], total: number}) =>
  action(TenantsTypes.LOAD_TENANTS_SUCCESS, data)
export const loadTenantsFailure = (err: any[]) => action(TenantsTypes.LOAD_TENANTS_FAILURE, err)

// Load one
export const loadTenantRequest = (id: number) => action(TenantsTypes.LOAD_TENANT_REQUEST, id)
export const loadTenantSuccess = (data: Tenant) => action(TenantsTypes.LOAD_TENANT_SUCCESS, data)
export const loadTenantFailure = (err: any[]) => action(TenantsTypes.LOAD_TENANT_FAILURE, err)

// Create
export const createTenantRequest = (newTenant: Tenant) =>
  action(TenantsTypes.CREATE_TENANT_REQUEST, newTenant)
export const createTenantSuccess = (data: Tenant) =>
  action(TenantsTypes.CREATE_TENANT_SUCCESS, data)
export const createTenantFailure = (err: any[]) =>
  action(TenantsTypes.CREATE_TENANT_FAILURE, err)

// Update
export const updateTenantRequest = (tenantToUpdate: Tenant) =>
  action(TenantsTypes.UPDATE_TENANT_REQUEST, tenantToUpdate)
export const updateTenantSuccess = (data: Tenant) =>
  action(TenantsTypes.UPDATE_TENANT_SUCCESS, data)
export const updateTenantFailure = (err: any[]) =>
  action(TenantsTypes.UPDATE_TENANT_FAILURE, err)

// Delete
export const deleteTenantRequest = (tenantId: number) =>
  action(TenantsTypes.DELETE_TENANT_REQUEST, tenantId)
export const deleteTenantSuccess = (tenantId: number) =>
  action(TenantsTypes.DELETE_TENANT_SUCCESS, tenantId)
export const deleteTenantFailure = (err: any[]) =>
  action(TenantsTypes.DELETE_TENANT_FAILURE, err)

// Metrics
export const loadTenantMetricsRequest = (tenantId: number) =>
  action(TenantsTypes.LOAD_TENANT_METRICS_REQUEST, tenantId)
export const loadTenantMetricsSuccess = (data: TenantMetrics) =>
  action(TenantsTypes.LOAD_TENANT_METRICS_SUCCESS, data)
export const loadTenantMetricsFailure = (err: any[]) =>
  action(TenantsTypes.LOAD_TENANT_METRICS_FAILURE, err)

// Set selected tenant
export const setSelectedTenant = (tenant: Tenant | null) =>
  action(TenantsTypes.SET_SELECTED_TENANT, tenant)

// Tenant Users
export const loadTenantUsersRequest = (tenantId: number) =>
  action(TenantsTypes.LOAD_TENANT_USERS_REQUEST, tenantId)
export const loadTenantUsersSuccess = (data: TenantUser[]) =>
  action(TenantsTypes.LOAD_TENANT_USERS_SUCCESS, data)
export const loadTenantUsersFailure = (err: any[]) =>
  action(TenantsTypes.LOAD_TENANT_USERS_FAILURE, err)

export const addTenantUserRequest = (tenantId: number, data: {userId?: number, email?: string, role: string}) =>
  action(TenantsTypes.ADD_TENANT_USER_REQUEST, {tenantId, data})
export const addTenantUserSuccess = (data: TenantUser) =>
  action(TenantsTypes.ADD_TENANT_USER_SUCCESS, data)
export const addTenantUserFailure = (err: any[]) =>
  action(TenantsTypes.ADD_TENANT_USER_FAILURE, err)

export const updateTenantUserRequest = (tenantId: number, userId: number, data: {role?: string, status?: string}) =>
  action(TenantsTypes.UPDATE_TENANT_USER_REQUEST, {tenantId, userId, data})
export const updateTenantUserSuccess = (data: TenantUser) =>
  action(TenantsTypes.UPDATE_TENANT_USER_SUCCESS, data)
export const updateTenantUserFailure = (err: any[]) =>
  action(TenantsTypes.UPDATE_TENANT_USER_FAILURE, err)

export const removeTenantUserRequest = (tenantId: number, userId: number) =>
  action(TenantsTypes.REMOVE_TENANT_USER_REQUEST, {tenantId, userId})
export const removeTenantUserSuccess = (data: {tenantId: number, userId: number}) =>
  action(TenantsTypes.REMOVE_TENANT_USER_SUCCESS, data)
export const removeTenantUserFailure = (err: any[]) =>
  action(TenantsTypes.REMOVE_TENANT_USER_FAILURE, err)

// Tenant Settings
export const loadTenantSettingsRequest = (tenantId: number) =>
  action(TenantsTypes.LOAD_TENANT_SETTINGS_REQUEST, tenantId)
export const loadTenantSettingsSuccess = (data: TenantSettings) =>
  action(TenantsTypes.LOAD_TENANT_SETTINGS_SUCCESS, data)
export const loadTenantSettingsFailure = (err: any[]) =>
  action(TenantsTypes.LOAD_TENANT_SETTINGS_FAILURE, err)

export const updateTenantSettingsRequest = (tenantId: number, data: Partial<TenantSettings>) =>
  action(TenantsTypes.UPDATE_TENANT_SETTINGS_REQUEST, {tenantId, data})
export const updateTenantSettingsSuccess = (data: TenantSettings) =>
  action(TenantsTypes.UPDATE_TENANT_SETTINGS_SUCCESS, data)
export const updateTenantSettingsFailure = (err: any[]) =>
  action(TenantsTypes.UPDATE_TENANT_SETTINGS_FAILURE, err)

// Alias for loadTenantRequest
export const loadTenantByIdRequest = loadTenantRequest
