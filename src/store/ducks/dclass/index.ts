import {Reducer} from 'redux'
import {ClassState, ClassesTypes} from './types'

const INITIAL_STATE: ClassState = {
  data: [],
  class: {},
  error: false,
  loading: false,
}

const reducer: Reducer<ClassState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case ClassesTypes.REORDER_CLASSES:
      return {...state, data: action.payload }

    //Load
    case ClassesTypes.LOAD_CLASSES_REQUEST:
      return {...state, loading: true, data: []}
    case ClassesTypes.LOAD_CLASSES_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ClassesTypes.LOAD_CLASSES_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Load
    case ClassesTypes.LOAD_CLASS_REQUEST:
      return {...state, loading: true}
    case ClassesTypes.LOAD_CLASS_SUCCESS:
      return {...state, loading: false, error: false, class: action.payload.data}
    case ClassesTypes.LOAD_CLASS_FAILURE:
      return {...state, loading: false, error: action.payload, class: {}}

    //Create
    case ClassesTypes.CREATE_CLASS_REQUEST:
      return {...state}
    case ClassesTypes.CREATE_CLASS_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case ClassesTypes.CREATE_CLASS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case ClassesTypes.UPDATE_CLASS_REQUEST:
      return {...state}
    case ClassesTypes.UPDATE_CLASS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case ClassesTypes.UPDATE_CLASS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case ClassesTypes.DELETE_CLASS_REQUEST:
      return {...state}
    case ClassesTypes.DELETE_CLASS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.filter((item) => item.id !== action.payload.data.id)}
    case ClassesTypes.DELETE_CLASS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}
    default:
      return state
  }
}

export default reducer
