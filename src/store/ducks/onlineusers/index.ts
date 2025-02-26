import {Reducer} from 'redux'
import {OnlineUsersState, OnlineUsersTypes} from './types'

const INITIAL_STATE: OnlineUsersState = {
  data: [],
  loadingData: true,

  dataById: [],
  loadingDataById: true,

  onlineUsers: [],
  loadingOnlineUsers: true,

  weekData: [],
  loadingWeekData: true,

  weekDataById: [],
  loadingWeekDataById: true,
  
  error: {},
}

const reducer: Reducer<OnlineUsersState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case OnlineUsersTypes.LOAD_CONNECTEDUSERS_REQUEST:
      return {...state, loadingOnlineUsers: true, onlineUsers: []}
    case OnlineUsersTypes.LOAD_CONNECTEDUSERS_SUCCESS:
      return {...state, loadingOnlineUsers: false, error: {}, onlineUsers: action.payload.data}
    case OnlineUsersTypes.LOAD_CONNECTEDUSERS_FAILURE:
      return {...state, loadingOnlineUsers: false, error: action.payload, data: []}

    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_REQUEST:
      return {...state, loadingData: true, data: []}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_SUCCESS:
      return {...state, loadingData: false, error: {}, data: action.payload.data}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_FAILURE:
      return {...state, loadingData: false, error: action.payload, data: []}
   
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_REQUEST:
      return {...state, loadingDataById: true, dataById: []}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_SUCCESS:
      return {...state, loadingDataById: false, error: {}, dataById: action.payload.data}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_FAILURE:
      return {...state, loadingDataById: false, error: action.payload, dataById: []}

    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_REQUEST:
      return {...state, loadingWeekData: true, weekData: []}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_SUCCESS:
      return {...state, loadingWeekData: false, error: {}, weekData: action.payload.data}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_FAILURE:
      return {...state, loadingWeekData: false, error: action.payload, weekData: []}

    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_REQUEST:
      return {...state, loadingWeekDataById: true, weekDataById: []}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_SUCCESS:
      return {...state, loadingWeekDataById: false, error: {}, weekDataById: action.payload.data}
    case OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_FAILURE:
      return {...state, loadingWeekDataById: false, error: action.payload, weekDataById: []}

    default:
      return state
  }
}

export default reducer
