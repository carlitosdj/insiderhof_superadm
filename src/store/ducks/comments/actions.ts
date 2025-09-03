import {action} from 'typesafe-actions'
import {Comment, CommentsTypes} from './types'

//All
export const loadCommentsRequest = () =>
  action(CommentsTypes.LOAD_COMMENTS_REQUEST)
export const loadCommentsSuccess = (data: Comment) =>
  action(CommentsTypes.LOAD_COMMENTS_SUCCESS, data)
export const loadCommentsFailure = (error: {}) =>
  action(CommentsTypes.LOAD_COMMENTS_FAILURE, error)

// Reply
export const replyCommentRequest = (parentId: number, comment: string) =>
  action(CommentsTypes.REPLY_COMMENT_REQUEST, { parentId, comment })
export const replyCommentSuccess = (data: Comment) =>
  action(CommentsTypes.REPLY_COMMENT_SUCCESS, data)
export const replyCommentFailure = (error: {}) =>
  action(CommentsTypes.REPLY_COMMENT_FAILURE, error)

// Update
export const updateCommentRequest = (id: number, comment: string) =>
  action(CommentsTypes.UPDATE_COMMENT_REQUEST, { id, comment })
export const updateCommentSuccess = (data: Comment) =>
  action(CommentsTypes.UPDATE_COMMENT_SUCCESS, data)
export const updateCommentFailure = (error: {}) =>
  action(CommentsTypes.UPDATE_COMMENT_FAILURE, error)

// Delete
export const deleteCommentRequest = (id: number) =>
  action(CommentsTypes.DELETE_COMMENT_REQUEST, { id })
export const deleteCommentSuccess = (id: number) =>
  action(CommentsTypes.DELETE_COMMENT_SUCCESS, { id })
export const deleteCommentFailure = (error: {}) =>
  action(CommentsTypes.DELETE_COMMENT_FAILURE, error)

// UI State
export const setSelectedComment = (comment?: Comment) =>
  action(CommentsTypes.SET_SELECTED_COMMENT, { comment })
export const setReplyMode = (replyMode: boolean) =>
  action(CommentsTypes.SET_REPLY_MODE, { replyMode })
export const setEditMode = (editMode: boolean) =>
  action(CommentsTypes.SET_EDIT_MODE, { editMode })
