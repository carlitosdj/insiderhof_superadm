import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadModulesRequest,
  loadModulesSuccess,
  loadModulesFailure,

  loadModuleRequest,
  loadModuleSuccess,
  loadModuleFailure,

  createModuleRequest,
  createModuleSuccess,
  createModuleFailure,

  updateModuleRequest,
  updateModuleSuccess,
  updateModuleFailure,

  deleteModuleRequest,
  deleteModuleSuccess,
  deleteModuleFailure,

} from './actions'

import {Module} from './types'


export function* loadModules(payload: ReturnType<typeof loadModulesRequest>) {
  try {
    put(loadModulesRequest(payload.payload))
    const response: Module[] = yield call(api.get, 'module/product/' + payload.payload)
    yield put(loadModulesSuccess(response))
  } catch (error: any) {
    yield put(loadModulesFailure(error.response.data))
  }
}


export function* loadModule(payload: ReturnType<typeof loadModuleRequest>) {
  try {
    put(loadModuleRequest(payload.payload))
    const response: Module = yield call(api.get, 'module/' + payload.payload)
    yield put(loadModuleSuccess(response))
  } catch (error: any) {
    yield put(loadModuleFailure(error.response.data))
  }
}


//Create
export function* createModule(payload: ReturnType<typeof createModuleRequest>) {
  try {
    put(createModuleRequest(payload.payload))
    const response: Module = yield call(api.post, 'module', payload.payload)
    yield put(createModuleSuccess(response))
  } catch (error: any) {
    yield put(createModuleFailure(error.response.data))
  }
}


//Update
export function* updateModule(payload: ReturnType<typeof updateModuleRequest>) {
  try {
    put(updateModuleRequest(payload.payload))
    const response: Module = yield call(api.patch, 'module/' + payload.payload.id, payload.payload)
    console.log("response----", response)
    yield put(updateModuleSuccess(response))
  } catch (error: any) {
    yield put(updateModuleFailure(error.response.data))
  }
}


//Delete
export function* deleteModule(payload: ReturnType<typeof deleteModuleRequest>) {
  try {
    put(deleteModuleRequest(payload.payload))
    const response: Module = yield call(api.delete, 'module/' + payload.payload)
    yield put(deleteModuleSuccess(response))
  } catch (error: any) {
    yield put(deleteModuleFailure(error.response.data))
  }
}
