import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //All
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersFailure,

  //single
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,

  //Search
  searchUserRequest,
  searchUserSuccess,
  searchUserFailure,

  //Create
  createUserRequest,
  createUserSuccess,
  createUserFailure,

  //Update
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,

  //Delete
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserRequest,
  selectUsersAddRequest,
  selectUsersRemoveRequest,
  selectUsersAddSuccess,
  selectUsersRemoveSuccess,
  filterUserRequest,
  filterUserSuccess,
  filterUserFailure,
} from './actions'

import {User} from '../me/types'

//Load all users from api
export function* loadUsers(payload: ReturnType<typeof loadUsersRequest>) {
  try {
    put(loadUsersRequest(payload.payload.page, payload.payload.take, payload.payload.hasCart, payload.payload.startDate, payload.payload.endDate))
    let response: User[];
    if(payload.payload.startDate && payload.payload.endDate) {
      response = yield call(
        api.get,
        `user/all/${payload.payload.page}/${payload.payload.take}/${payload.payload.hasCart}/${payload.payload.startDate}/${payload.payload.endDate}`,
      )
    } else {
       response = yield call(
        api.get,
        `user/all/${payload.payload.page}/${payload.payload.take}/${payload.payload.hasCart}`,
      )
    }
    
    console.log('Response', response)
    yield put(loadUsersSuccess(response))
  } catch (error: any) {
    yield put(loadUsersFailure(error.response.data))
  }
}

//Find one user by id from api:
export function* loadUser(payload: ReturnType<typeof loadUserRequest>) {
    try {
        put(loadUserRequest(payload.payload))
        const response : User[] = yield call(api.get, 'user/id/'+payload.payload);
        yield put(loadUserSuccess(response));
        yield console.log('response*****USER', response)
    } catch (error: any) {
        yield put(loadUserFailure(error.response.data));
    }
}


const containsOnlyDigits = (str: any) => {
  return !isNaN(str) && !isNaN(parseFloat(str))
}

//Search many users from search api
export function* searchUser(payload: ReturnType<typeof searchUserRequest>) {
  try {
    put(searchUserRequest(payload.payload))

    let response: User[]
    if (containsOnlyDigits(payload.payload)) {
      response = yield call(api.get, 'user/searchbylaunch/' + payload.payload)
    } else {
      response = yield call(api.get, 'user/search/' + payload.payload)
    }

    yield put(searchUserSuccess(response))
    console.log('response', response)
  } catch (error: any) {
    console.log('errorya', error)
    yield put(searchUserFailure(error.response.data))
  }
}

//Filter
export function* filterUser(payload: ReturnType<typeof filterUserRequest>) {
  try {
    console.log('PAYLOAD', payload.payload)
    put(filterUserRequest(payload.payload.startDate, payload.payload.endDate))
    const response: User[] = yield call(
      api.get,
      'user/filter/' + payload.payload.startDate + '/' + payload.payload.endDate
    )
    yield put(filterUserSuccess(response))
  } catch (error: any) {
    yield put(filterUserFailure(error.response.data))
  }
}

//Create
export function* createUser(payload: ReturnType<typeof createUserRequest>) {
  try {
    console.log('Payload', payload)
    put(createUserRequest(payload.payload))
    const response: User = yield call(api.post, 'user', payload.payload)
    yield put(createUserSuccess(response))
  } catch (error: any) {
    console.log('ERror', error)
    yield put(createUserFailure(error.response.data))
  }
}

//Update
export function* updateUser(payload: ReturnType<typeof updateUserRequest>) {
  try {
    // put(updateUserRequest(payload.payload))
    const response: User = yield call(api.patch, 'user/' + payload.payload.id, payload.payload)
    yield put(updateUserSuccess(response))
  } catch (error: any) {
    yield put(updateUserFailure(error.response.data))
  }
}

//Delete
export function* deleteUser(payload: ReturnType<typeof deleteUserRequest>) {
  try {
    const response: User = yield call(api.delete, 'user/' + payload.payload)
    yield put(deleteUserSuccess(response))
  } catch (error: any) {
    yield put(deleteUserFailure(error.response.data))
  }
}

//SelectedUser
export function* selectUsersAdd(payload: ReturnType<typeof selectUsersAddRequest>) {
  try {
    //const response: User = yield call(api.delete, 'users/' + payload.payload)
    console.log('PAYLOAD', payload)
    yield put(selectUsersAddSuccess(payload.payload))
  } catch (error: any) {
    //yield put(deleteUserFailure())
    console.log('ERrro', error.response.data)
  }
}

//SelectedUser
export function* selectUsersRemove(payload: ReturnType<typeof selectUsersRemoveRequest>) {
  try {
    //const response: User = yield call(api.delete, 'users/' + payload.payload)
    yield put(selectUsersRemoveSuccess(payload.payload))
  } catch (error: any) {
    //yield put(deleteUserFailure())
    console.log('ERrro', error.response.data)
  }
}
