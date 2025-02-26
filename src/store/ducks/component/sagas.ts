import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadComponentRequest,
  loadComponentSuccess,
  loadComponentFailure,
  loadComponentByDescriptionRequest,
  loadComponentByDescriptionSuccess,
  loadComponentByDescriptionFailure,
  createComponentRequest,
  createComponentSuccess,
  createComponentFailure,
  updateComponentRequest,
  updateComponentSuccess,
  updateComponentFailure,
  deleteComponentRequest,
  deleteComponentSuccess,
  deleteComponentFailure,
  createExtraRequest,
  createExtraSuccess,
  createExtraFailure,
  updateExtraRequest,
  updateExtraSuccess,
  updateExtraFailure,
  // uploadExtraRequest,
  // uploadExtraSuccess,
  // uploadExtraFailure,
  deleteExtraRequest,
  deleteExtraSuccess,
  deleteExtraFailure,
  loadModulesRequest,
  loadModulesSuccess,
  loadModulesFailure,
  loadClassesRequest,
  loadClassesSuccess,
  loadClassesFailure,
  createAulaConcluidaFailure,
  createAulaConcluidaRequest,
  createAulaConcluidaSuccess,
  deleteAulaConcluidaFailure,
  deleteAulaConcluidaRequest,
  deleteAulaConcluidaSuccess,
  loadLastClassRequest,
  loadLastClassSuccess,
  loadLastClassFailure,
  loadComponentWithAccessRequest,
  loadComponentWithAccessSuccess,
  loadComponentWithAccessFailure,
  createComponentAccessRequest,
  createComponentAccessSuccess,
  updateComponentAccessRequest,
  updateComponentAccessSuccess,
  updateComponenAccesstFailure,
  createLaunchRequest,
  createLaunchFailure,
  createLaunchSuccess,
  // loadCourseRequest,
} from './actions'

import {Component, ComponentAccess} from './types'
import {AulaConcluida} from '../aulaconcluida/types'

// import { loadExtrasSuccess } from '../extras/actions'
import {Extras} from '../extras/types'
// import axios from 'axios';

//Load Component
export function* loadComponent(payload: ReturnType<typeof loadComponentRequest>) {
  try {
    put(loadComponentRequest(payload.payload.id, payload.payload.sort))
    //const response: Component = yield call(api.get, 'component/id/' + payload.payload.id + '/' + payload.payload.sort)
    const response: Component = yield call(api.get, 'component/id/' + payload.payload.id + '/' + payload.payload.sort)
    yield put(loadComponentSuccess(response))
  } catch (error: any) {
    yield put(loadComponentFailure(error.response.data))
  }
}

export function* loadComponentWithAccess(
  payload: ReturnType<typeof loadComponentWithAccessRequest>
) {
  try {
    put(
      loadComponentWithAccessRequest(
        payload.payload.id,
        payload.payload.userId,
        payload.payload.sort
      )
    )
    const response: Component = yield call(
      api.get,
      'component/mycourses/' +
        payload.payload.id +
        '/' +
        payload.payload.userId +
        '/' +
        payload.payload.sort
    )
    yield put(loadComponentWithAccessSuccess(response))
  } catch (error: any) {
    yield put(loadComponentWithAccessFailure(error.response.data))
  }
}

//Load Modules
export function* loadModules(payload: ReturnType<typeof loadModulesRequest>) {
  try {
    put(loadModulesRequest(payload.payload.id, payload.payload.user_id, payload.payload.numTurma))
    const response: Component = yield call(
      api.get,
      'components/modules/' +
        payload.payload.id +
        '/' +
        payload.payload.user_id +
        '/' +
        payload.payload.numTurma
    )
    yield put(loadModulesSuccess(response))
  } catch (error: any) {
    yield put(loadModulesFailure(error.response.data))
  }
}

//Load Classes
export function* loadClasses(payload: ReturnType<typeof loadClassesRequest>) {
  // console.log("loadComponent SAGA", payload)
  try {
    put(loadClassesRequest(payload.payload.id, payload.payload.user_id))
    const response: Component = yield call(
      api.get,
      'components/classes/' + payload.payload.id + '/' + payload.payload.user_id
    )
    yield put(loadClassesSuccess(response))
  } catch (error: any) {
    yield put(loadClassesFailure(error.response.data))
  }
}

export function* loadLastClass(payload: ReturnType<typeof loadLastClassRequest>) {
  //console.log("loadLASTClass SAGA", payload)
  try {
    put(loadLastClassRequest(payload.payload.user_id))
    const response: Component = yield call(
      api.get,
      'component/lastclassattended/' + payload.payload.user_id //done
    )
    yield put(loadLastClassSuccess(response))
  } catch (error: any) {
    yield put(loadLastClassFailure(error.response.data))
  }
}

//Load Course:
// export function* loadCourse(payload:ReturnType<typeof loadCourseRequest>) {
//     // console.log("loadComponent SAGA", payload)
//     try {

//         put(loadComponentRequest(payload.payload))
//         const response : Component = yield call(api.get, 'readCourse/'+payload.payload);
//         yield put(loadComponentSuccess(response));

//     } catch (error) {
//         yield put(loadComponentFailure());
//     }
// }

