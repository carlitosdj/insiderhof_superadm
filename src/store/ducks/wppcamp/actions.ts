import {action} from 'typesafe-actions'
import {WppcampTypes, Wppcamp} from './types'

//Load
export const loadAllcampRequest = () => action(WppcampTypes.LOAD_ALLCAMP_REQUEST)
export const loadAllcampSuccess = (data: Wppcamp[]) =>
  action(WppcampTypes.LOAD_ALLCAMP_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadAllcampFailure = (err:any[]) => action(WppcampTypes.LOAD_ALLCAMP_FAILURE, err)

//Load single
export const loadCampRequest = (slug: string) => action(WppcampTypes.LOAD_CAMP_REQUEST, slug)
export const loadCampSuccess = (camp: Wppcamp) => action(WppcampTypes.LOAD_CAMP_SUCCESS, camp) //payload dps de LOAD_REQUEST
export const loadCampFailure = (err:any[]) => action(WppcampTypes.LOAD_CAMP_FAILURE, err)

//Create
export const createCampRequest = (data: Wppcamp) => action(WppcampTypes.CREATE_CAMP_REQUEST, data)
export const createCampSuccess = (data: Wppcamp) => action(WppcampTypes.CREATE_CAMP_SUCCESS, data)
export const createCampFailure = (err:any[]) => action(WppcampTypes.CREATE_CAMP_FAILURE, err)

//Update
export const updateCampRequest = (supportToUpdate: Wppcamp) =>
  action(WppcampTypes.UPDATE_CAMP_REQUEST, supportToUpdate)
export const updateCampSuccess = (data: Wppcamp) => action(WppcampTypes.UPDATE_CAMP_SUCCESS, data)
export const updateCampFailure = (err:any[]) => action(WppcampTypes.UPDATE_CAMP_FAILURE)

//Delete
export const deleteCampRequest = (id: number) => action(WppcampTypes.DELETE_CAMP_REQUEST, id)
export const deleteCampSuccess = (id: number) => action(WppcampTypes.DELETE_CAMP_SUCCESS, id)
export const deleteCampFailure = (err:any[]) => action(WppcampTypes.DELETE_CAMP_FAILURE, err)

//Load available
export const loadWppgroupavailableRequest = (slug: string) =>
  action(WppcampTypes.LOAD_WPPGROUPAVAILABLE_REQUEST, slug)
export const loadWppgroupavailableSuccess = (camp: Wppcamp) =>
  action(WppcampTypes.LOAD_WPPGROUPAVAILABLE_SUCCESS, camp) //payload dps de LOAD_REQUEST
export const loadWppgroupavailableFailure = (err:any[]) =>
  action(WppcampTypes.LOAD_WPPGROUPAVAILABLE_FAILURE, err)
