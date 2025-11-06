import {Reducer} from 'redux'
import {LeadsState, LeadsTypes} from './types'

const INITIAL_STATE: LeadsState = {
  data: [],
  count: 0,
  error: {},
  loading: false,
  leadLists: {
    predefinedLists: [],
    customLists: []
  },
  leadListsLoading: false,
  exportData: [],
  exportLoading: false,
  selectedList: "",
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

    //Lead Lists
    case LeadsTypes.LOAD_LEAD_LISTS_REQUEST:
      return {...state, leadListsLoading: true}
    case LeadsTypes.LOAD_LEAD_LISTS_SUCCESS:
      return {...state, leadListsLoading: false, leadLists: action.payload}
    case LeadsTypes.LOAD_LEAD_LISTS_FAILURE:
      return {...state, leadListsLoading: false, leadLists: { predefinedLists: [], customLists: [] }}

    //Leads by list
    case LeadsTypes.LOAD_LEADS_BY_LIST_REQUEST:
      return {...state, loading: true, data: []}
    case LeadsTypes.LOAD_LEADS_BY_LIST_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data, count: action.payload.length}
    case LeadsTypes.LOAD_LEADS_BY_LIST_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Export leads
    case LeadsTypes.LOAD_EXPORT_LEADS_REQUEST:
      return {...state, exportLoading: true}
    case LeadsTypes.LOAD_EXPORT_LEADS_SUCCESS:
      return {...state, exportLoading: false, exportData: action.payload}
    case LeadsTypes.LOAD_EXPORT_LEADS_FAILURE:
      return {...state, exportLoading: false, exportData: []}

    //Set selected list
    case LeadsTypes.SET_SELECTED_LIST:
      return {...state, selectedList: action.payload}

    default:
      return state
  }
}

export default reducer
