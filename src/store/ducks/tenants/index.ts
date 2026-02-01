import {Reducer} from 'redux'
import {TenantsState, TenantsTypes} from './types'

const INITIAL_STATE: TenantsState = {
  data: [],
  selectedTenant: null,
  metrics: null,
  tenantUsers: [],
  settings: null,
  error: false,
  loading: false,
  loadingTenant: false,
  loadingMetrics: false,
  loadingUsers: false,
  loadingSettings: false,
  total: 0,
}

const reducer: Reducer<TenantsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // Load all
    case TenantsTypes.LOAD_TENANTS_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.LOAD_TENANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.tenants || action.payload.data || action.payload,
        total: action.payload.total || action.payload.length || 0,
      }
    case TenantsTypes.LOAD_TENANTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    // Load one
    case TenantsTypes.LOAD_TENANT_REQUEST:
      return {...state, loadingTenant: true, selectedTenant: null}
    case TenantsTypes.LOAD_TENANT_SUCCESS:
      return {
        ...state,
        loadingTenant: false,
        error: false,
        selectedTenant: action.payload.data || action.payload,
      }
    case TenantsTypes.LOAD_TENANT_FAILURE:
      return {...state, loadingTenant: false, error: action.payload, selectedTenant: null}

    // Create
    case TenantsTypes.CREATE_TENANT_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.CREATE_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data || action.payload, ...state.data],
        total: state.total + 1,
      }
    case TenantsTypes.CREATE_TENANT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Update
    case TenantsTypes.UPDATE_TENANT_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.UPDATE_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((tenant) =>
          tenant.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : tenant
        ),
        selectedTenant:
          state.selectedTenant?.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : state.selectedTenant,
      }
    case TenantsTypes.UPDATE_TENANT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Delete
    case TenantsTypes.DELETE_TENANT_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.DELETE_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload),
        total: state.total - 1,
      }
    case TenantsTypes.DELETE_TENANT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Metrics
    case TenantsTypes.LOAD_TENANT_METRICS_REQUEST:
      return {...state, loadingMetrics: true, metrics: null}
    case TenantsTypes.LOAD_TENANT_METRICS_SUCCESS:
      return {
        ...state,
        loadingMetrics: false,
        error: false,
        metrics: action.payload.data || action.payload,
      }
    case TenantsTypes.LOAD_TENANT_METRICS_FAILURE:
      return {...state, loadingMetrics: false, error: action.payload, metrics: null}

    // Set selected tenant
    case TenantsTypes.SET_SELECTED_TENANT:
      return {...state, selectedTenant: action.payload}

    // Tenant Users
    case TenantsTypes.LOAD_TENANT_USERS_REQUEST:
      return {...state, loadingUsers: true}
    case TenantsTypes.LOAD_TENANT_USERS_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        error: false,
        tenantUsers: action.payload.data || action.payload,
      }
    case TenantsTypes.LOAD_TENANT_USERS_FAILURE:
      return {...state, loadingUsers: false, error: action.payload}

    case TenantsTypes.ADD_TENANT_USER_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.ADD_TENANT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tenantUsers: [...state.tenantUsers, action.payload.data || action.payload],
      }
    case TenantsTypes.ADD_TENANT_USER_FAILURE:
      return {...state, loading: false, error: action.payload}

    case TenantsTypes.UPDATE_TENANT_USER_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.UPDATE_TENANT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tenantUsers: state.tenantUsers.map((tu) =>
          tu.userId === (action.payload.data?.userId || action.payload.userId)
            ? action.payload.data || action.payload
            : tu
        ),
      }
    case TenantsTypes.UPDATE_TENANT_USER_FAILURE:
      return {...state, loading: false, error: action.payload}

    case TenantsTypes.REMOVE_TENANT_USER_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.REMOVE_TENANT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tenantUsers: state.tenantUsers.filter((tu) => tu.userId !== action.payload.userId),
      }
    case TenantsTypes.REMOVE_TENANT_USER_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Tenant Settings
    case TenantsTypes.LOAD_TENANT_SETTINGS_REQUEST:
      return {...state, loadingSettings: true}
    case TenantsTypes.LOAD_TENANT_SETTINGS_SUCCESS:
      return {
        ...state,
        loadingSettings: false,
        error: false,
        settings: action.payload.data || action.payload,
      }
    case TenantsTypes.LOAD_TENANT_SETTINGS_FAILURE:
      return {...state, loadingSettings: false, error: action.payload}

    case TenantsTypes.UPDATE_TENANT_SETTINGS_REQUEST:
      return {...state, loading: true}
    case TenantsTypes.UPDATE_TENANT_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        settings: action.payload.data || action.payload,
      }
    case TenantsTypes.UPDATE_TENANT_SETTINGS_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
