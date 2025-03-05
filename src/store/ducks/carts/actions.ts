import {action} from 'typesafe-actions'
import {CartsTypes, Cart} from './types'


//Load
export const loadCartsRequest = () => action(CartsTypes.LOAD_CARTS_REQUEST)
export const loadCartsSuccess = (data: Cart[]) => action(CartsTypes.LOAD_CARTS_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadCartsFailure = (err: any[]) => action(CartsTypes.LOAD_CARTS_FAILURE, err)

//Load
export const loadCartRequest = (userId: number) => action(CartsTypes.LOAD_CART_REQUEST, userId)
export const loadCartSuccess = (data: Cart[]) => action(CartsTypes.LOAD_CART_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadCartFailure = (err: any[]) => action(CartsTypes.LOAD_CART_FAILURE, err)

//Create
export const createCartRequest = (newCart: Cart) => action(CartsTypes.CREATE_CART_REQUEST, newCart)
export const createCartSuccess = (cart: Cart) => action(CartsTypes.CREATE_CART_SUCCESS, cart)
export const createCartFailure = (err: any[]) => action(CartsTypes.CREATE_CART_SUCCESS, err)
