import {action} from 'typesafe-actions'
import {ExtrasTypes, Extras} from './types'

//Load
export const loadExtrasRequest = (id: string) => action(ExtrasTypes.LOAD_EXTRAS_REQUEST, id)
export const loadExtrasSuccess = (data: Extras[]) => action(ExtrasTypes.LOAD_EXTRAS_SUCCESS, data)
export const loadExtrasFailure = (err: any[]) => action(ExtrasTypes.LOAD_EXTRAS_FAILURE, err)

//Create
export const createExtraRequest = () => action(ExtrasTypes.CREATE_EXTRA_REQUEST)
export const createExtraSuccess = (data: Extras) => action(ExtrasTypes.CREATE_EXTRA_SUCCESS, data)
export const createExtraFailure = (err: any[]) => action(ExtrasTypes.CREATE_EXTRA_FAILURE, err)

//Update
export const updateExtraRequest = () => action(ExtrasTypes.UPDATE_EXTRA_REQUEST)
export const updateExtraSuccess = (data: Extras) => action(ExtrasTypes.UPDATE_EXTRA_SUCCESS, data)
export const updateExtraFailure = (err: any[]) => action(ExtrasTypes.UPDATE_EXTRA_FAILURE, err)

//Delete
export const deleteExtraRequest = () => action(ExtrasTypes.DELETE_EXTRA_REQUEST)
export const deleteExtraSuccess = (data: Extras) => action(ExtrasTypes.DELETE_EXTRA_SUCCESS, data)
export const deleteExtraFailure = (err: any[]) => action(ExtrasTypes.DELETE_EXTRA_FAILURE, err)
