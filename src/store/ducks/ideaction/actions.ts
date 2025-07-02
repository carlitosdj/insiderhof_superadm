import { action } from 'typesafe-actions';
import { IdeactionTypes, Ideaction } from './types';



// Reorder ideactions
export const reorderIdeactionsRequest = (data: Ideaction[]) => action(IdeactionTypes.REORDER_IDEACTIONS, data);

// Load ideactions by owner
export const loadMyIdeactionsRequest = (ownerId: number) => action(IdeactionTypes.LOAD_MY_IDEACTIONS_REQUEST, ownerId);
export const loadMyIdeactionsSuccess = (data: Ideaction[]) => action(IdeactionTypes.LOAD_MY_IDEACTIONS_SUCCESS, data);
export const loadMyIdeactionsFailure = (err: any[]) => action(IdeactionTypes.LOAD_MY_IDEACTIONS_FAILURE, err);

// Load single ideaction
export const loadIdeactionRequest = (id: number) => action(IdeactionTypes.LOAD_IDEACTION_REQUEST, id);
export const loadIdeactionSuccess = (data: Ideaction) => action(IdeactionTypes.LOAD_IDEACTION_SUCCESS, data);
export const loadIdeactionFailure = (err: any[]) => action(IdeactionTypes.LOAD_IDEACTION_FAILURE, err);

// Create ideaction
export const createIdeactionRequest = (data: Ideaction) => action(IdeactionTypes.CREATE_IDEACTION_REQUEST, data);
export const createIdeactionSuccess = (data: Ideaction) => action(IdeactionTypes.CREATE_IDEACTION_SUCCESS, data);
export const createIdeactionFailure = (err: any[]) => action(IdeactionTypes.CREATE_IDEACTION_FAILURE, err);

// Update ideaction
export const updateIdeactionRequest = (data: Ideaction) => action(IdeactionTypes.UPDATE_IDEACTION_REQUEST, data);
export const updateIdeactionSuccess = (data: Ideaction) => action(IdeactionTypes.UPDATE_IDEACTION_SUCCESS, data);
export const updateIdeactionFailure = (err: any[]) => action(IdeactionTypes.UPDATE_IDEACTION_FAILURE, err);

// Delete ideaction
export const deleteIdeactionRequest = (id: number) => action(IdeactionTypes.DELETE_IDEACTION_REQUEST, id);
export const deleteIdeactionSuccess = (data: Ideaction) => action(IdeactionTypes.DELETE_IDEACTION_SUCCESS, data);
export const deleteIdeactionFailure = (err: any[]) => action(IdeactionTypes.DELETE_IDEACTION_FAILURE, err);

