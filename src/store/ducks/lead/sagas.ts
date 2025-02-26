import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadLeadRequest,
  loadLeadSuccess,
  loadLeadFailure,

  //Create
  createLeadRequest,
  createLeadSuccess,
  createLeadFailure,

  //Update
  confirmLeadRequest,
  confirmLeadSuccess,
  confirmLeadFailure,

  //Not Disturb
  notDisturbLeadRequest,
  notDisturbLeadSuccess,
  notDisturbLeadFailure,
} from './actions'

import {Lead} from './types'

//Load
export function* loadLead(payload: ReturnType<typeof loadLeadRequest>) {
  try {
    put(loadLeadRequest(payload.payload.email, payload.payload.list))
    const response: Lead = yield call(
      api.get,
      'lead/' + payload.payload.list + '/' + payload.payload.email
    )
    yield put(loadLeadSuccess(response))
  } catch (error: any) {
    yield put(loadLeadFailure(error.response.data))
  }
}

//Create
export function* createLead(payload: ReturnType<typeof createLeadRequest>) {
  console.log("Trying to create Lead..")
  try {
    put(createLeadRequest(payload.payload.newLead, payload.payload.emailMessage))
    const response: Lead = yield call(api.post, 'lead', payload.payload)
    yield put(createLeadSuccess(response))
  } catch (error: any) {
    console.log("ERRO", error)
    yield put(createLeadFailure(error.response.data))
  }
}

//Update
export function* confirmLead(payload: ReturnType<typeof confirmLeadRequest>) {
  try {
    put(confirmLeadRequest(payload.payload.email, payload.payload.list))
    const response: Lead = yield call(api.post, 'leadconfirm', payload.payload)
    yield put(confirmLeadSuccess(response))
  } catch (error: any) {
    yield put(confirmLeadFailure(error.response.data))
  }
}

//Delete
export function* notDisturbLead(payload: ReturnType<typeof notDisturbLeadRequest>) {
  try {
    put(notDisturbLeadRequest(payload.payload.email, payload.payload.list))
    const response: Lead = yield call(api.post, 'leadnotdisturb', payload.payload)
    yield put(notDisturbLeadSuccess(response))
  } catch (error: any) {
    yield put(notDisturbLeadFailure(error.response.data))
  }
}