//Load Component by Description
export function* loadComponentByDescription(
  payload: ReturnType<typeof loadComponentByDescriptionRequest>
) {
  try {
    put(loadComponentByDescriptionRequest(payload.payload))
    const response: Component = yield call(api.get, 'component/description/' + payload.payload)
    yield put(loadComponentByDescriptionSuccess(response))
  } catch (error: any) {
    yield put(loadComponentByDescriptionFailure(error.response.data))
  }
}

//Create Component
export function* createComponent(payload: ReturnType<typeof createComponentRequest>) {
  try {
    const response: Component = yield call(api.post, 'component', payload.payload)
    yield put(createComponentSuccess(response))
  } catch (error: any) {
    yield put(createComponentFailure(error.response.data))
  }
}

export function* createLaunch(payload: ReturnType<typeof createLaunchRequest>) {
  try {
    put(createLaunchRequest(payload.payload))
    console.log("PAYLOAD", payload.payload)
    const response: Component = yield call(api.post, 'component/launch', payload.payload)
    yield put(createLaunchSuccess(response))
  } catch (error: any) {
    yield put(createLaunchFailure(error.response.data))
  }
}

export function* createComponentAccess(payload: ReturnType<typeof createComponentAccessRequest>) {
  try {
    const response: ComponentAccess = yield call(api.post, 'componentaccess', payload.payload)
    console.log("RESPONSE", response)
    yield put(createComponentAccessSuccess(response))
  } catch (error: any) {
    yield put(createComponentFailure(error.response.data))
  }
}

//Update Component
export function* updateComponent(payload: ReturnType<typeof updateComponentRequest>) {
  try {
    put(updateComponentRequest(payload.payload))
    const response: Component = yield call(
      api.patch,
      'component/' + payload.payload.id,
      payload.payload
    )
    yield put(updateComponentSuccess(response))
  } catch (error: any) {
    yield put(updateComponentFailure(error.response.data))
  }
}

export function* updateComponentAccess(payload: ReturnType<typeof updateComponentAccessRequest>) {
  try {
    put(updateComponentAccessRequest(payload.payload))
    const response: ComponentAccess = yield call(
      api.patch,
      'componentaccess/' + payload.payload.id,
      payload.payload
    )
    yield put(updateComponentAccessSuccess(response))
  } catch (error: any) {
    yield put(updateComponenAccesstFailure(error.response.data))
  }
}

//Delete Component
export function* deleteComponent(payload: ReturnType<typeof deleteComponentRequest>) {
  try {
    const number: number = yield call(api.delete, 'component/' + payload.payload)
    yield put(deleteComponentSuccess(number))
  } catch (error: any) {
    yield put(deleteComponentFailure(error.response.data))
  }
}

////////////////////////////////////////// EXTRAS //////////////////////////////////////////

//Create Extra
export function* createExtra(payload: ReturnType<typeof createExtraRequest>) {
  try {
    console.log('aqui', payload.payload)
    const response: Extras = yield call(api.post, 'componentextra', payload.payload)
    yield put(createExtraSuccess(response))
  } catch (error: any) {
    yield put(createExtraFailure(error.response.data))
  }
}

// export function* uploadExtra(payload:ReturnType<typeof uploadExtraRequest>) {
//     try {
//         console.log("--------UPLOAD EXTRA------ ################PAYLOOOOOOOOOAD", payload)

//         // put(updateExtraRequest(payload.payload))
//         // const response : Extras = yield call(api.post, 'upload', payload.payload, { });
//         const response : Extras = yield axios.post("http://localhost:8887/upload", payload, { });
//         yield put(createExtraSuccess(response));
//         yield console.log('response', response)
//     } catch (error) {
//         yield put(createExtraFailure(error));
//     }
// }

//Update Extra
export function* updateExtra(payload: ReturnType<typeof updateExtraRequest>) {
  try {
    put(updateExtraRequest(payload.payload))
    const response: Extras = yield call(
      api.patch,
      'componentextra/' + payload.payload.id,
      payload.payload
    )
    yield put(updateExtraSuccess(response))
  } catch (error: any) {
    yield put(updateExtraFailure(error.response.data))
  }
}

//Delete Extra
export function* deleteExtra(payload: ReturnType<typeof deleteExtraRequest>) {
  try {
    console.log('VER AQUI xxxxx', payload.payload)
    const number: number = yield call(api.delete, 'componentextra/' + payload.payload)
    yield put(deleteExtraSuccess(number))
  } catch (error: any) {
    yield put(deleteExtraFailure(error.response.data))
  }
}

//Concluir Aula Concluida
export function* createAulaConcluida(payload: ReturnType<typeof createAulaConcluidaRequest>) {
  try {
    put(
      createAulaConcluidaRequest(
        payload.payload.user_id,
        payload.payload.componentId,
        payload.payload.parent_id
      )
    )
    const response: AulaConcluida = yield call(api.post, 'aulaconcluida', payload.payload)
    yield put(createAulaConcluidaSuccess(response, payload.payload.parent_id))
  } catch (error: any) {
    yield put(createAulaConcluidaFailure(error.response.data))
  }
}

//Delete Aula Concluida
export function* deleteAulaConcluida(payload: ReturnType<typeof deleteAulaConcluidaRequest>) {
  try {
    const number: number = yield call(api.delete, 'aulaconcluida/' + payload.payload.id)
    yield put(deleteAulaConcluidaSuccess(number, payload.payload.aula))
  } catch (error: any) {
    yield put(deleteAulaConcluidaFailure(error.response.data))
  }
}
