import {action} from 'typesafe-actions'
import {Comment, CommentsTypes} from './types'

//All
export const loadCommentsRequest = () =>
  action(CommentsTypes.LOAD_COMMENTS_REQUEST)
export const loadCommentsSuccess = (data: Comment) =>
  action(CommentsTypes.LOAD_COMMENTS_SUCCESS, data)
export const loadCommentsFailure = (error: {}) =>
  action(CommentsTypes.LOAD_COMMENTS_FAILURE, error)
