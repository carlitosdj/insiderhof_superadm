import {Annotation} from '../annotation/types'
/**
 * Action types
 */
export enum CommentsTypes {
  //All
  LOAD_COMMENTS_REQUEST = '@annotations/LOAD_COMMENTS_REQUEST',
  LOAD_COMMENTS_SUCCESS = '@annotations/LOAD_COMMENTS_SUCCESS',
  LOAD_COMMENTS_FAILURE = '@annotations/LOAD_COMMENTS_FAILURE',
}

export interface Comment {
  id?: number | undefined
  userId?: number | undefined
  componentId?: number | undefined
  comment?: string | undefined
  createdAt?: string | undefined
  status?: string
  parentUser?: any | undefined
  parentComponent?: any | undefined
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
}
