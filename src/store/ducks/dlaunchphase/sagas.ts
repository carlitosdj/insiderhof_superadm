import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyLaunchPhasesRequest,
  loadMyLaunchPhasesSuccess,
  loadMyLaunchPhasesFailure,

  loadLaunchPhasesRequest,
  loadLaunchPhasesSuccess,
  loadLaunchPhasesFailure,

  createLaunchPhasesRequest,
  createLaunchPhasesSuccess,
  createLaunchPhasesFailure,

  updateLaunchPhasesRequest,
  updateLaunchPhasesSuccess,
  updateLaunchPhasesFailure,

  deleteLaunchPhasesRequest,
  deleteLaunchPhasesSuccess,
  deleteLaunchPhasesFailure,

  loadPhaseStatisticsRequest,
  loadPhaseStatisticsSuccess,
  loadPhaseStatisticsFailure,

} from './actions'

import {LaunchPhases} from './types'

//Load
export function* loadLaunchPhase(payload: ReturnType<typeof loadLaunchPhasesRequest>) {
  console.log("chamei", payload)
  try {
    console.log("chamei", payload)
    put(loadLaunchPhasesRequest(payload.payload))
    const response: LaunchPhases = yield call(api.get, 'launchphase/' + payload.payload)
    console.log("RESPONSE????", response)
    yield put(loadLaunchPhasesSuccess(response))
  } catch (error: any) {
    yield put(loadLaunchPhasesFailure(error.response.data))
  }
}

export function* loadMyLaunchPhase(payload: ReturnType<typeof loadMyLaunchPhasesRequest>) {
  try {
    put(loadMyLaunchPhasesRequest(payload.payload))
    const response: LaunchPhases[] = yield call(api.get, 'launchphase/launch/' + payload.payload)
    yield put(loadMyLaunchPhasesSuccess(response))
  } catch (error: any) {
    yield put(loadMyLaunchPhasesFailure(error.response.data))
  }
}



//Create
export function* createLaunchPhase(payload: ReturnType<typeof createLaunchPhasesRequest>) {
  try {
    put(createLaunchPhasesRequest(payload.payload))
    console.log("CHAMOOUUU?????????", payload.payload)	
    const response: LaunchPhases = yield call(api.post, 'launchphase', payload.payload)
    console.log("***********RESPONSE????", response)

    yield put(createLaunchPhasesSuccess(response))
  } catch (error: any) {
    yield put(createLaunchPhasesFailure(error.response.data))
  }
}

//Update
export function* updateLaunchPhase(payload: ReturnType<typeof updateLaunchPhasesRequest>) {
  try {
    put(updateLaunchPhasesRequest(payload.payload))
    const response: LaunchPhases = yield call(api.patch, 'launchphase/' + payload.payload.id, payload.payload)
    yield put(updateLaunchPhasesSuccess(response))
  } catch (error: any) {
    yield put(updateLaunchPhasesFailure(error.response.data))
  }
}

//Delete
export function* deleteLaunchPhase(payload: ReturnType<typeof deleteLaunchPhasesRequest>) {
  try {
    put(deleteLaunchPhasesRequest(payload.payload))
    const response: LaunchPhases = yield call(api.delete, 'launchphase/' + payload.payload)
    yield put(deleteLaunchPhasesSuccess(response))
  } catch (error: any) {
    yield put(deleteLaunchPhasesFailure(error.response.data))
  }
}

//Statistics
export function* loadPhaseStatistics(payload: ReturnType<typeof loadPhaseStatisticsRequest>): Generator {
  try {
    // PRIMEIRO: Tentar endpoint original para manter funcionamento
    console.log('🔍 SAGA: Trying original endpoint first...')
    const originalResponse: any = yield call(api.get, `launch-answer/statistics/phase/${payload.payload}`)
    console.log('📊 SAGA: Original endpoint response:', originalResponse)
    
    let finalData = originalResponse.data || {}
    
    // SEGUNDO: Tentar buscar dados UTM do lead-scoring
    try {
      console.log('🎯 SAGA: Trying to get UTM data from lead-scoring endpoint...')
      const utmResponse: any = yield call(api.get, `lead-scoring/report/phase/${payload.payload}`)
      console.log('📈 SAGA: Lead-scoring UTM response:', utmResponse)
      
      // Adicionar UTM data ao response original se existir
      if (utmResponse.data?.utmAdBreakdown) {
        finalData = {
          ...finalData,
          utmAdBreakdown: utmResponse.data.utmAdBreakdown
        }
        console.log('✅ SAGA: UTM data merged successfully')
      } else {
        console.log('⚠️ SAGA: No UTM data found in lead-scoring response')
      }
    } catch (utmError: any) {
      console.error('❌ SAGA: Failed to get UTM data:', utmError)
      // Continua sem UTM data, não quebra o fluxo
    }
    
    console.log('🚀 SAGA: Final data being sent to Redux:', finalData)
    yield put(loadPhaseStatisticsSuccess(finalData))
    
  } catch (error: any) {
    console.error('💥 SAGA: Main error loading statistics:', error)
    yield put(loadPhaseStatisticsFailure(error.response?.data || error.message))
  }
}
