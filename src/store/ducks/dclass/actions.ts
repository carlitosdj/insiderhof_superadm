import {action} from 'typesafe-actions'
import {ClassesTypes, Class} from './types'

export const reorderClassesRequest = (data: Class[]) => action(ClassesTypes.REORDER_CLASSES, data)

//Load
export const loadClassesRequest = (id: number) => action(ClassesTypes.LOAD_CLASSES_REQUEST, id)
export const loadClassesSuccess = (data: Class[]) => action(ClassesTypes.LOAD_CLASSES_SUCCESS, data)
export const loadClassesFailure = (err: any[]) => action(ClassesTypes.LOAD_CLASSES_FAILURE, err)

//Load
export const loadClassRequest = (id: number) => action(ClassesTypes.LOAD_CLASS_REQUEST, id)
export const loadClassSuccess = (data: Class) => action(ClassesTypes.LOAD_CLASS_SUCCESS, data)
export const loadClassFailure = (err: any[]) => action(ClassesTypes.LOAD_CLASS_FAILURE, err)

//Create
export const createClassRequest = (data: Class) => action(ClassesTypes.CREATE_CLASS_REQUEST, data)
export const createClassSuccess = (data: Class) => action(ClassesTypes.CREATE_CLASS_SUCCESS, data)
export const createClassFailure = (err: any[]) => action(ClassesTypes.CREATE_CLASS_FAILURE, err)

//Update
export const updateClassRequest = (data: Class) => action(ClassesTypes.UPDATE_CLASS_REQUEST, data)
export const updateClassSuccess = (data: Class) => action(ClassesTypes.UPDATE_CLASS_SUCCESS, data)
export const updateClassFailure = (err: any[]) => action(ClassesTypes.UPDATE_CLASS_FAILURE, err)

//Delete
export const deleteClassRequest = (id: number) => action(ClassesTypes.DELETE_CLASS_REQUEST, id)
export const deleteClassSuccess = (data: Class) => action(ClassesTypes.DELETE_CLASS_SUCCESS, data)
export const deleteClassFailure = (err: any[]) => action(ClassesTypes.DELETE_CLASS_FAILURE, err)
