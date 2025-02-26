import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Login
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  // authfromcookie,
  // logoutUser,

  //Update
  updateMeRequest,
  updateMeSuccess,
  updateMeFailure,

  //Create
  createMeRequest,
  createMeSuccess,
  createMeFailure,

  //Delete
  deleteMeRequest,
  deleteMeSuccess,
  deleteMeFailure,

  //Recovery
  recoveryUserRequest,
  recoveryUserSuccess,
  recoveryUserFailure,

  //Load me
  loadMeRequest,
  loadMeSuccess,
  loadMeFailure,
} from './actions'
import {User} from './types'
import axios from 'axios'

//Login
export function* loginUser(payload: ReturnType<typeof loginUserRequest>) {
  try {
    const response: User = yield call(api.post, 'auth/loginadm', payload.payload) //Payload.payload está ok
    
    console.log('response', response.data.access_token)

    //Guarda o Token na LocalStorage
    localStorage.setItem('TOKEN', response.data.access_token)

    //Get user informations
    const responseB: User = yield call(api.get, 'auth/profile')
    console.log("response B", responseB)
    yield put(loginUserSuccess(responseB))

    
    //window.location.reload()
  } catch (error: any) {
    yield put(loginUserFailure(error.response.data))
  }
}

//Recovery
export function* recoveryUser(payload: ReturnType<typeof recoveryUserRequest>) {
  try {
    const response: string = yield call(api.post, 'recovery', {email: payload.payload}) //Payload.payload está ok
    yield put(recoveryUserSuccess(response))
  } catch (error: any) {
    yield put(recoveryUserFailure(error.response.data))
  }
}

//Load me
export function* loadMe(payload: ReturnType<typeof loadMeRequest>) {
  try {
    const response: User = yield call(api.post, 'userrecovery', payload.payload)
    yield put(loadMeSuccess(response))
  } catch (error: any) {
    yield put(loadMeFailure(error.response.data))
  }
}

//Create
export function* createMe(payload: ReturnType<typeof createMeRequest>) {
  try {
    put(createMeRequest(payload.payload))
    const response: User = yield call(api.post, 'users', payload.payload)
    yield put(createMeSuccess(response))
  } catch (error: any) {
    yield put(createMeFailure(error.response.data))
  }
}

//Update
export function* updateMe(payload: ReturnType<typeof updateMeRequest>) {
  try {
    const response: User = yield call(api.post, 'users', payload.payload)
    yield put(updateMeSuccess(response))
  } catch (error: any) {
    yield put(updateMeFailure(error.response.data))
  }
}

//Delete
export function* deleteMe(payload: ReturnType<typeof deleteMeRequest>) {
  try {
    const response: User = yield call(api.delete, 'users/' + payload.payload)
    yield put(deleteMeSuccess(response))
  } catch (error: any) {
    yield put(deleteMeFailure(error.response.data))
  }
}
