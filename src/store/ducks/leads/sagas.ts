import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadLeadsRequest,
  loadLeadsSuccess,
  loadLeadsFailure,

  //Search
  searchLeadsRequest,
  searchLeadsSuccess,
  searchLeadsFailure,

  //Lead Lists
  loadLeadListsRequest,
  loadLeadListsSuccess,
  loadLeadListsFailure,

  //Leads by list
  loadLeadsByListRequest,
  loadLeadsByListSuccess,
  loadLeadsByListFailure,

  //Export leads
  loadExportLeadsRequest,
  loadExportLeadsSuccess,
  loadExportLeadsFailure,
} from './actions'

import {Lead} from '../lead/types'

//Load
export function* loadLeads(payload: ReturnType<typeof loadLeadsRequest>) {
  try {
    put(loadLeadsRequest(payload.payload.page, payload.payload.take))
    const response: Lead[] = yield call(api.get, `lead/all/${payload.payload.page}/${payload.payload.take}`)
    yield put(loadLeadsSuccess(response))
  } catch (error: any) {
    yield put(loadLeadsFailure(error.response.data))
  }
}

//Search
export function* searchLeads(payload: ReturnType<typeof searchLeadsRequest>) {
  try {
    put(searchLeadsRequest(payload.payload))
    const response: Lead[] = yield call(api.get, 'lead/search/' + payload.payload)
    yield put(searchLeadsSuccess(response))
  } catch (error: any) {
    yield put(searchLeadsFailure(error.response.data))
  }
}

//Lead Lists
export function* loadLeadLists() {
  try {
    // @ts-ignore
    const response = yield call(api.get, 'lead/lists')
    yield put(loadLeadListsSuccess(response.data))
  } catch (error: any) {
    yield put(loadLeadListsFailure(error.response.data))
  }
}

//Leads by list
export function* loadLeadsByList(payload: ReturnType<typeof loadLeadsByListRequest>) {
  try {
    const response: Lead[] = yield call(api.get, 'lead/list/' + payload.payload)
    yield put(loadLeadsByListSuccess(response))
  } catch (error: any) {
    yield put(loadLeadsByListFailure(error.response.data))
  }
}

//Export leads
export function* loadExportLeads(payload: ReturnType<typeof loadExportLeadsRequest>) {
  try {
    // @ts-ignore
    const response = yield call(api.get, 'lead/list/' + payload.payload)
    yield put(loadExportLeadsSuccess(response.data))
  } catch (error: any) {
    yield put(loadExportLeadsFailure(error.response.data))
  }
}

