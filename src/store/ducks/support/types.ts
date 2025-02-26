/**
 * Action types
 */
export enum SupportsTypes {
  //Load all
  LOAD_ALLSUPPORT_REQUEST = '@support/LOAD_ALLSUPPORT_REQUEST',
  LOAD_ALLSUPPORT_SUCCESS = '@support/LOAD_ALLSUPPORT_SUCCESS',
  LOAD_ALLSUPPORT_FAILURE = '@support/LOAD_ALLSUPPORT_FAILURE',

  //Load single
  LOAD_SUPPORT_REQUEST = '@support/LOAD_SUPPORT_REQUEST',
  LOAD_SUPPORT_SUCCESS = '@support/LOAD_SUPPORT_SUCCESS',
  LOAD_SUPPORT_FAILURE = '@support/LOAD_SUPPORT_FAILURE',

  //Create
  CREATE_SUPPORT_REQUEST = '@support/CREATE_SUPPORT_REQUEST',
  CREATE_SUPPORT_SUCCESS = '@support/CREATE_SUPPORT_SUCCESS',
  CREATE_SUPPORT_FAILURE = '@support/CREATE_SUPPORT_FAILURE',

  //Update
  UPDATE_SUPPORT_REQUEST = '@support/UPDATE_SUPPORT_REQUEST',
  UPDATE_SUPPORT_SUCCESS = '@support/UPDATE_SUPPORT_SUCCESS',
  UPDATE_SUPPORT_FAILURE = '@support/UPDATE_SUPPORT_FAILURE',
}

/**
 * Data types
 */
export interface Support {
  id?: number
  message?: string
  reply?: string
  parentUser?: number
  user_id?: number
  parentAdmin?: number
  adminId?: number
  createdAt?: number
  repliedAt?: number
  status?: string
}

/**
 * State type
 */
export interface SupportState {
  readonly all: Support[]
  readonly data: Support[]
  readonly loading: boolean
  readonly error: boolean
}
