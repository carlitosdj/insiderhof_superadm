import {Reducer} from 'redux'
import {ModuleState, ModulesTypes} from './types'

const INITIAL_STATE: ModuleState = {
  data: [],
  module: {},
  error: false,
  loading: true,
}

const reducer: Reducer<ModuleState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case ModulesTypes.REORDER_MODULES:
      return {...state, data: action.payload }

    //Load
    case ModulesTypes.LOAD_MODULES_REQUEST:
      return {...state, loading: true, data: []}
    case ModulesTypes.LOAD_MODULES_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ModulesTypes.LOAD_MODULES_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Load
    case ModulesTypes.LOAD_MODULE_REQUEST:
      return {...state, loading: true, module: {}}
    case ModulesTypes.LOAD_MODULE_SUCCESS:
      return {...state, loading: false, error: false, module: action.payload.data}
    case ModulesTypes.LOAD_MODULE_FAILURE:
      return {...state, loading: false, error: action.payload, module: {}}

    //Create
    case ModulesTypes.CREATE_MODULE_REQUEST:
      return {...state}
    case ModulesTypes.CREATE_MODULE_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case ModulesTypes.CREATE_MODULE_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case ModulesTypes.UPDATE_MODULE_REQUEST:
      return {...state}
    case ModulesTypes.UPDATE_MODULE_SUCCESS:
      return {...state, loading: false, error: false, data: state.data?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case ModulesTypes.UPDATE_MODULE_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case ModulesTypes.DELETE_MODULE_REQUEST:
      return {...state}
    case ModulesTypes.DELETE_MODULE_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.filter((item) => item.id !== action.payload.data.id)}
    case ModulesTypes.DELETE_MODULE_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}
    default:
      return state
  }
}

export default reducer
