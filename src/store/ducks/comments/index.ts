import {Reducer} from 'redux'
import {CommentsState, CommentsTypes} from './types'

const INITIAL_STATE: CommentsState = {
  data: [],
  error: {},
  loading: false,
  selectedComment: undefined,
  replyMode: false,
  editMode: false,
  replyLoading: false,
  updateLoading: false,
  deleteLoading: false,
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

    // Reply
    case CommentsTypes.REPLY_COMMENT_REQUEST:
      return {...state, replyLoading: true}
    case CommentsTypes.REPLY_COMMENT_SUCCESS:
      return {...state, replyLoading: false, replyMode: false}
    case CommentsTypes.REPLY_COMMENT_FAILURE:
      return {...state, replyLoading: false, error: action.payload}

    // Update
    case CommentsTypes.UPDATE_COMMENT_REQUEST:
      return {...state, updateLoading: true}
    case CommentsTypes.UPDATE_COMMENT_SUCCESS:
      return {...state, updateLoading: false, editMode: false, selectedComment: undefined}
    case CommentsTypes.UPDATE_COMMENT_FAILURE:
      return {...state, updateLoading: false, error: action.payload}

    // Delete
    case CommentsTypes.DELETE_COMMENT_REQUEST:
      return {...state, deleteLoading: true}
    case CommentsTypes.DELETE_COMMENT_SUCCESS:
      return {...state, deleteLoading: false}
    case CommentsTypes.DELETE_COMMENT_FAILURE:
      return {...state, deleteLoading: false, error: action.payload}

    // UI State
    case CommentsTypes.SET_SELECTED_COMMENT:
      return {...state, selectedComment: action.payload.comment}
    case CommentsTypes.SET_REPLY_MODE:
      return {...state, replyMode: action.payload.replyMode}
    case CommentsTypes.SET_EDIT_MODE:
      return {...state, editMode: action.payload.editMode}

    default:
      return state
  }
}

export default reducer
