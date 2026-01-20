import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyProductsRequest,
  loadMyProductsSuccess,
  loadMyProductsFailure,

  loadProductRequest,
  loadProductSuccess,
  loadProductFailure,

  createProductRequest,
  createProductSuccess,
  createProductFailure,

  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,

  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,

  reorderProductsRequest
} from './actions'

import {Product} from './types'

// Import auto-create event action
import { autoCreateEventForProductRequest } from '../events/actions'


export function* loadMyProducts(payload: ReturnType<typeof loadMyProductsRequest>) {
  try {
    put(loadMyProductsRequest(payload.payload))
    const response: Product[] = yield call(api.get, 'product')
    yield put(loadMyProductsSuccess(response))
  } catch (error: any) {
    yield put(loadMyProductsFailure(error.response.data))
  }
}


export function* loadProduct(payload: ReturnType<typeof loadProductRequest>) {
  try {
    put(loadProductRequest(payload.payload))
    const response: Product = yield call(api.get, 'product/' + payload.payload)
    yield put(loadProductSuccess(response))
  } catch (error: any) {
    yield put(loadProductFailure(error.response.data))
  }
}

//Create
export function* createProduct(payload: ReturnType<typeof createProductRequest>) {
  try {
    put(createProductRequest(payload.payload))
    const response: Product = yield call(api.post, 'product', payload.payload)
    yield put(createProductSuccess(response))
  } catch (error: any) {
    yield put(createProductFailure(error.response.data))
  }
}

//Update
export function* updateProduct(payload: ReturnType<typeof updateProductRequest>) {
  try {
    put(updateProductRequest(payload.payload))

    // Get current product to check if type changed
    const currentProduct: Product = yield call(api.get, 'product/' + payload.payload.id)
    const oldType = currentProduct.type
    const newType = payload.payload.type

    // Update product
    const response: Product = yield call(api.patch, 'product/' + payload.payload.id, payload.payload)
    yield put(updateProductSuccess(response))

    // Check if type changed to 'event'
    if (oldType !== 'event' && newType === 'event') {
      yield put(autoCreateEventForProductRequest(
        payload.payload.id!,
        payload.payload.name || currentProduct.name || '',
        payload.payload.description || currentProduct.description
      ))
    }
  } catch (error: any) {
    yield put(updateProductFailure(error.response.data))
  }
}

//Delete
export function* deleteProduct(payload: ReturnType<typeof deleteProductRequest>) {
  try {
    put(deleteProductRequest(payload.payload))
    const response: Product = yield call(api.delete, 'product/' + payload.payload)
    yield put(deleteProductSuccess(response))
  } catch (error: any) {
    yield put(deleteProductFailure(error.response.data))
  }
}
