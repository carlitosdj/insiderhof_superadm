import {action} from 'typesafe-actions'
import {CartsTypes, Cart} from './types'


//Load
export const loadCartsRequest = (startDate?: string, endDate?: string, launchId?: string) => action(CartsTypes.LOAD_CARTS_REQUEST, { startDate, endDate, launchId }) 
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

//Update
export const updateCartRequest = (cart: Cart) => action(CartsTypes.UPDATE_CART_REQUEST, cart)
export const updateCartSuccess = (cart: Cart) => action(CartsTypes.UPDATE_CART_SUCCESS, cart)
export const updateCartFailure = (err: any[]) => action(CartsTypes.UPDATE_CART_FAILURE, err)

//Delete
export const deleteCartRequest = (id: number) => action(CartsTypes.DELETE_CART_REQUEST, id)
export const deleteCartSuccess = (cart: Cart) => action(CartsTypes.DELETE_CART_SUCCESS, cart)
export const deleteCartFailure = (err: any[]) => action(CartsTypes.DELETE_CART_FAILURE, err)

//Selected carts
export const selectCartsAddRequest = (data: Cart) => action(CartsTypes.SELECTED_CART_ADD, data)
export const selectCartsAddSuccess = (data: Cart) => action(CartsTypes.SELECTED_CART_ADD_SUCCESS, data)
export const selectCartsRemoveRequest = (data: Cart) => action(CartsTypes.SELECTED_CART_REMOVE, data)
export const selectCartsRemoveSuccess = (data: Cart) => action(CartsTypes.SELECTED_CART_REMOVE_SUCCESS, data)
