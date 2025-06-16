import {action} from 'typesafe-actions'
import {LPFeaturesTypes, LPFeature} from './types'



export const reorderLPFeaturesRequest = (data: LPFeature[]) => action(LPFeaturesTypes.REORDER_LPFEATURES, data)
//Load
export const loadMyLPFeaturesRequest = (lpSessionId: number) => action(LPFeaturesTypes.LOAD_MYLPFEATURES_REQUEST, lpSessionId)
export const loadMyLPFeaturesSuccess = (data: LPFeature[]) => action(LPFeaturesTypes.LOAD_MYLPFEATURES_SUCCESS, data)
export const loadMyLPFeaturesFailure = (err: any[]) => action(LPFeaturesTypes.LOAD_MYLPFEATURES_FAILURE, err)

//Load
export const loadLPFeatureRequest = (lpfeatureId: number) => action(LPFeaturesTypes.LOAD_LPFEATURE_REQUEST, lpfeatureId)
export const loadLPFeatureSuccess = (data: LPFeature) => action(LPFeaturesTypes.LOAD_LPFEATURE_SUCCESS, data)
export const loadLPFeatureFailure = (err: any[]) => action(LPFeaturesTypes.LOAD_LPFEATURE_FAILURE, err)

//Create
export const createLPFeatureRequest = (data: LPFeature) => action(LPFeaturesTypes.CREATE_LPFEATURE_REQUEST, data)
export const createLPFeatureSuccess = (data: LPFeature) => action(LPFeaturesTypes.CREATE_LPFEATURE_SUCCESS, data)
export const createLPFeatureFailure = (err: any[]) => action(LPFeaturesTypes.CREATE_LPFEATURE_FAILURE, err)

//Update
export const updateLPFeatureRequest = (data: LPFeature) => action(LPFeaturesTypes.UPDATE_LPFEATURE_REQUEST, data)
export const updateLPFeatureSuccess = (data: LPFeature) => action(LPFeaturesTypes.UPDATE_LPFEATURE_SUCCESS, data)
export const updateLPFeatureFailure = (err: any[]) => action(LPFeaturesTypes.UPDATE_LPFEATURE_FAILURE, err)

//Delete
export const deleteLPFeatureRequest = (id: number) => action(LPFeaturesTypes.DELETE_LPFEATURE_REQUEST, id)
export const deleteLPFeatureSuccess = (data: LPFeature) => action(LPFeaturesTypes.DELETE_LPFEATURE_SUCCESS, data)
export const deleteLPFeatureFailure = (err: any[]) => action(LPFeaturesTypes.DELETE_LPFEATURE_FAILURE, err)
