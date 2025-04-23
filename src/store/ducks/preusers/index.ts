import {Reducer} from 'redux'
import {PreUsersState, PreUsersTypes} from './types'

const INITIAL_STATE: PreUsersState = {
  data: [],
  user: {},
  error: false,
  loading: false,
  loadingPreUser: false,
  count: 0,
  selectedPreUsers: [],
  showPagination: true,
  filterStartDate: 0,
  filterEndDate: 0,
  
}

const reducer: Reducer<PreUsersState> = (state = INITIAL_STATE, action: any) => {
 // console.log("actionXXX", action)
  switch (action.type) {
    //All
    case PreUsersTypes.LOAD_PREUSERS_REQUEST:
      return {...state, loading: true, data: []}
    case PreUsersTypes.LOAD_PREUSERS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data.data, count: action.payload.data.count, showPagination: true}
    case PreUsersTypes.LOAD_PREUSERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //PreUser
    case PreUsersTypes.LOAD_PREUSER_REQUEST:
      return {...state, loadingPreUser: true, user: {}}
    case PreUsersTypes.LOAD_PREUSER_SUCCESS:
      return {...state, loadingPreUser: false, error: false, user: action.payload.data}
    case PreUsersTypes.LOAD_PREUSER_FAILURE:
      return {...state, loadingPreUser: false, error: action.payload, user: {}}

    //Search
    case PreUsersTypes.SEARCH_PREUSERS_REQUEST:
      return {...state, loading: true}
    case PreUsersTypes.SEARCH_PREUSERS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data, count: action.payload.data.length, showPagination: true}
    case PreUsersTypes.SEARCH_PREUSERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Search
    case PreUsersTypes.FILTER_PREUSERS_REQUEST:
      return {
        ...state, 
        loading: true,
        filterStartDate: action.payload.startDate, 
        filterEndDate: action.payload.endDate,
      }
    case PreUsersTypes.FILTER_PREUSERS_SUCCESS:
      return {
        ...state, 
        loading: false, 
        error: false, 
        data: action.payload.data.data, 
        count: action.payload.data.data.length, 
        showPagination: false, 
        //filterStartDate: action.payload.payload.startDate, 
        //filterEndDate: action.payload.payload.endDate,
      }
    case PreUsersTypes.FILTER_PREUSERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case PreUsersTypes.CREATE_PREUSER_REQUEST:
      return {...state}
    case PreUsersTypes.CREATE_PREUSER_SUCCESS:
      return {...state, loading: false, error: false, data: [action.payload.data, ...state.data]}
    case PreUsersTypes.CREATE_PREUSER_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Update
    case PreUsersTypes.UPDATE_PREUSER_REQUEST:
      return {...state}
    case PreUsersTypes.UPDATE_PREUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      }
    case PreUsersTypes.UPDATE_PREUSER_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Delete
    case PreUsersTypes.DELETE_PREUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data.id),
      } //só uma data: pq excluiu o user "Excluido com sucesso."
    case PreUsersTypes.DELETE_PREUSER_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}


    case PreUsersTypes.SELECTED_PREUSER_ADD:
      return {...state,}

    case PreUsersTypes.SELECTED_PREUSER_ADD_SUCCESS:
      return {...state, selectedPreUsers: [...state.selectedPreUsers, action.payload]}

    case PreUsersTypes.SELECTED_PREUSER_REMOVE:
      return {...state,}

    case PreUsersTypes.SELECTED_PREUSER_REMOVE_SUCCESS:
      return {
        ...state,
        selectedPreUsers: state.selectedPreUsers?.filter((item) => item.id !== action.payload.id),
      } 

    default:
      return state
  }
}

export default reducer
