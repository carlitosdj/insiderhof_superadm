import {action} from 'typesafe-actions'
import {OffersTypes, Offer} from './types'

export const reorderOffersRequest = (data: Offer[]) => action(OffersTypes.REORDER_OFFERS, data)

//Load
export const loadOfferRequest = (offerId: number) => action(OffersTypes.LOAD_OFFER_REQUEST, offerId)
export const loadOfferSuccess = (data: Offer) => action(OffersTypes.LOAD_OFFER_SUCCESS, data)
export const loadOfferFailure = (err: any[]) => action(OffersTypes.LOAD_OFFER_FAILURE, err)

//Load
export const loadMyOffersRequest = (userId: number) => action(OffersTypes.LOAD_MYOFFERS_REQUEST, userId)
export const loadMyOffersSuccess = (data: Offer[]) => action(OffersTypes.LOAD_MYOFFERS_SUCCESS, data)
export const loadMyOffersFailure = (err: any[]) => action(OffersTypes.LOAD_MYOFFERS_FAILURE, err)

//Create
export const createOfferRequest = (data: Offer) => action(OffersTypes.CREATE_OFFER_REQUEST, data)
export const createOfferSuccess = (data: Offer) => action(OffersTypes.CREATE_OFFER_SUCCESS, data)
export const createOfferFailure = (err: any[]) => action(OffersTypes.CREATE_OFFER_FAILURE, err)

//Update
export const updateOfferRequest = (data: Offer) => action(OffersTypes.UPDATE_OFFER_REQUEST, data)
export const updateOfferSuccess = (data: Offer) => action(OffersTypes.UPDATE_OFFER_SUCCESS, data)
export const updateOfferFailure = (err: any[]) => action(OffersTypes.UPDATE_OFFER_FAILURE, err)

//Delete
export const deleteOfferRequest = (id: number) => action(OffersTypes.DELETE_OFFER_REQUEST, id)
export const deleteOfferSuccess = (data: Offer) => action(OffersTypes.DELETE_OFFER_SUCCESS, data)
export const deleteOfferFailure = (err: any[]) => action(OffersTypes.DELETE_OFFER_FAILURE, err)
