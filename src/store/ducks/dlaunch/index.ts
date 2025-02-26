import {Reducer} from 'redux'
import {LaunchsState, LaunchsTypes} from './types'
import { LaunchHasOfferTypes } from '../dlaunchhasoffers/types'


const INITIAL_STATE: LaunchsState = {
  myLaunchs: [],
  launch: {},
  error: false,
  loading: true,
}


const reducer: Reducer<LaunchsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LaunchsTypes.REORDER_LAUNCHS:
      return {...state, myLaunchs: action.payload }

    case LaunchHasOfferTypes.REORDER_LAUNCHHASOFFERS:
      //console.log("CHAMOU AQUI", action.payload)
      return {...state, myLaunchs: Object.assign([], state.myLaunchs, {
        ...state.myLaunchs?.map((child) => {
          //console.log("ver", child)
          if (child.id === action.payload[0].launch.id) {
            //console.log("ACHEI!", child.id)
            child.launchhasoffers = action.payload
          }
          return child;
        }),
      }),
    }

    //Load
    case LaunchsTypes.LOAD_LAUNCH_REQUEST:
      return {...state, loading: true}
    case LaunchsTypes.LOAD_LAUNCH_SUCCESS:
      return {...state, loading: false, error: false, launch: action.payload.data} 
    case LaunchsTypes.LOAD_LAUNCH_FAILURE:
      return {...state, loading: false, error: action.payload, launch: {}}

    //Load
    case LaunchsTypes.LOAD_MYLAUNCHS_REQUEST:
      return {...state, loading: true}
    case LaunchsTypes.LOAD_MYLAUNCHS_SUCCESS:
      return {...state, loading: false, error: false, myLaunchs: action.payload.data}
    case LaunchsTypes.LOAD_MYLAUNCHS_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchs: []}

    case LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_SUCCESS:
      return {
        ...state,
        myLaunchs: Object.assign([], state.myLaunchs, {
          ...state.myLaunchs?.map((child) => {
            if (child.id === action.payload.data.launchId) {
              child.launchhasoffers?.push(action.payload.data)
            }
            return child;
          }),
        }),
      };

    case LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_SUCCESS:
      return {
        ...state,
        myLaunchs: Object.assign([], state.myLaunchs, {
          ...state.myLaunchs?.map((child) => {
            if (child.id === action.payload.data.launchId) {
              child.launchhasoffers = child.launchhasoffers?.filter((item) => item.id !== action.payload.data.id)
            }
            return child;
          }),
        }),
    };


    //Create
    case LaunchsTypes.CREATE_LAUNCH_REQUEST:
      return {...state}
    case LaunchsTypes.CREATE_LAUNCH_SUCCESS:
      return {...state, loading: false, error: false, myLaunchs: [action.payload.data, ...state.myLaunchs] }
    case LaunchsTypes.CREATE_LAUNCH_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchs: [], launch: {}}

    //Update
    case LaunchsTypes.UPDATE_LAUNCH_REQUEST:
      return {...state}
    case LaunchsTypes.UPDATE_LAUNCH_SUCCESS:
      return {...state, loading: false, error: false, myLaunchs: state.myLaunchs?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LaunchsTypes.UPDATE_LAUNCH_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchs: []}

    //Delete
    case LaunchsTypes.DELETE_LAUNCH_REQUEST:
      return {...state}
    case LaunchsTypes.DELETE_LAUNCH_SUCCESS:
      return {...state, loading: false, error: false, myLaunchs: state.myLaunchs.filter((item) => item.id !== action.payload.data.id)}
    case LaunchsTypes.DELETE_LAUNCH_FAILURE:
      return {...state, loading: false, error: action.payload, myLaunchs: []}
    default:
      return state
  }
}

export default reducer
