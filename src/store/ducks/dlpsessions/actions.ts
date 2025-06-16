import {action} from 'typesafe-actions'
import {LPSessionsTypes, LPSession} from './types'



export const reorderLPSessionsRequest = (data: LPSession[]) => action(LPSessionsTypes.REORDER_LPSESSIONS, data)
//Load
export const loadMyLPSessionsRequest = (userId: number) => action(LPSessionsTypes.LOAD_MYLPSESSIONS_REQUEST, userId)
export const loadMyLPSessionsSuccess = (data: LPSession[]) => action(LPSessionsTypes.LOAD_MYLPSESSIONS_SUCCESS, data)
export const loadMyLPSessionsFailure = (err: any[]) => action(LPSessionsTypes.LOAD_MYLPSESSIONS_FAILURE, err)

//Load
export const loadLPSessionRequest = (lpsessionId: number) => action(LPSessionsTypes.LOAD_LPSESSION_REQUEST, lpsessionId)
export const loadLPSessionSuccess = (data: LPSession) => action(LPSessionsTypes.LOAD_LPSESSION_SUCCESS, data)
export const loadLPSessionFailure = (err: any[]) => action(LPSessionsTypes.LOAD_LPSESSION_FAILURE, err)

//Create
export const createLPSessionRequest = (data: LPSession) => action(LPSessionsTypes.CREATE_LPSESSION_REQUEST, data)
export const createLPSessionSuccess = (data: LPSession) => action(LPSessionsTypes.CREATE_LPSESSION_SUCCESS, data)
export const createLPSessionFailure = (err: any[]) => action(LPSessionsTypes.CREATE_LPSESSION_FAILURE, err)

//Update
export const updateLPSessionRequest = (data: LPSession) => action(LPSessionsTypes.UPDATE_LPSESSION_REQUEST, data)
export const updateLPSessionSuccess = (data: LPSession) => action(LPSessionsTypes.UPDATE_LPSESSION_SUCCESS, data)
export const updateLPSessionFailure = (err: any[]) => action(LPSessionsTypes.UPDATE_LPSESSION_FAILURE, err)

//Delete
export const deleteLPSessionRequest = (id: number) => action(LPSessionsTypes.DELETE_LPSESSION_REQUEST, id)
export const deleteLPSessionSuccess = (data: LPSession) => action(LPSessionsTypes.DELETE_LPSESSION_SUCCESS, data)
export const deleteLPSessionFailure = (err: any[]) => action(LPSessionsTypes.DELETE_LPSESSION_FAILURE, err)
