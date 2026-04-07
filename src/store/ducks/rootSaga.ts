import {all, takeLatest} from 'redux-saga/effects'

import {MeTypes} from './me/types'
import {loginUser, createMe, updateMe, deleteMe, recoveryUser, loadMe} from './me/sagas'

// Tenants
import { TenantsTypes } from './tenants/types'
import { loadTenants, loadTenant, createTenant, updateTenant, deleteTenant, loadTenantMetrics } from './tenants/sagas'

export default function* rootSaga() {
  yield all([
    //Me
    takeLatest(MeTypes.LOGIN_USER_REQUEST, loginUser),
    takeLatest(MeTypes.UPDATE_USER_REQUEST, updateMe),
    takeLatest(MeTypes.CREATE_USER_REQUEST, createMe),
    takeLatest(MeTypes.DELETE_USER_REQUEST, deleteMe),
    takeLatest(MeTypes.RECOVERY_USER_REQUEST, recoveryUser),
    takeLatest(MeTypes.LOAD_ME_REQUEST, loadMe),

    // Tenants
    takeLatest(TenantsTypes.LOAD_TENANTS_REQUEST, loadTenants),
    takeLatest(TenantsTypes.LOAD_TENANT_REQUEST, loadTenant),
    takeLatest(TenantsTypes.CREATE_TENANT_REQUEST, createTenant),
    takeLatest(TenantsTypes.UPDATE_TENANT_REQUEST, updateTenant),
    takeLatest(TenantsTypes.DELETE_TENANT_REQUEST, deleteTenant),
    takeLatest(TenantsTypes.LOAD_TENANT_METRICS_REQUEST, loadTenantMetrics),
  ])
}
