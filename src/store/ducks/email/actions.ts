import {action} from 'typesafe-actions'
import {EmailToListTypes, EmailTolist} from './types'

//Load
export const loadEmailToListRequest = () => action(EmailToListTypes.LOAD_EMAIL_TO_LIST_REQUEST)
export const loadEmailToListSuccess = (data: EmailTolist) =>
  action(EmailToListTypes.LOAD_EMAIL_TO_LIST_SUCCESS, data)
export const loadEmailToListFailure = (error: {}) =>
  action(EmailToListTypes.LOAD_EMAIL_TO_LIST_FAILURE, error)

//Create
export const createEmailToListRequest = (emailToList: EmailTolist) =>
  action(EmailToListTypes.CREATE_EMAIL_TO_LIST_REQUEST, emailToList)
export const createEmailToListSuccess = (data: EmailTolist) =>
  action(EmailToListTypes.CREATE_EMAIL_TO_LIST_SUCCESS, data)
export const createEmailToListFailure = (error: {}) =>
  action(EmailToListTypes.CREATE_EMAIL_TO_LIST_FAILURE, error)
