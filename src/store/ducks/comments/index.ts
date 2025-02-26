import {Reducer} from 'redux'
import {CommentsState, CommentsTypes} from './types'

const INITIAL_STATE: CommentsState = {
  data: [],
  error: {},
  loading: false,
}

const reducer: Reducer<CommentsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //All
    case CommentsTypes.LOAD_COMMENTS_REQUEST:
      return {...state, loading: true, data: []}
    case CommentsTypes.LOAD_COMMENTS_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case CommentsTypes.LOAD_COMMENTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
