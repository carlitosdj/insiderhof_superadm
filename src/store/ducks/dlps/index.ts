import {Reducer} from 'redux'
import {LPState, LPSTypes} from './types'

const INITIAL_STATE: LPState = {
  myLPs: [],
  lp: {},
  error: false,
  loading: true,
  loadingImport: false,
  loadingDuplicate: false,
  exportLP: null,
  importLP: null,
  duplicateLP: null,
}

const reducer: Reducer<LPState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LPSTypes.REORDER_LPS:
      return {...state, myLPs: action.payload }

    //Load
    case LPSTypes.LOAD_MYLPS_REQUEST:
      return {...state, loading: true, myLPs: []}
    case LPSTypes.LOAD_MYLPS_SUCCESS:
      return {...state, loading: false, error: false, myLPs: action.payload.data}
    case LPSTypes.LOAD_MYLPS_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}


    case LPSTypes.LOAD_LP_REQUEST:
      return {...state, loading: true,}
    case LPSTypes.LOAD_LP_SUCCESS:
      return {...state, loading: false, error: false, lp: action.payload.data}
    case LPSTypes.LOAD_LP_FAILURE:
      return {...state, loading: false, error: action.payload, lp: {}}

    //Create
    case LPSTypes.CREATE_LP_REQUEST:
      return {...state}
    case LPSTypes.CREATE_LP_SUCCESS:
      return {...state, loading: false, error: false, myLPs: [...state.myLPs, action.payload.data]}
    case LPSTypes.CREATE_LP_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}

    //Update
    case LPSTypes.UPDATE_LP_REQUEST:
      return {...state}
    case LPSTypes.UPDATE_LP_SUCCESS:
      return {...state, loading: false, error: false, myLPs: state.myLPs?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LPSTypes.UPDATE_LP_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}

    //Delete
    case LPSTypes.DELETE_LP_REQUEST:
      return {...state}
    case LPSTypes.DELETE_LP_SUCCESS:
      return {...state, loading: false, error: false, myLPs: state.myLPs.filter((item) => item.id !== action.payload.data.id)}
    case LPSTypes.DELETE_LP_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}

    //Export
    case LPSTypes.EXPORT_LP_REQUEST:
      return {...state, exportLP: null}
    case LPSTypes.EXPORT_LP_SUCCESS:
      return {...state, loading: false, error: false, exportLP: action.payload.data}
    case LPSTypes.EXPORT_LP_FAILURE:
      return {...state, loading: false, error: action.payload, exportLP: null}

    //Import
    case LPSTypes.IMPORT_LP_REQUEST:
      return {...state, importLP: null, loadingImport: true}
    case LPSTypes.IMPORT_LP_SUCCESS:
      return {...state, loadingImport: false, error: false, importLP: action.payload.data, myLPs: [action.payload.data, ...state.myLPs]}
    case LPSTypes.IMPORT_LP_FAILURE:
      return {...state, loadingImport: false, error: action.payload, importLP: null}

    //Duplicate
    case LPSTypes.DUPLICATE_LP_REQUEST:
      return {...state, duplicateLP: null, loadingDuplicate: true}
    case LPSTypes.DUPLICATE_LP_SUCCESS:
      return {...state, loadingDuplicate: false, error: false, myLPs: [action.payload.data, ...state.myLPs]}
    case LPSTypes.DUPLICATE_LP_FAILURE:
      return {...state, loadingDuplicate: false, error: action.payload, duplicateLP: null}

    default:
      return state
  }
}

export default reducer
