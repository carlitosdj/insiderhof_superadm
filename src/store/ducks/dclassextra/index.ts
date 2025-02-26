import {Reducer} from 'redux'
import {ClassExtraState, ClassExtrasTypes} from './types'

const INITIAL_STATE: ClassExtraState = {
  data: [],
  classextra: {},
  error: false,
  loading: false,
}

const reducer: Reducer<ClassExtraState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case ClassExtrasTypes.REORDER_EXTRACLASSES:
      return {...state, data: action.payload }

    //Load
    case ClassExtrasTypes.LOAD_CLASSEXTRAS_REQUEST:
      return {...state, loading: true, data: []}
    case ClassExtrasTypes.LOAD_CLASSEXTRAS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ClassExtrasTypes.LOAD_CLASSEXTRAS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Load
    case ClassExtrasTypes.LOAD_CLASSEXTRA_REQUEST:
      return {...state, loading: true}
    case ClassExtrasTypes.LOAD_CLASSEXTRA_SUCCESS:
      return {...state, loading: false, error: false, classextra: action.payload.data}
    case ClassExtrasTypes.LOAD_CLASSEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, classextra: {}}

    //Create
    case ClassExtrasTypes.CREATE_CLASSEXTRA_REQUEST:
      return {...state}
    case ClassExtrasTypes.CREATE_CLASSEXTRA_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case ClassExtrasTypes.CREATE_CLASSEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case ClassExtrasTypes.UPDATE_CLASSEXTRA_REQUEST:
      return {...state}
    case ClassExtrasTypes.UPDATE_CLASSEXTRA_SUCCESS:
      return {...state, loading: false, error: false, data: state.data?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case ClassExtrasTypes.UPDATE_CLASSEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case ClassExtrasTypes.DELETE_CLASSEXTRA_REQUEST:
      return {...state}
    case ClassExtrasTypes.DELETE_CLASSEXTRA_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.filter((item) => item.id !== action.payload.data.id)}
    case ClassExtrasTypes.DELETE_CLASSEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}
    default:
      return state
  }
}

export default reducer
