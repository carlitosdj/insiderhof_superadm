import { User } from "../../../app/modules/apps/user-management/users-list/core/_models"
import { Launch } from "../component/types"

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
  price?: number
  launch?: Launch
  user?: User
  idreference?: string
}

/**
 * State type
 */
export interface CartsState {
  readonly data: Cart[]
  readonly loading: boolean
  readonly error: boolean
}
