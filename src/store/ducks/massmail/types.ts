/**
 * Action types
 */
export enum EmailToListTypes {
  //Load
  LOAD_EMAIL_TO_LIST_REQUEST = '@emaillist/LOAD_EMAIL_TO_LIST_REQUEST',
  LOAD_EMAIL_TO_LIST_SUCCESS = '@emaillist/LOAD_EMAIL_TO_LIST_SUCCESS',
  LOAD_EMAIL_TO_LIST_FAILURE = '@emaillist/LOAD_EMAIL_TO_LIST_FAILURE',
  //Create
  CREATE_EMAIL_TO_LIST_REQUEST = '@emaillist/CREATE_EMAIL_TO_LIST_REQUEST',
  CREATE_EMAIL_TO_LIST_SUCCESS = '@emaillist/CREATE_EMAIL_TO_LIST_SUCCESS',
  CREATE_EMAIL_TO_LIST_FAILURE = '@emaillist/CREATE_EMAIL_TO_LIST_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface EmailTolist {
  id?: number
  list?: string
  subject?: string | undefined
  message?: string | undefined
  parentUser?: any
  user_id?: number | undefined
  status?: string
  quantity?: number | undefined
  createdAt?: string | undefined
  openedMails?: any
}

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface EmailToListState {
  readonly data: EmailTolist[]
  readonly loading: boolean
  readonly error?: Error
}
