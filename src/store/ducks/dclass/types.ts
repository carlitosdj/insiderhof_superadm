import { availableClass } from "../davailableclass/types"
import { Module } from "../dmodule/types"
import { User } from "../me/types"

/**
 * Action types
 */
export enum ClassesTypes {

  REORDER_CLASSES = '@extras/REORDER_CLASSES',

  //Load
  LOAD_CLASSES_REQUEST = '@extras/LOAD_CLASSES_REQUEST',
  LOAD_CLASSES_SUCCESS = '@extras/LOAD_CLASSES_SUCCESS',
  LOAD_CLASSES_FAILURE = '@extras/LOAD_CLASSES_FAILURE',

  //Load
  LOAD_CLASS_REQUEST = '@extras/LOAD_CLASS_REQUEST',
  LOAD_CLASS_SUCCESS = '@extras/LOAD_CLASS_SUCCESS',
  LOAD_CLASS_FAILURE = '@extras/LOAD_CLASS_FAILURE',

  //Create
  CREATE_CLASS_REQUEST = '@extras/CREATE_CLASS_REQUEST',
  CREATE_CLASS_SUCCESS = '@extras/CREATE_CLASS_SUCCESS',
  CREATE_CLASS_FAILURE = '@extras/CREATE_CLASS_FAILURE',

  //Update
  UPDATE_CLASS_REQUEST = '@extras/UPDATE_CLASS_REQUEST',
  UPDATE_CLASS_SUCCESS = '@extras/UPDATE_CLASS_SUCCESS',
  UPDATE_CLASS_FAILURE = '@extras/UPDATE_CLASS_FAILURE',

  //Delete
  DELETE_CLASS_REQUEST = '@extras/DELETE_CLASS_REQUEST',
  DELETE_CLASS_SUCCESS = '@extras/DELETE_CLASS_SUCCESS',
  DELETE_CLASS_FAILURE = '@extras/DELETE_CLASS_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Class {
  id?: number | undefined
  name?: string | undefined
  description?: string | undefined
  image?: string | undefined
  video?: string | undefined
  tags?: string | undefined
  duration?: number | undefined
  order?: number | undefined	
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
  moduleId?: number | undefined
  module? : Module
  availableClass? : availableClass[] | undefined
  completed? : Completed[] | undefined
  rate?: Rate[] | undefined
}

export interface Completed {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  rate?: number
  timeWatched?: number
  status?: string
  userId?: number
  classId?: number
  user?: User
  class?: Class
}

export interface Rate {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  rate?: number
  userId?: number
  classId?: number
  user?: User
  class?: Class
}


/**
 * State type
 */
export interface ClassState {
  readonly data: Class[]
  readonly class: Class
  readonly loading: boolean
  readonly error: boolean
}
