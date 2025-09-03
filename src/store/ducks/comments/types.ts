import {Annotation} from '../annotation/types'
import { Class } from '../dclass/types'
/**
 * Action types
 */
export enum CommentsTypes {
  //All
  LOAD_COMMENTS_REQUEST = '@annotations/LOAD_COMMENTS_REQUEST',
  LOAD_COMMENTS_SUCCESS = '@annotations/LOAD_COMMENTS_SUCCESS',
  LOAD_COMMENTS_FAILURE = '@annotations/LOAD_COMMENTS_FAILURE',
  
  // Reply
  REPLY_COMMENT_REQUEST = '@comments/REPLY_COMMENT_REQUEST',
  REPLY_COMMENT_SUCCESS = '@comments/REPLY_COMMENT_SUCCESS',
  REPLY_COMMENT_FAILURE = '@comments/REPLY_COMMENT_FAILURE',
  
  // Update
  UPDATE_COMMENT_REQUEST = '@comments/UPDATE_COMMENT_REQUEST',
  UPDATE_COMMENT_SUCCESS = '@comments/UPDATE_COMMENT_SUCCESS',
  UPDATE_COMMENT_FAILURE = '@comments/UPDATE_COMMENT_FAILURE',
  
  // Delete
  DELETE_COMMENT_REQUEST = '@comments/DELETE_COMMENT_REQUEST',
  DELETE_COMMENT_SUCCESS = '@comments/DELETE_COMMENT_SUCCESS',
  DELETE_COMMENT_FAILURE = '@comments/DELETE_COMMENT_FAILURE',
  
  // UI State
  SET_SELECTED_COMMENT = '@comments/SET_SELECTED_COMMENT',
  SET_REPLY_MODE = '@comments/SET_REPLY_MODE',
  SET_EDIT_MODE = '@comments/SET_EDIT_MODE',
}

export interface Comment {
  id?: number | undefined
  userId?: number | undefined
  componentId?: number | undefined
  comment?: string | undefined
  createdAt?: string | undefined
  updatedAt?: string | undefined
  status?: 'active' | 'edited' | 'deleted'
  parentUser?: any | undefined
  parentComponent?: any | undefined

  class?: Class
  
  // Nested structure
  replies?: Comment[]
  parentCommentId?: number | undefined
  
  // Status flags
  isAnswered?: boolean
  hasReplies?: boolean
  repliesCount?: number
  lastReplyAt?: string | undefined
  
  // For class links
  launchId?: number | undefined
  
  // Audit fields
  editedBy?: number | undefined
  editedAt?: string | undefined
  deletedBy?: number | undefined
  deletedAt?: string | undefined
}

/**
 * Data types
 */
// User Imported from Me
// imported

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface CommentsState {
  readonly data: Comment[]
  readonly loading: boolean
  readonly error?: Error
  
  // UI State
  readonly selectedComment?: Comment
  readonly replyMode: boolean
  readonly editMode: boolean
  readonly replyLoading: boolean
  readonly updateLoading: boolean
  readonly deleteLoading: boolean
}
