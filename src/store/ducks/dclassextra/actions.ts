import {action} from 'typesafe-actions'
import {ClassExtrasTypes, ClassExtra} from './types'

export const reorderClassExtrasRequest = (data: ClassExtra[]) => action(ClassExtrasTypes.REORDER_EXTRACLASSES, data)

//Load
export const loadClassExtrasRequest = (id: number) => action(ClassExtrasTypes.LOAD_CLASSEXTRAS_REQUEST, id)
export const loadClassExtrasSuccess = (data: ClassExtra[]) => action(ClassExtrasTypes.LOAD_CLASSEXTRAS_SUCCESS, data)
export const loadClassExtrasFailure = (err: any[]) => action(ClassExtrasTypes.LOAD_CLASSEXTRAS_FAILURE, err)

//Load
export const loadClassExtraRequest = (id: number) => action(ClassExtrasTypes.LOAD_CLASSEXTRA_REQUEST, id)
export const loadClassExtraSuccess = (data: ClassExtra) => action(ClassExtrasTypes.LOAD_CLASSEXTRA_SUCCESS, data)
export const loadClassExtraFailure = (err: any[]) => action(ClassExtrasTypes.LOAD_CLASSEXTRA_FAILURE, err)

//Create
export const createClassExtraRequest = (data: ClassExtra) => action(ClassExtrasTypes.CREATE_CLASSEXTRA_REQUEST, data)
export const createClassExtraSuccess = (data: ClassExtra) => action(ClassExtrasTypes.CREATE_CLASSEXTRA_SUCCESS, data)
export const createClassExtraFailure = (err: any[]) => action(ClassExtrasTypes.CREATE_CLASSEXTRA_FAILURE, err)

//Update
export const updateClassExtraRequest = (data: ClassExtra) => action(ClassExtrasTypes.UPDATE_CLASSEXTRA_REQUEST, data)
export const updateClassExtraSuccess = (data: ClassExtra) => action(ClassExtrasTypes.UPDATE_CLASSEXTRA_SUCCESS, data)
export const updateClassExtraFailure = (err: any[]) => action(ClassExtrasTypes.UPDATE_CLASSEXTRA_FAILURE, err)

//Delete
export const deleteClassExtraRequest = (id: number) => action(ClassExtrasTypes.DELETE_CLASSEXTRA_REQUEST, id)
export const deleteClassExtraSuccess = (data: ClassExtra) => action(ClassExtrasTypes.DELETE_CLASSEXTRA_SUCCESS, data)
export const deleteClassExtraFailure = (err: any[]) => action(ClassExtrasTypes.DELETE_CLASSEXTRA_FAILURE, err)
