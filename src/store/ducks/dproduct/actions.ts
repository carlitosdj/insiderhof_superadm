import {action} from 'typesafe-actions'
import {ProductsTypes, Product} from './types'



export const reorderProductsRequest = (data: Product[]) => action(ProductsTypes.REORDER_ProductS, data)
//Load
export const loadMyProductsRequest = (userId: number) => action(ProductsTypes.LOAD_MYPRODUCTS_REQUEST, userId)
export const loadMyProductsSuccess = (data: Product[]) => action(ProductsTypes.LOAD_MYPRODUCTS_SUCCESS, data)
export const loadMyProductsFailure = (err: any[]) => action(ProductsTypes.LOAD_MYPRODUCTS_FAILURE, err)

//Load
export const loadProductRequest = (ProductId: number) => action(ProductsTypes.LOAD_PRODUCT_REQUEST, ProductId)
export const loadProductSuccess = (data: Product) => action(ProductsTypes.LOAD_PRODUCT_SUCCESS, data)
export const loadProductFailure = (err: any[]) => action(ProductsTypes.LOAD_PRODUCT_FAILURE, err)

//Create
export const createProductRequest = (data: Product) => action(ProductsTypes.CREATE_PRODUCT_REQUEST, data)
export const createProductSuccess = (data: Product) => action(ProductsTypes.CREATE_PRODUCT_SUCCESS, data)
export const createProductFailure = (err: any[]) => action(ProductsTypes.CREATE_PRODUCT_FAILURE, err)

//Update
export const updateProductRequest = (data: Product) => action(ProductsTypes.UPDATE_PRODUCT_REQUEST, data)
export const updateProductSuccess = (data: Product) => action(ProductsTypes.UPDATE_PRODUCT_SUCCESS, data)
export const updateProductFailure = (err: any[]) => action(ProductsTypes.UPDATE_PRODUCT_FAILURE, err)

//Delete
export const deleteProductRequest = (id: number) => action(ProductsTypes.DELETE_PRODUCT_REQUEST, id)
export const deleteProductSuccess = (data: Product) => action(ProductsTypes.DELETE_PRODUCT_SUCCESS, data)
export const deleteProductFailure = (err: any[]) => action(ProductsTypes.DELETE_PRODUCT_FAILURE, err)
