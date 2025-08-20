import {Reducer} from 'redux'
import {LaunchPhasesState, LaunchPhasesTypes} from './types'


const INITIAL_STATE: LaunchPhasesState = {
  myLaunchPhases: [],
  launchPhase: {},
  phaseStatistics: null,
  error: false,
  loading: true,
  loadingStatistics: false,
}


const reducer: Reducer<LaunchPhasesState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LaunchPhasesTypes.REORDER_LAUNCHPHASES:
      return {...state, myLaunchPhases: action.payload }

    // case LaunchHasOfferTypes.REORDER_LAUNCHHASOFFERS:
    //   //console.log("CHAMOU AQUI", action.payload)
    //   return {...state, myLaunchPhases: Object.assign([], state.myLaunchPhases, {
    //     ...state.myLaunchPhases?.map((child) => {
    //       //console.log("ver", child)
    //       if (child.id === action.payload[0].launch.id) {
    //         //console.log("ACHEI!", child.id)
    //         child.launchhasoffers = action.payload
    //       }
    //       return child;
    //     }),
    //   }),
    // }

    //Load
    case LaunchPhasesTypes.LOAD_LAUNCHPHASES_REQUEST:
      return {...state, loading: true}
    case LaunchPhasesTypes.LOAD_LAUNCHPHASES_SUCCESS:
      return {...state, loading: false, error: false, launch: action.payload.data} 
    case LaunchPhasesTypes.LOAD_LAUNCHPHASES_FAILURE:
      return {...state, loading: false, error: action.payload, launch: {}}

    //Load
    case LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_REQUEST:
      return {...state, loading: true}
    case LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhases: action.payload.data}
    case LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhases: []}

    // case LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_SUCCESS:
    //   return {
    //     ...state,
    //     myLaunchPhases: Object.assign([], state.myLaunchPhases, {
    //       ...state.myLaunchPhases?.map((child) => {
    //         if (child.id === action.payload.data.launchId) {
    //           child.launchhasoffers?.push(action.payload.data)
    //         }
    //         return child;
    //       }),
    //     }),
    //   };

    // case LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_SUCCESS:
    //   return {
    //     ...state,
    //     myLaunchPhases: Object.assign([], state.myLaunchPhases, {
    //       ...state.myLaunchPhases?.map((child) => {
    //         if (child.id === action.payload.data.launchId) {
    //           child.launchhasoffers = child.launchhasoffers?.filter((item) => item.id !== action.payload.data.id)
    //         }
    //         return child;
    //       }),
    //     }),
    // };


    //Create
    case LaunchPhasesTypes.CREATE_LAUNCHPHASES_REQUEST:
      return {...state}
    case LaunchPhasesTypes.CREATE_LAUNCHPHASES_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhases: [...state.myLaunchPhases, action.payload.data] }
    case LaunchPhasesTypes.CREATE_LAUNCHPHASES_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhases: [], launch: {}}

    //Update
    case LaunchPhasesTypes.UPDATE_LAUNCHPHASES_REQUEST:
      return {...state}
    case LaunchPhasesTypes.UPDATE_LAUNCHPHASES_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhases: state.myLaunchPhases?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LaunchPhasesTypes.UPDATE_LAUNCHPHASES_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhases: []}

    //Delete
    case LaunchPhasesTypes.DELETE_LAUNCHPHASES_REQUEST:
      return {...state}
    case LaunchPhasesTypes.DELETE_LAUNCHPHASES_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhases: state.myLaunchPhases.filter((item) => item.id !== action.payload.data.id)}
    case LaunchPhasesTypes.DELETE_LAUNCHPHASES_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhases: []}

    //Statistics
    case LaunchPhasesTypes.LOAD_PHASE_STATISTICS_REQUEST:
      return {...state, loadingStatistics: true}
    case LaunchPhasesTypes.LOAD_PHASE_STATISTICS_SUCCESS:
      return {...state, loadingStatistics: false, error: false, phaseStatistics: action.payload}
    case LaunchPhasesTypes.LOAD_PHASE_STATISTICS_FAILURE:
      return {...state, loadingStatistics: false, error: action.payload, phaseStatistics: null}

    default:
      return state
  }
}

export default reducer
