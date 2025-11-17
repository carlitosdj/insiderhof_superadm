import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import {
  loadLaunchQuestionsRequest,
  loadLaunchQuestionsSuccess,
  loadLaunchQuestionsFailure,

  loadLaunchQuestionRequest,
  loadLaunchQuestionSuccess,
  loadLaunchQuestionFailure,

  createLaunchQuestionRequest,
  createLaunchQuestionSuccess,
  createLaunchQuestionFailure,

  updateLaunchQuestionRequest,
  updateLaunchQuestionSuccess,
  updateLaunchQuestionFailure,

  deleteLaunchQuestionRequest,
  deleteLaunchQuestionSuccess,
  deleteLaunchQuestionFailure,

  reorderLaunchQuestionsRequest,
  reorderLaunchQuestionsSuccess,
  reorderLaunchQuestionsFailure,

  toggleSurveyStatusRequest,
  toggleSurveyStatusSuccess,
  toggleSurveyStatusFailure,
} from './actions';

import { LaunchQuestion } from './types';

// Load questions by launch phase
export function* loadLaunchQuestions(payload: ReturnType<typeof loadLaunchQuestionsRequest>) {
  try {
    put(loadLaunchQuestionsRequest(payload.payload));
    const response: LaunchQuestion[] = yield call(api.get, `launch-question/phase/${payload.payload}`);
    yield put(loadLaunchQuestionsSuccess(response));
  } catch (error: any) {
    yield put(loadLaunchQuestionsFailure(error.response?.data || error.message));
  }
}

// Load single question
export function* loadLaunchQuestion(payload: ReturnType<typeof loadLaunchQuestionRequest>) {
  try {
    put(loadLaunchQuestionRequest(payload.payload));
    const response: LaunchQuestion = yield call(api.get, `launch-question/${payload.payload}`);
    yield put(loadLaunchQuestionSuccess(response));
  } catch (error: any) {
    yield put(loadLaunchQuestionFailure(error.response?.data || error.message));
  }
}

// Create
export function* createLaunchQuestion(payload: ReturnType<typeof createLaunchQuestionRequest>) {
  try {
    put(createLaunchQuestionRequest(payload.payload));
    const response: LaunchQuestion = yield call(api.post, 'launch-question', payload.payload);
    yield put(createLaunchQuestionSuccess(response));
  } catch (error: any) {
    yield put(createLaunchQuestionFailure(error.response?.data || error.message));
  }
}

// Update
export function* updateLaunchQuestion(payload: ReturnType<typeof updateLaunchQuestionRequest>) {
  try {
    put(updateLaunchQuestionRequest(payload.payload));
    const response: LaunchQuestion = yield call(api.patch, `launch-question/${payload.payload.id}`, payload.payload);
    yield put(updateLaunchQuestionSuccess(response));
  } catch (error: any) {
    yield put(updateLaunchQuestionFailure(error.response?.data || error.message));
  }
}

// Delete
export function* deleteLaunchQuestion(payload: ReturnType<typeof deleteLaunchQuestionRequest>) {
  try {
    put(deleteLaunchQuestionRequest(payload.payload));
    const response: LaunchQuestion = yield call(api.delete, `launch-question/${payload.payload}`);
    yield put(deleteLaunchQuestionSuccess(payload.payload));
  } catch (error: any) {
    yield put(deleteLaunchQuestionFailure(error.response?.data || error.message));
  }
}

// Reorder questions
export function* reorderLaunchQuestions(payload: ReturnType<typeof reorderLaunchQuestionsRequest>) {
  try {
    put(reorderLaunchQuestionsRequest(payload.payload));
    const response: LaunchQuestion[] = yield call(api.post, 'launch-question/reorder', payload.payload);
    yield put(reorderLaunchQuestionsSuccess(response));
  } catch (error: any) {
    yield put(reorderLaunchQuestionsFailure(error.response?.data || error.message));
  }
}

// Toggle survey status
export function* toggleSurveyStatus(payload: ReturnType<typeof toggleSurveyStatusRequest>) {
  try {
    put(toggleSurveyStatusRequest(payload.payload.launchPhaseId, payload.payload.enable));
    const response: LaunchQuestion[] = yield call(api.patch, `launch-question/toggle-status/${payload.payload.launchPhaseId}`, { enable: payload.payload.enable });
    yield put(toggleSurveyStatusSuccess(response));
  } catch (error: any) {
    yield put(toggleSurveyStatusFailure(error.response?.data || error.message));
  }
}