import {action} from 'typesafe-actions'
import {LaunchHasOfferTypes, LaunchHasOffers} from './types'

export const reorderLaunchHasOffersRequest = (data: LaunchHasOffers[]) => action(LaunchHasOfferTypes.REORDER_LAUNCHHASOFFERS, data)


//Load
export const loadLaunchHasOffersRequest = (LaunchId: number) => action(LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_REQUEST, LaunchId)
export const loadLaunchHasOffersSuccess = (data: LaunchHasOffers) => action(LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_SUCCESS, data)
export const loadLaunchHasOffersFailure = (err: any[]) => action(LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_FAILURE, err)

//Create
export const createLaunchHasOffersRequest = (data: LaunchHasOffers) => action(LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_REQUEST, data)
export const createLaunchHasOffersSuccess = (data: LaunchHasOffers) => action(LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_SUCCESS, data)
export const createLaunchHasOffersFailure = (err: any[]) => action(LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_FAILURE, err)

//Update
export const updateLaunchHasOffersRequest = (data: LaunchHasOffers) => action(LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_REQUEST, data)
export const updateLaunchHasOffersSuccess = (data: LaunchHasOffers) => action(LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_SUCCESS, data)
export const updateLaunchHasOffersFailure = (err: any[]) => action(LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_FAILURE, err)

//Delete
export const deleteLaunchHasOffersRequest = (id: number) => action(LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_REQUEST, id)
export const deleteLaunchHasOffersSuccess = (data: LaunchHasOffers) => action(LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_SUCCESS, data)
export const deleteLaunchHasOffersFailure = (err: any[]) => action(LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_FAILURE, err)
