import {Reducer} from 'redux'
import {LaunchPhaseExtrasState, LaunchPhaseExtrasTypes} from './types'


const INITIAL_STATE: LaunchPhaseExtrasState = {
  myLaunchPhaseExtras: [],
  launchPhase: {},
  error: false,
  loading: true,
}


const reducer: Reducer<LaunchPhaseExtrasState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LaunchPhaseExtrasTypes.REORDER_LAUNCHPHASEEXTRA:
      return {...state, myLaunchPhaseExtras: action.payload }

    // case LaunchHasOfferTypes.REORDER_LAUNCHHASOFFERS:
    //   //console.log("CHAMOU AQUI", action.payload)
    //   return {...state, myLaunchPhaseExtras: Object.assign([], state.myLaunchPhaseExtras, {
    //     ...state.myLaunchPhaseExtras?.map((child) => {
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
    case LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_REQUEST:
      return {...state, loading: true}
    case LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_SUCCESS:
      return {...state, loading: false, error: false, launch: action.payload.data} 
    case LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, launch: {}}

    //Load
    case LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_REQUEST:
      return {...state, loading: true}
    case LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhaseExtras: action.payload.data}
    case LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhaseExtras: []}

    // case LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_SUCCESS:
    //   return {
    //     ...state,
    //     myLaunchPhaseExtras: Object.assign([], state.myLaunchPhaseExtras, {
    //       ...state.myLaunchPhaseExtras?.map((child) => {
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
    //     myLaunchPhaseExtras: Object.assign([], state.myLaunchPhaseExtras, {
    //       ...state.myLaunchPhaseExtras?.map((child) => {
    //         if (child.id === action.payload.data.launchId) {
    //           child.launchhasoffers = child.launchhasoffers?.filter((item) => item.id !== action.payload.data.id)
    //         }
    //         return child;
    //       }),
    //     }),
    // };


    //Create
    case LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_REQUEST:
      return {...state}
    case LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhaseExtras: [...state.myLaunchPhaseExtras, action.payload.data] }
    case LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhaseExtras: [], launch: {}}

    //Update
    case LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_REQUEST:
      return {...state}
    case LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhaseExtras: state.myLaunchPhaseExtras?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhaseExtras: []}

    //Delete
    case LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_REQUEST:
      return {...state}
    case LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_SUCCESS:
      return {...state, loading: false, error: false, myLaunchPhaseExtras: state.myLaunchPhaseExtras.filter((item) => item.id !== action.payload.data.id)}
    case LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchPhaseExtras: []}
    default:
      return state
  }
}

export default reducer
