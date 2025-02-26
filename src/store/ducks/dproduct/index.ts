import {Reducer} from 'redux'
import {ProductState, ProductsTypes} from './types'

const INITIAL_STATE: ProductState = {
  myProducts: [],
  product: {},
  error: false,
  loading: true,
}

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case ProductsTypes.REORDER_ProductS:
      return {...state, myProducts: action.payload }

    //Load
    case ProductsTypes.LOAD_MYPRODUCTS_REQUEST:
      return {...state, loading: true, myProducts: []}
    case ProductsTypes.LOAD_MYPRODUCTS_SUCCESS:
      return {...state, loading: false, error: false, myProducts: action.payload.data}
    case ProductsTypes.LOAD_MYPRODUCTS_FAILURE:
      return {...state, loading: false, error: action.payload, myProducts: []}


    case ProductsTypes.LOAD_PRODUCT_REQUEST:
      return {...state, loading: true,}
    case ProductsTypes.LOAD_PRODUCT_SUCCESS:
      return {...state, loading: false, error: false, product: action.payload.data}
    case ProductsTypes.LOAD_PRODUCT_FAILURE:
      return {...state, loading: false, error: action.payload, product: {}}

    //Create
    case ProductsTypes.CREATE_PRODUCT_REQUEST:
      return {...state}
    case ProductsTypes.CREATE_PRODUCT_SUCCESS:
      return {...state, loading: false, error: false, myProducts: [...state.myProducts, action.payload.data]}
    case ProductsTypes.CREATE_PRODUCT_FAILURE:
      return {...state, loading: false, error: action.payload, myProducts: []}

    //Update
    case ProductsTypes.UPDATE_PRODUCT_REQUEST:
      return {...state}
    case ProductsTypes.UPDATE_PRODUCT_SUCCESS:
      return {...state, loading: false, error: false, myProducts: state.myProducts?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case ProductsTypes.UPDATE_PRODUCT_FAILURE:
      return {...state, loading: false, error: action.payload, myProducts: []}

    //Delete
    case ProductsTypes.DELETE_PRODUCT_REQUEST:
      return {...state}
    case ProductsTypes.DELETE_PRODUCT_SUCCESS:
      return {...state, loading: false, error: false, myProducts: state.myProducts.filter((item) => item.id !== action.payload.data.id)}
    case ProductsTypes.DELETE_PRODUCT_FAILURE:
      return {...state, loading: false, error: action.payload, myProducts: []}
    default:
      return state
  }
}

export default reducer
