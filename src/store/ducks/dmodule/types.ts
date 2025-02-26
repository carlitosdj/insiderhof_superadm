import { availableModule } from "../davailablemodule/types"
import { Class } from "../dclass/types"
import { Product } from "../dproduct/types"

/**
 * Action types
 */
export enum ModulesTypes {

  REORDER_MODULES = '@extras/REORDER_MODULES',
  //Load
  LOAD_MODULES_REQUEST = '@extras/LOAD_MODULES_REQUEST',
  LOAD_MODULES_SUCCESS = '@extras/LOAD_MODULES_SUCCESS',
  LOAD_MODULES_FAILURE = '@extras/LOAD_MODULES_FAILURE',

  LOAD_MODULE_REQUEST = '@extras/LOAD_MODULE_REQUEST',
  LOAD_MODULE_SUCCESS = '@extras/LOAD_MODULE_SUCCESS',
  LOAD_MODULE_FAILURE = '@extras/LOAD_MODULE_FAILURE',

  //Create
  CREATE_MODULE_REQUEST = '@extras/CREATE_MODULE_REQUEST',
  CREATE_MODULE_SUCCESS = '@extras/CREATE_MODULE_SUCCESS',
  CREATE_MODULE_FAILURE = '@extras/CREATE_MODULE_FAILURE',

  //Update
  UPDATE_MODULE_REQUEST = '@extras/UPDATE_MODULE_REQUEST',
  UPDATE_MODULE_SUCCESS = '@extras/UPDATE_MODULE_SUCCESS',
  UPDATE_MODULE_FAILURE = '@extras/UPDATE_MODULE_FAILURE',

  //Delete
  DELETE_MODULE_REQUEST = '@extras/DELETE_MODULE_REQUEST',
  DELETE_MODULE_SUCCESS = '@extras/DELETE_MODULE_SUCCESS',
  DELETE_MODULE_FAILURE = '@extras/DELETE_MODULE_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Module {
  id?: number | undefined
  name?: string | undefined
  description?: string | undefined
  image?: string | undefined
  order?: number | undefined	
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
  productId?: number | undefined
  moduleId?: number | undefined
  product?: Product | undefined
  classes?: Class[] | undefined
  availableModule?: availableModule[] | undefined
}
/**
 * State type
 */
export interface ModuleState {
  readonly data: Module[]
  readonly module: Module
  readonly loading: boolean
  readonly error: boolean
}
