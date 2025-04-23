import { Class } from "../dclass/types"
import { User } from "../me/types"

/**
 * Action types
 */
export enum AnnotationTypes {
  //Single
  LOAD_ANNOTATION_SINGLE_REQUEST = '@annotation/LOAD_ANNOTATION_SINGLE_REQUEST',
  LOAD_ANNOTATION_SINGLE_SUCCESS = '@annotation/LOAD_ANNOTATION_SINGLE_SUCCESS',
  LOAD_ANNOTATION_SINGLE_FAILURE = '@annotation/LOAD_ANNOTATION_SINGLE_FAILURE',
  //Create
  CREATE_ANNOTATION_REQUEST = '@annotation/CREATE_ANNOTATION_REQUEST',
  CREATE_ANNOTATION_SUCCESS = '@annotation/CREATE_ANNOTATION_SUCCESS',
  CREATE_ANNOTATION_FAILURE = '@annotation/CREATE_ANNOTATION_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Annotation {
  id?: number | undefined
  user_id?: number | undefined
  componentId?: number | undefined
  message?: string | undefined
  createdAt?: string | undefined
  status?: string
  parentUser?: any | undefined
  parentComponent?: any | undefined

  class?: Class
  user?: User
}

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface AnnotationState {
  readonly data: Annotation
  readonly loading: boolean
  readonly error?: Error
}
