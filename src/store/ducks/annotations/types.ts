import {Annotation} from '../annotation/types'
/**
 * Action types
 */
export enum AnnotationsTypes {
  //All
  LOAD_MY_ANNOTATIONS_REQUEST = '@annotations/LOAD_MY_ANNOTATIONS_REQUEST',
  LOAD_MY_ANNOTATIONS_SUCCESS = '@annotations/LOAD_MY_ANNOTATIONS_SUCCESS',
  LOAD_MY_ANNOTATIONS_FAILURE = '@annotations/LOAD_MY_ANNOTATIONS_FAILURE',
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
export interface AnnotationsState {
  readonly data: Annotation[]
  readonly loading: boolean
  readonly error?: Error
}
