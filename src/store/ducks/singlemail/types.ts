/**
 * Action types
 */
export enum SingleMailTypes {
  //Load
  LOAD_SINGLEMAIL_REQUEST = '@emaillist/LOAD_SINGLEMAIL_REQUEST',
  LOAD_SINGLEMAIL_SUCCESS = '@emaillist/LOAD_SINGLEMAIL_SUCCESS',
  LOAD_SINGLEMAIL_FAILURE = '@emaillist/LOAD_SINGLEMAIL_FAILURE',
  //Create
  CREATE_SINGLEMAIL_REQUEST = '@emaillist/CREATE_SINGLEMAIL_REQUEST',
  CREATE_SINGLEMAIL_SUCCESS = '@emaillist/CREATE_SINGLEMAIL_SUCCESS',
  CREATE_SINGLEMAIL_FAILURE = '@emaillist/CREATE_SINGLEMAIL_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface SingleMail {
  id?: number
  to?: string
  subject?: string | undefined
  message?: string | undefined
  parentUser?: any
  userId?: number | undefined
  status?: string
  createdAt?: string | undefined
  openedSingleMail?: any
}

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface SingleMailState {
  readonly data: SingleMail[]
  readonly loading: boolean
  readonly error?: Error
}
