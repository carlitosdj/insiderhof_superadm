import { availableProduct } from "../davailableproduct/types"
import { Module } from "../dmodule/types"
import { User } from "../me/types"

/**
 * Action types
 */
export enum ProductsTypes {

  REORDER_ProductS = '@extras/REORDER_PRODUCTS',


  //Load
  LOAD_MYPRODUCTS_REQUEST = '@extras/LOAD_MYPRODUCTS_REQUEST',
  LOAD_MYPRODUCTS_SUCCESS = '@extras/LOAD_MYPRODUCTS_SUCCESS',
  LOAD_MYPRODUCTS_FAILURE = '@extras/LOAD_MYPRODUCTS_FAILURE',


  //Load
  LOAD_PRODUCT_REQUEST = '@extras/LOAD_PRODUCT_REQUEST',
  LOAD_PRODUCT_SUCCESS = '@extras/LOAD_PRODUCT_SUCCESS',
  LOAD_PRODUCT_FAILURE = '@extras/LOAD_PRODUCT_FAILURE',

  //Create
  CREATE_PRODUCT_REQUEST = '@extras/CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCESS = '@extras/CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAILURE = '@extras/CREATE_PRODUCT_FAILURE',

  //Update
  UPDATE_PRODUCT_REQUEST = '@extras/UPDATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_SUCCESS = '@extras/UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILURE = '@extras/UPDATE_PRODUCT_FAILURE',

  //Delete
  DELETE_PRODUCT_REQUEST = '@extras/DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS = '@extras/DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE = '@extras/DELETE_PRODUCT_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Product {
  id?: number | undefined
  name?: string | undefined
  description?: string | undefined
  oldPrice?: number | undefined
  price?: number | undefined
  type?: string | undefined
  image?: string | undefined
  order?: number | undefined	
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
  modules?: Module[] | undefined
  ownerId?: number | undefined
  owner?: User | undefined
  availableProduct?: availableProduct[] | undefined
}
/**
 * State type
 */
export interface ProductState {
  readonly myProducts: Product[]
  readonly product: Product
  readonly loading: boolean
  readonly error: boolean
}
