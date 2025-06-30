
import { Launch } from "../dlaunch/types"
import { User } from "../me/types"
//import { Launch } from "../component/types"

/**
 * Action types
 */
export enum CartsTypes {
  //Load
  LOAD_CARTS_REQUEST = '@cart/LOAD_CARTS_REQUEST',
  LOAD_CARTS_SUCCESS = '@cart/LOAD_CARTS_SUCCESS',
  LOAD_CARTS_FAILURE = '@cart/LOAD_CARTS_FAILURE',
    
  //Load
  LOAD_CART_REQUEST = '@cart/LOAD_CART_REQUEST',
  LOAD_CART_SUCCESS = '@cart/LOAD_CART_SUCCESS',
  LOAD_CART_FAILURE = '@cart/LOAD_CART_FAILURE',

  //Create
  CREATE_CART_REQUEST = '@cart/CREATE_CART_REQUEST',
  CREATE_CART_SUCCESS = '@cart/CREATE_CART_SUCCESS',
  CREATE_CART_FAILURE = '@cart/CREATE_CART_FAILURE',

  //update
  UPDATE_CART_REQUEST = '@cart/UPDATE_CART_REQUEST',
  UPDATE_CART_SUCCESS = '@cart/UPDATE_CART_SUCCESS',
  UPDATE_CART_FAILURE = '@cart/UPDATE_CART_FAILURE',

  //delete
  DELETE_CART_REQUEST = '@cart/DELETE_CART_REQUEST',
  DELETE_CART_SUCCESS = '@cart/DELETE_CART_SUCCESS',
  DELETE_CART_FAILURE = '@cart/DELETE_CART_FAILURE',

  //Selected users
  SELECTED_CART_ADD = '@cart/SELECTED_CART_ADD',
  SELECTED_CART_ADD_SUCCESS = '@cart/SELECTED_CART_ADD_SUCCESS',
  SELECTED_CART_REMOVE = '@cart/SELECTED_CART_REMOVE',
  SELECTED_CART_REMOVE_SUCCESS = '@cart/SELECTED_CART_REMOVE_SUCCESS',

  
}

/**
 * Data types
 */
export interface Cart {
  id?: number
  parentComponent?: number
  parentUser?: number
  unityprice?: number
  quantity?: number
  discount?: number
  total?: number
  tax?: number
  createdAt?: number
  updatedAt?: number
  status?: string
  description?: string
  numcartao?: string
  nomecartao?: string
  validade?: string
  codcartao?: string
  parcelas?: number
  origin?: string

  gateway?: string
  paymentmethod?: string
  installments?: number
  price?: string
  launch?: Launch
  launchId?: number
  user?: User
  userId?: number
  idreference?: string
  notafiscal?: string

  total_paid_amount?: string ;
  net_received_amount?: string ;
  installment_amount?: string ;
  mercadopago_fee?: string ;
  financing_fee?: string ;
}

/**
 * State type
 */
export interface CartsState {
  readonly data: Cart[]
  readonly loading: boolean
  readonly error: boolean
  selectedCarts: Cart[]
  
}
