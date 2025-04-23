import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //All
  loadPreUsersRequest,
  loadPreUsersSuccess,
  loadPreUsersFailure,

  //single
  loadPreUserRequest,
  loadPreUserSuccess,
  loadPreUserFailure,

  //Search
  searchPreUserRequest,
  searchPreUserSuccess,
  searchPreUserFailure,

  //Create
  createPreUserRequest,
  createPreUserSuccess,
  createPreUserFailure,

  //Update
  updatePreUserRequest,
  updatePreUserSuccess,
  updatePreUserFailure,

  //Delete
  deletePreUserSuccess,
  deletePreUserFailure,
  deletePreUserRequest,
  selectPreUsersAddRequest,
  selectPreUsersRemoveRequest,
  selectPreUsersAddSuccess,
  selectPreUsersRemoveSuccess,
  filterPreUserRequest,
  filterPreUserSuccess,
  filterPreUserFailure,
} from './actions'
import { PreUser } from './types'



//Load all users from api
export function* loadPreUsers(payload: ReturnType<typeof loadPreUsersRequest>) {
  try {
    put(loadPreUsersRequest(payload.payload.page, payload.payload.take))
    const response: PreUser[] = yield call(
      api.get,
      `preuser/all/${payload.payload.page}/${payload.payload.take}`
    )
    console.log('Response', response)
    yield put(loadPreUsersSuccess(response))
  } catch (error: any) {
    yield put(loadPreUsersFailure(error.response.data))
  }
}

//Find one user by id from api:
export function* loadPreUser(payload: ReturnType<typeof loadPreUserRequest>) {
    try {
        put(loadPreUserRequest(payload.payload))
        const response : PreUser[] = yield call(api.get, 'preuser/id/'+payload.payload);
        yield put(loadPreUserSuccess(response));
        yield console.log('response*****USER', response)
    } catch (error: any) {
        yield put(loadPreUserFailure(error.response.data));
    }
}


const containsOnlyDigits = (str: any) => {
  return !isNaN(str) && !isNaN(parseFloat(str))
}

//Search many users from search api
export function* searchPreUser(payload: ReturnType<typeof searchPreUserRequest>) {
  try {
    put(searchPreUserRequest(payload.payload))

    let response: PreUser[]
    if (containsOnlyDigits(payload.payload)) {
      response = yield call(api.get, 'preuser/searchbylaunch/' + payload.payload)
    } else {
      response = yield call(api.get, 'preuser/search/' + payload.payload)
    }

    yield put(searchPreUserSuccess(response))
    console.log('response', response)
  } catch (error: any) {
    console.log('errorya', error)
    yield put(searchPreUserFailure(error.response.data))
  }
}

//Filter
export function* filterPreUser(payload: ReturnType<typeof filterPreUserRequest>) {
  try {
    console.log('PAYLOAD', payload.payload)
    put(filterPreUserRequest(payload.payload.startDate, payload.payload.endDate))
    const response: PreUser[] = yield call(
      api.get,
      'preuser/filter/' + payload.payload.startDate + '/' + payload.payload.endDate
    )
    yield put(filterPreUserSuccess(response))
  } catch (error: any) {
    yield put(filterPreUserFailure(error.response.data))
  }
}

//Create
export function* createPreUser(payload: ReturnType<typeof createPreUserRequest>) {
  try {
    console.log('Payload', payload)
    put(createPreUserRequest(payload.payload))
    const response: PreUser = yield call(api.post, 'user', payload.payload)
    yield put(createPreUserSuccess(response))
  } catch (error: any) {
    console.log('ERror', error)
    yield put(createPreUserFailure(error.response.data))
  }
}

//Update
export function* updatePreUser(payload: ReturnType<typeof updatePreUserRequest>) {
  try {
    // put(updatePreUserRequest(payload.payload))
    const response: PreUser = yield call(api.patch, 'user/' + payload.payload.id, payload.payload)
    yield put(updatePreUserSuccess(response))
  } catch (error: any) {
    yield put(updatePreUserFailure(error.response.data))
  }
}

//Delete
export function* deletePreUser(payload: ReturnType<typeof deletePreUserRequest>) {
  try {
    const response: PreUser = yield call(api.delete, 'user/' + payload.payload)
    yield put(deletePreUserSuccess(response))
  } catch (error: any) {
    yield put(deletePreUserFailure(error.response.data))
  }
}

//SelectedPreUser
export function* selectPreUsersAdd(payload: ReturnType<typeof selectPreUsersAddRequest>) {
  try {
    //const response: PreUser = yield call(api.delete, 'users/' + payload.payload)
    console.log('PAYLOAD', payload)
    yield put(selectPreUsersAddSuccess(payload.payload))
  } catch (error: any) {
    //yield put(deletePreUserFailure())
    console.log('ERrro', error.response.data)
  }
}

//SelectedPreUser
export function* selectPreUsersRemove(payload: ReturnType<typeof selectPreUsersRemoveRequest>) {
  try {
    //const response: PreUser = yield call(api.delete, 'users/' + payload.payload)
    yield put(selectPreUsersRemoveSuccess(payload.payload))
  } catch (error: any) {
    //yield put(deletePreUserFailure())
    console.log('ERrro', error.response.data)
  }
}
