import { call, put, fork } from "redux-saga/effects";
import api from "../../../services/api";

import {
  loadClassExtrasRequest,
  loadClassExtrasSuccess,
  loadClassExtrasFailure,
  loadClassExtraRequest,
  loadClassExtraSuccess,
  loadClassExtraFailure,
  createClassExtraRequest,
  createClassExtraSuccess,
  createClassExtraFailure,
  updateClassExtraRequest,
  updateClassExtraSuccess,
  updateClassExtraFailure,
  deleteClassExtraRequest,
  deleteClassExtraSuccess,
  deleteClassExtraFailure,
} from "./actions";

import { ClassExtra } from "./types";

export function* loadClassExtras(
  payload: ReturnType<typeof loadClassExtrasRequest>
) {
  try {
    put(loadClassExtrasRequest(payload.payload));
    const response: ClassExtra[] = yield call(
      api.get,
      "extraclass/byclass/" + payload.payload
    );
    yield put(loadClassExtrasSuccess(response));
  } catch (error: any) {
    yield put(loadClassExtrasFailure(error.response.data));
  }
}

export function* loadClassExtra(
  payload: ReturnType<typeof loadClassExtraRequest>
) {
  try {
    put(loadClassExtraRequest(payload.payload));
    const response: ClassExtra = yield call(
      api.get,
      "extraclass/" + payload.payload
    );
    yield put(loadClassExtraSuccess(response));
  } catch (error: any) {
    yield put(loadClassExtraFailure(error.response.data));
  }
}

//Create
export function* createClassExtra(
  payload: ReturnType<typeof createClassExtraRequest>
) {
  try {
    put(createClassExtraRequest(payload.payload));
    const response: ClassExtra = yield call(api.post, "extraclass", payload.payload);
    yield put(createClassExtraSuccess(response));
  } catch (error: any) {
    yield put(createClassExtraFailure(error.response.data));
  }
}

//Update
export function* updateClassExtra(
  payload: ReturnType<typeof updateClassExtraRequest>
) {
  try {
    put(updateClassExtraRequest(payload.payload));
    const response: ClassExtra = yield call(
      api.patch,
      "extraclass/" + payload.payload.id,
      payload.payload
    );
    yield put(updateClassExtraSuccess(response));
  } catch (error: any) {
    yield put(updateClassExtraFailure(error.response.data));
  }
}

//Delete
export function* deleteClassExtra(
  payload: ReturnType<typeof deleteClassExtraRequest>
) {
  try {
    put(deleteClassExtraRequest(payload.payload));
    const response: ClassExtra = yield call(
      api.delete,
      "extraclass/" + payload.payload
    );
    yield put(deleteClassExtraSuccess(response));
  } catch (error: any) {
    yield put(deleteClassExtraFailure(error.response.data));
  }
}
