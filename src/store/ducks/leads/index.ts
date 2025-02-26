import {Reducer} from 'redux'
import {LeadsState, LeadsTypes} from './types'

const INITIAL_STATE: LeadsState = {
  data: [],
  count: 0,
  error: {},
  loading: false,
}

const reducer: Reducer<LeadsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case LeadsTypes.LOAD_LEAD_REQUEST:
      return {...state, loading: true, data: []}
    case LeadsTypes.LOAD_LEAD_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data.data, count: action.payload.data.count}
    case LeadsTypes.LOAD_LEAD_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Search
    case LeadsTypes.SEARCH_LEADS_REQUEST:
      return {...state, loading: true, data: []}
    case LeadsTypes.SEARCH_LEADS_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data.data, count: action.payload.data.count}
    case LeadsTypes.SEARCH_LEADS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
