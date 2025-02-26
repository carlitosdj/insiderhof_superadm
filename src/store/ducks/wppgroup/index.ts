import {Reducer} from 'redux'
import {WppgroupState, WppgroupTypes} from './types'
const INITIAL_STATE: WppgroupState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<WppgroupState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case WppgroupTypes.LOAD_WPPGROUPS_REQUEST:
      return {...state, loading: true}
    case WppgroupTypes.LOAD_WPPGROUPS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case WppgroupTypes.LOAD_WPPGROUPS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case WppgroupTypes.CREATE_WPPGROUP_REQUEST:
      return {...state}
    case WppgroupTypes.CREATE_WPPGROUP_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case WppgroupTypes.CREATE_WPPGROUP_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case WppgroupTypes.UPDATE_WPPGROUP_REQUEST:
      return {...state}
    case WppgroupTypes.UPDATE_WPPGROUP_SUCCESS:
      console.log('ACTION PAYLOAD VER', action.payload)
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      } //update data?
    case WppgroupTypes.UPDATE_WPPGROUP_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Delete
    case WppgroupTypes.DELETE_WPPGROUP_REQUEST:
      return {...state}
    case WppgroupTypes.DELETE_WPPGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data),
      }
    case WppgroupTypes.DELETE_WPPGROUP_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
