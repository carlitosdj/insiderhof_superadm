import {call, put, select} from 'redux-saga/effects'
import api from '../../../services/api'
import { ApplicationState } from '../../index'

import {
  loadCommentsRequest,
  loadCommentsSuccess,
  loadCommentsFailure,
  replyCommentRequest,
  replyCommentSuccess,
  replyCommentFailure,
  updateCommentRequest,
  updateCommentSuccess,
  updateCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure
} from './actions'
import { Comment } from './types'


//Load
export function* loadComments(payload: ReturnType<typeof loadCommentsRequest>) {
  try {
    put(loadCommentsRequest())
    const response: Comment = yield call(api.get, 'dcomment')
    yield put(loadCommentsSuccess(response))
  } catch (error: any) {
    yield put(loadCommentsFailure(error.response.data))
  }
}

// Reply
export function* replyComment(action: ReturnType<typeof replyCommentRequest>): Generator<any, void, any> {
  try {
    const { parentId, comment } = action.payload
    
    // Get the current comments to find the parent comment
    const commentsResponse: any = yield call(api.get, 'dcomment')
    const parentComment = commentsResponse.data.find((c: Comment) => c.id === parentId)
    
    if (!parentComment) {
      yield put(replyCommentFailure({ error: 'Parent comment not found' }))
      return
    }
    
    // Get current user from state
    const currentUser: any = yield select((state: ApplicationState) => state.me)
    
    // Build payload like the app does
    const replyPayload = {
      comment,
      userId: currentUser.me?.id || 1, // Use current admin user ID
      classId: parentComment.class?.id || parentComment.componentId,
      parentId: !parentComment.parentCommentId ? Number(parentComment.id) : Number(parentComment.parentCommentId),
    }
    
    const response: Comment = yield call(api.post, 'dcomment', replyPayload)
    yield put(replyCommentSuccess(response))
    // Reload comments to get updated list
    yield put(loadCommentsRequest())
  } catch (error: any) {
    yield put(replyCommentFailure(error.response?.data || error))
  }
}

// Update
export function* updateComment(action: ReturnType<typeof updateCommentRequest>) {
  try {
    const { id, comment } = action.payload
    const response: Comment = yield call(api.patch, `dcomment/${id}`, {
      comment
    })
    yield put(updateCommentSuccess(response))
    // Reload comments to get updated list
    yield put(loadCommentsRequest())
  } catch (error: any) {
    yield put(updateCommentFailure(error.response.data))
  }
}

// Delete
export function* deleteComment(action: ReturnType<typeof deleteCommentRequest>) {
  try {
    const { id } = action.payload
    yield call(api.delete, `dcomment/${id}`)
    yield put(deleteCommentSuccess(id))
    // Reload comments to get updated list
    yield put(loadCommentsRequest())
  } catch (error: any) {
    yield put(deleteCommentFailure(error.response.data))
  }
}
