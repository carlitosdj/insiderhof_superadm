import {call, put} from 'redux-saga/effects'
import * as tenantsService from '../../../services/tenantsService'
import * as tenantUsersService from '../../../services/tenantUsersService'
import * as tenantSettingsService from '../../../services/tenantSettingsService'

import {
  loadTenantsRequest,
  loadTenantsSuccess,
  loadTenantsFailure,
  loadTenantRequest,
  loadTenantSuccess,
  loadTenantFailure,
  createTenantRequest,
  createTenantSuccess,
  createTenantFailure,
  updateTenantRequest,
  updateTenantSuccess,
  updateTenantFailure,
  deleteTenantRequest,
  deleteTenantSuccess,
  deleteTenantFailure,
  loadTenantMetricsRequest,
  loadTenantMetricsSuccess,
  loadTenantMetricsFailure,
  loadTenantUsersRequest,
  loadTenantUsersSuccess,
  loadTenantUsersFailure,
  addTenantUserRequest,
  addTenantUserSuccess,
  addTenantUserFailure,
  updateTenantUserRequest,
  updateTenantUserSuccess,
  updateTenantUserFailure,
  removeTenantUserRequest,
  removeTenantUserSuccess,
  removeTenantUserFailure,
  loadTenantSettingsRequest,
  loadTenantSettingsSuccess,
  loadTenantSettingsFailure,
  updateTenantSettingsRequest,
  updateTenantSettingsSuccess,
  updateTenantSettingsFailure,
} from './actions'

import {Tenant, TenantMetrics} from './types'

// Load all tenants
export function* loadTenants(payload: ReturnType<typeof loadTenantsRequest>) {
  try {
    const response: any = yield call(tenantsService.getTenants, payload.payload.filters)

    // API returns { data, total, page, take }
    const result = response.data || response

    yield put(loadTenantsSuccess({
      tenants: result.data || result,
      total: result.total || 0
    }))
  } catch (error: any) {
    yield put(loadTenantsFailure(error.response?.data || error))
  }
}

// Load single tenant
export function* loadTenant(payload: ReturnType<typeof loadTenantRequest>) {
  try {
    const response: any = yield call(tenantsService.getTenant, payload.payload)
    const tenant = response.data || response
    yield put(loadTenantSuccess(tenant))
  } catch (error: any) {
    yield put(loadTenantFailure(error.response?.data || error))
  }
}

// Create
export function* createTenant(payload: ReturnType<typeof createTenantRequest>) {
  try {
    const response: any = yield call(tenantsService.createTenant, payload.payload)
    const tenant = response.data || response
    yield put(createTenantSuccess(tenant))
  } catch (error: any) {
    yield put(createTenantFailure(error.response?.data || error))
  }
}

// Update
export function* updateTenant(payload: ReturnType<typeof updateTenantRequest>) {
  try {
    const {id, ...data} = payload.payload
    const response: any = yield call(tenantsService.updateTenant, id!, data)
    const tenant = response.data || response
    yield put(updateTenantSuccess(tenant))
  } catch (error: any) {
    yield put(updateTenantFailure(error.response?.data || error))
  }
}

// Delete
export function* deleteTenant(payload: ReturnType<typeof deleteTenantRequest>) {
  try {
    yield call(tenantsService.deleteTenant, payload.payload)
    yield put(deleteTenantSuccess(payload.payload))
  } catch (error: any) {
    yield put(deleteTenantFailure(error.response?.data || error))
  }
}

// Load metrics
export function* loadTenantMetrics(payload: ReturnType<typeof loadTenantMetricsRequest>) {
  try {
    const response: any = yield call(tenantsService.getTenantMetrics, payload.payload)
    const metrics = response.data || response
    yield put(loadTenantMetricsSuccess(metrics))
  } catch (error: any) {
    yield put(loadTenantMetricsFailure(error.response?.data || error))
  }
}

// Tenant Users
export function* loadTenantUsers(payload: ReturnType<typeof loadTenantUsersRequest>) {
  try {
    const response: any = yield call(tenantUsersService.getTenantUsers, payload.payload)
    const users = response.data || response
    yield put(loadTenantUsersSuccess(users))
  } catch (error: any) {
    yield put(loadTenantUsersFailure(error.response?.data || error))
  }
}

export function* addTenantUser(payload: ReturnType<typeof addTenantUserRequest>) {
  try {
    const {tenantId, data} = payload.payload
    const response: any = yield call(tenantUsersService.addTenantUser, tenantId, data)
    const user = response.data || response
    yield put(addTenantUserSuccess(user))
  } catch (error: any) {
    yield put(addTenantUserFailure(error.response?.data || error))
  }
}

export function* updateTenantUser(payload: ReturnType<typeof updateTenantUserRequest>) {
  try {
    const {tenantId, userId, data} = payload.payload
    const response: any = yield call(tenantUsersService.updateTenantUser, tenantId, userId, data)
    const user = response.data || response
    yield put(updateTenantUserSuccess(user))
  } catch (error: any) {
    yield put(updateTenantUserFailure(error.response?.data || error))
  }
}

export function* removeTenantUser(payload: ReturnType<typeof removeTenantUserRequest>) {
  try {
    const {tenantId, userId} = payload.payload
    yield call(tenantUsersService.removeTenantUser, tenantId, userId)
    yield put(removeTenantUserSuccess({tenantId, userId}))
  } catch (error: any) {
    yield put(removeTenantUserFailure(error.response?.data || error))
  }
}

// Tenant Settings
export function* loadTenantSettings(payload: ReturnType<typeof loadTenantSettingsRequest>) {
  try {
    const response: any = yield call(tenantSettingsService.getTenantSettings, payload.payload)
    const settings = response.data || response
    yield put(loadTenantSettingsSuccess(settings))
  } catch (error: any) {
    yield put(loadTenantSettingsFailure(error.response?.data || error))
  }
}

export function* updateTenantSettings(payload: ReturnType<typeof updateTenantSettingsRequest>) {
  try {
    const {tenantId, data} = payload.payload
    const response: any = yield call(tenantSettingsService.updateTenantSettings, tenantId, data)
    const settings = response.data || response
    yield put(updateTenantSettingsSuccess(settings))
  } catch (error: any) {
    yield put(updateTenantSettingsFailure(error.response?.data || error))
  }
}
