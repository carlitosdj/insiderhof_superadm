import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import {
  loadLaunchQuestionOptionsRequest,
  loadLaunchQuestionOptionsSuccess,
  loadLaunchQuestionOptionsFailure,

  loadLaunchQuestionOptionRequest,
  loadLaunchQuestionOptionSuccess,
  loadLaunchQuestionOptionFailure,

  createLaunchQuestionOptionRequest,
  createLaunchQuestionOptionSuccess,
  createLaunchQuestionOptionFailure,

  updateLaunchQuestionOptionRequest,
  updateLaunchQuestionOptionSuccess,
  updateLaunchQuestionOptionFailure,

  deleteLaunchQuestionOptionRequest,
  deleteLaunchQuestionOptionSuccess,
  deleteLaunchQuestionOptionFailure,

  reorderLaunchQuestionOptionsRequest,
  reorderLaunchQuestionOptionsSuccess,
  reorderLaunchQuestionOptionsFailure,
} from './actions';

import { LaunchQuestionOption } from './types';

// Load options by question
export function* loadLaunchQuestionOptions(payload: ReturnType<typeof loadLaunchQuestionOptionsRequest>) {
  try {
    put(loadLaunchQuestionOptionsRequest(payload.payload));
    const response: LaunchQuestionOption[] = yield call(api.get, `launch-question-option/question/${payload.payload}`);
    yield put(loadLaunchQuestionOptionsSuccess(response));
  } catch (error: any) {
    yield put(loadLaunchQuestionOptionsFailure(error.response?.data || error.message));
  }
}

// Load single option
export function* loadLaunchQuestionOption(payload: ReturnType<typeof loadLaunchQuestionOptionRequest>) {
  try {
    put(loadLaunchQuestionOptionRequest(payload.payload));
    const response: LaunchQuestionOption = yield call(api.get, `launch-question-option/${payload.payload}`);
    yield put(loadLaunchQuestionOptionSuccess(response));
  } catch (error: any) {
    yield put(loadLaunchQuestionOptionFailure(error.response?.data || error.message));
  }
}

// Create
export function* createLaunchQuestionOption(payload: ReturnType<typeof createLaunchQuestionOptionRequest>) {
  try {
    put(createLaunchQuestionOptionRequest(payload.payload));
    const response: LaunchQuestionOption = yield call(api.post, 'launch-question-option', payload.payload);
    yield put(createLaunchQuestionOptionSuccess(response));
  } catch (error: any) {
    yield put(createLaunchQuestionOptionFailure(error.response?.data || error.message));
  }
}

// Update
export function* updateLaunchQuestionOption(payload: ReturnType<typeof updateLaunchQuestionOptionRequest>) {
  try {
    put(updateLaunchQuestionOptionRequest(payload.payload));
    const response: LaunchQuestionOption = yield call(api.patch, `launch-question-option/${payload.payload.id}`, payload.payload);
    yield put(updateLaunchQuestionOptionSuccess(response));
  } catch (error: any) {
    yield put(updateLaunchQuestionOptionFailure(error.response?.data || error.message));
  }
}

// Delete
export function* deleteLaunchQuestionOption(payload: ReturnType<typeof deleteLaunchQuestionOptionRequest>) {
  try {
    put(deleteLaunchQuestionOptionRequest(payload.payload));
    const response: LaunchQuestionOption = yield call(api.delete, `launch-question-option/${payload.payload}`);
    yield put(deleteLaunchQuestionOptionSuccess(payload.payload));
  } catch (error: any) {
    yield put(deleteLaunchQuestionOptionFailure(error.response?.data || error.message));
  }
}

// Reorder options
export function* reorderLaunchQuestionOptions(payload: ReturnType<typeof reorderLaunchQuestionOptionsRequest>) {
  try {
    put(reorderLaunchQuestionOptionsRequest(payload.payload));
    const response: LaunchQuestionOption[] = yield call(api.post, 'launch-question-option/reorder', payload.payload);
    yield put(reorderLaunchQuestionOptionsSuccess(response));
  } catch (error: any) {
    yield put(reorderLaunchQuestionOptionsFailure(error.response?.data || error.message));
  }
}