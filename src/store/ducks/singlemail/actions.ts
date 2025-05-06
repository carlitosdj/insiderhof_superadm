import {action} from 'typesafe-actions'
import {SingleMailTypes, SingleMail} from './types'

//Load
export const loadSingleMailRequest = () => action(SingleMailTypes.LOAD_SINGLEMAIL_REQUEST)
export const loadSingleMailSuccess = (data: SingleMail) =>
  action(SingleMailTypes.LOAD_SINGLEMAIL_SUCCESS, data)
export const loadSingleMailFailure = (error: {}) =>
  action(SingleMailTypes.LOAD_SINGLEMAIL_FAILURE, error)

//Create
export const createSingleMailRequest = (SingleMail: SingleMail) =>
  action(SingleMailTypes.CREATE_SINGLEMAIL_REQUEST, SingleMail)
export const createSingleMailSuccess = (data: SingleMail) =>
  action(SingleMailTypes.CREATE_SINGLEMAIL_SUCCESS, data)
export const createSingleMailFailure = (error: {}) =>
  action(SingleMailTypes.CREATE_SINGLEMAIL_FAILURE, error)
