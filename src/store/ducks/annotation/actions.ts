import {action} from 'typesafe-actions'
import {AnnotationTypes, Annotation} from './types'

//Single
export const loadAnnotationSingleRequest = (user_id: number, componentId: number) =>
  action(AnnotationTypes.LOAD_ANNOTATION_SINGLE_REQUEST, {user_id, componentId})
export const loadAnnotationSingleSuccess = (data: Annotation) =>
  action(AnnotationTypes.LOAD_ANNOTATION_SINGLE_SUCCESS, data)
export const loadAnnotationSingleFailure = (error: {}) =>
  action(AnnotationTypes.LOAD_ANNOTATION_SINGLE_FAILURE, error)

//Create
export const createAnnotationRequest = (annotation: Annotation) =>
  action(AnnotationTypes.CREATE_ANNOTATION_REQUEST, annotation)
export const createAnnotationSuccess = (data: Annotation) =>
  action(AnnotationTypes.CREATE_ANNOTATION_SUCCESS, data)
export const createAnnotationFailure = (error: {}) =>
  action(AnnotationTypes.CREATE_ANNOTATION_FAILURE, error)
