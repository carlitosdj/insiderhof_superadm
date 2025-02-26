/**
 * Action types
 */
export enum LeadTypes {
  //Load
  LOAD_LEAD_REQUEST = '@lead/LOAD_LEAD_REQUEST',
  LOAD_LEAD_SUCCESS = '@lead/LOAD_LEAD_SUCCESS',
  LOAD_LEAD_FAILURE = '@lead/LOAD_LEAD_FAILURE',

  //Create
  CREATE_LEAD_REQUEST = '@lead/CREATE_LEAD_REQUEST',
  CREATE_LEAD_SUCCESS = '@lead/CREATE_LEAD_SUCCESS',
  CREATE_LEAD_FAILURE = '@lead/CREATE_LEAD_FAILURE',

  //Delete
  CONFIRM_LEAD_REQUEST = '@lead/CONFIRM_LEAD_REQUEST',
  CONFIRM_LEAD_SUCCESS = '@lead/CONFIRM_LEAD_SUCCESS',
  CONFIRM_LEAD_FAILURE = '@lead/CONFIRM_LEAD_FAILURE',

  //Not Disturb
  NOTDISTURB_LEAD_REQUEST = '@lead/NOTDISTURB_LEAD_REQUEST',
  NOTDISTURB_LEAD_SUCCESS = '@lead/NOTDISTURB_LEAD_SUCCESS',
  NOTDISTURB_LEAD_FAILURE = '@lead/NOTDISTURB_LEAD_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Lead {
  Id?: number
  name?: string
  email?: string
  whatsapp?: string
  list?: string
  confirm?: number
  segmentacao?: string
  createdAt?: string
  confirmedAt?: string
  origin?: string
  naoperturbe?: number
}

export interface Emailmessage {
  title?: string | undefined
  message?: string | undefined
}

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface LeadState {
  readonly data: Lead
  readonly loading: boolean
  readonly error?: Error
}
