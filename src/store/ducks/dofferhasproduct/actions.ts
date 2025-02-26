import {action} from 'typesafe-actions'
import {OfferHasProductsTypes, OfferHasProducts} from './types'

export const reorderOfferHasProductsRequest = (data: OfferHasProducts[]) => action(OfferHasProductsTypes.REORDER_OFFERHASPRODUCTS, data)

//Load
export const loadOfferHasProductsRequest = (offerId: number) => action(OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_REQUEST, offerId)
export const loadOfferHasProductsSuccess = (data: OfferHasProducts) => action(OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_SUCCESS, data)
export const loadOfferHasProductsFailure = (err: any[]) => action(OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_FAILURE, err)

//Create
export const createOfferHasProductsRequest = (data: OfferHasProducts) => action(OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_REQUEST, data)
export const createOfferHasProductsSuccess = (data: OfferHasProducts) => action(OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_SUCCESS, data)
export const createOfferHasProductsFailure = (err: any[]) => action(OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_FAILURE, err)

//Update
export const updateOfferHasProductsRequest = (data: OfferHasProducts) => action(OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_REQUEST, data)
export const updateOfferHasProductsSuccess = (data: OfferHasProducts) => action(OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_SUCCESS, data)
export const updateOfferHasProductsFailure = (err: any[]) => action(OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_FAILURE, err)

//Delete
export const deleteOfferHasProductsRequest = (id: number) => action(OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_REQUEST, id)
export const deleteOfferHasProductsSuccess = (data: OfferHasProducts) => action(OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_SUCCESS, data)
export const deleteOfferHasProductsFailure = (err: any[]) => action(OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_FAILURE, err)
