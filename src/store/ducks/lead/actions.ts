import {action} from 'typesafe-actions'
import {LeadTypes, Lead, Emailmessage} from './types'

//Load
export const loadLeadRequest = (email: string, list: string) =>
  action(LeadTypes.LOAD_LEAD_REQUEST, {email, list})
export const loadLeadSuccess = (data: Lead) => action(LeadTypes.LOAD_LEAD_SUCCESS, data)
export const loadLeadFailure = (error: {}) => action(LeadTypes.LOAD_LEAD_FAILURE, error)

//Create
export const createLeadRequest = (newLead: Lead, emailMessage: Emailmessage) =>
  action(LeadTypes.CREATE_LEAD_REQUEST, {newLead, emailMessage})
export const createLeadSuccess = (data: Lead) => action(LeadTypes.CREATE_LEAD_SUCCESS, data)
export const createLeadFailure = (error: {}) => action(LeadTypes.CREATE_LEAD_FAILURE, error)

//Update
export const confirmLeadRequest = (email: string, list: string) =>
  action(LeadTypes.CONFIRM_LEAD_REQUEST, {email, list})
export const confirmLeadSuccess = (data: Lead) => action(LeadTypes.CONFIRM_LEAD_SUCCESS, data)
export const confirmLeadFailure = (error: {}) => action(LeadTypes.CONFIRM_LEAD_FAILURE, error)

//Delete
export const notDisturbLeadRequest = (email: string, list: string) =>
  action(LeadTypes.NOTDISTURB_LEAD_REQUEST, {email, list})
export const notDisturbLeadSuccess = (data: Lead) => action(LeadTypes.NOTDISTURB_LEAD_SUCCESS, data)
export const notDisturbLeadFailure = (error: {}) => action(LeadTypes.NOTDISTURB_LEAD_FAILURE, error)
