/**
 * Action types
 */
export enum ContactsTypes {
  //Load all
  LOAD_ALLCONTACT_REQUEST = '@contact/LOAD_ALLCONTACT_REQUEST',
  LOAD_ALLCONTACT_SUCCESS = '@contact/LOAD_ALLCONTACT_SUCCESS',
  LOAD_ALLCONTACT_FAILURE = '@contact/LOAD_ALLCONTACT_FAILURE',

  //Load single
  LOAD_CONTACT_REQUEST = '@contact/LOAD_CONTACT_REQUEST',
  LOAD_CONTACT_SUCCESS = '@contact/LOAD_CONTACT_SUCCESS',
  LOAD_CONTACT_FAILURE = '@contact/LOAD_CONTACT_FAILURE',

  //Create
  CREATE_CONTACT_REQUEST = '@contact/CREATE_CONTACT_REQUEST',
  CREATE_CONTACT_SUCCESS = '@contact/CREATE_CONTACT_SUCCESS',
  CREATE_CONTACT_FAILURE = '@contact/CREATE_CONTACT_FAILURE',

  //Update
  UPDATE_CONTACT_REQUEST = '@contact/UPDATE_CONTACT_REQUEST',
  UPDATE_CONTACT_SUCCESS = '@contact/UPDATE_CONTACT_SUCCESS',
  UPDATE_CONTACT_FAILURE = '@contact/UPDATE_CONTACT_FAILURE',

  //Delete
  DELETE_CONTACT_REQUEST = '@contact/DELETE_CONTACT_REQUEST',
  DELETE_CONTACT_SUCCESS = '@contact/DELETE_CONTACT_SUCCESS',
  DELETE_CONTACT_FAILURE = '@contact/DELETE_CONTACT_FAILURE',
}

/**
 * Data types
 */
export interface Contact {
  id?: number
  name?: string
  email?: string
  subject?: string
  message?: string
  createdAt?: number
}

/**
 * State type
 */
export interface ContactState {
  readonly all: Contact[]
  readonly data: Contact[]
  readonly loading: boolean
  readonly error: boolean
}
