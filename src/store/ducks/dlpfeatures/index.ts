import {Reducer} from 'redux'
import {LPFeatureState, LPFeaturesTypes} from './types'

const INITIAL_STATE: LPFeatureState = {
  myLPFeatures: [],
  lpfeature: {},
  error: false,
  loading: true,
}

const reducer: Reducer<LPFeatureState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LPFeaturesTypes.REORDER_LPFEATURES:
      return {...state, myLPFeatures: action.payload }

    //Load
    case LPFeaturesTypes.LOAD_MYLPFEATURES_REQUEST:
      return {...state, loading: true, myLPFeatures: []}
    case LPFeaturesTypes.LOAD_MYLPFEATURES_SUCCESS:
      return {...state, loading: false, error: false, myLPFeatures: action.payload.data}
    case LPFeaturesTypes.LOAD_MYLPFEATURES_FAILURE:
      return {...state, loading: false, error: action.payload, myLPFeatures: []}


    case LPFeaturesTypes.LOAD_LPFEATURE_REQUEST:
      return {...state, loading: true,}
    case LPFeaturesTypes.LOAD_LPFEATURE_SUCCESS:
      return {...state, loading: false, error: false, lpfeature: action.payload.data}
    case LPFeaturesTypes.LOAD_LPFEATURE_FAILURE:
      return {...state, loading: false, error: action.payload, lpfeature: {}}

    //Create
    case LPFeaturesTypes.CREATE_LPFEATURE_REQUEST:
      return {...state}
    case LPFeaturesTypes.CREATE_LPFEATURE_SUCCESS:
      return {...state, loading: false, error: false, myLPFeatures: [...state.myLPFeatures, action.payload.data]}
    case LPFeaturesTypes.CREATE_LPFEATURE_FAILURE:
      return {...state, loading: false, error: action.payload, myLPFeatures: []}

    //Update
    case LPFeaturesTypes.UPDATE_LPFEATURE_REQUEST:
      return {...state}
    case LPFeaturesTypes.UPDATE_LPFEATURE_SUCCESS:
      return {...state, loading: false, error: false, myLPFeatures: state.myLPFeatures?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LPFeaturesTypes.UPDATE_LPFEATURE_FAILURE:
      return {...state, loading: false, error: action.payload, myLPFeatures: []}

    //Delete
    case LPFeaturesTypes.DELETE_LPFEATURE_REQUEST:
      return {...state}
    case LPFeaturesTypes.DELETE_LPFEATURE_SUCCESS:
      return {...state, loading: false, error: false, myLPFeatures: state.myLPFeatures.filter((item) => item.id !== action.payload.data.id)}
    case LPFeaturesTypes.DELETE_LPFEATURE_FAILURE:
      return {...state, loading: false, error: action.payload, myLPFeatures: []}
    default:
      return state
  }
}

export default reducer
