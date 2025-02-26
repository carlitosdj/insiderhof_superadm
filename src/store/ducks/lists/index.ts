import {Reducer} from 'redux'
import {ListsState, ListsTypes} from './types'

const INITIAL_STATE: ListsState = {
  data: [],
  error: {},
  loading: false,
}

const reducer: Reducer<ListsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case ListsTypes.LOAD_LISTS_REQUEST:
      return {...state, loading: true, data: []}
    case ListsTypes.LOAD_LISTS_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case ListsTypes.LOAD_LISTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
