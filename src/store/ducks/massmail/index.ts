import {Reducer} from 'redux'
import {EmailToListState, EmailToListTypes} from './types'

const INITIAL_STATE: EmailToListState = {
  data: [],
  error: {},
  loading: false,
}

const reducer: Reducer<EmailToListState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case EmailToListTypes.LOAD_EMAIL_TO_LIST_REQUEST:
      return {...state, loading: true, data: []}
    case EmailToListTypes.LOAD_EMAIL_TO_LIST_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case EmailToListTypes.LOAD_EMAIL_TO_LIST_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case EmailToListTypes.CREATE_EMAIL_TO_LIST_REQUEST:
      return {...state, loading: true}
    case EmailToListTypes.CREATE_EMAIL_TO_LIST_SUCCESS:
      return {...state, loading: false, error: {}, data: [action.payload.data, ...state.data]}
    case EmailToListTypes.CREATE_EMAIL_TO_LIST_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
