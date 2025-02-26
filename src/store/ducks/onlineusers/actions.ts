import {action} from 'typesafe-actions'
import {OnlineUsersTypes, OnlineUser} from './types'

//Load
export const loadconnectedUsersRequest = () => action(OnlineUsersTypes.LOAD_CONNECTEDUSERS_REQUEST)
export const loadconnectedUsersSuccess = (data: OnlineUser[]) => action(OnlineUsersTypes.LOAD_CONNECTEDUSERS_SUCCESS, data)
export const loadconnectedUsersFailure = (error: {}) => action(OnlineUsersTypes.LOAD_CONNECTEDUSERS_FAILURE, error)

export const loadconnectedTimeGroupedByHourRequest = () => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_REQUEST)
export const loadconnectedTimeGroupedByHourSuccess = (data: OnlineUser[]) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_SUCCESS, data)
export const loadconnectedTimeGroupedByHourFailure = (error: {}) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_FAILURE, error)

export const loadconnectedTimeGroupedByHourByIdRequest = (id: number) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_REQUEST, id)
export const loadconnectedTimeGroupedByHourByIdSuccess = (data: OnlineUser[]) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_SUCCESS, data)
export const loadconnectedTimeGroupedByHourByIdFailure = (error: {}) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_FAILURE, error)

export const loadconnectedTimeGroupedByWeekDayRequest = () => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_REQUEST)
export const loadconnectedTimeGroupedByWeekDaySuccess = (data: OnlineUser[]) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_SUCCESS, data)
export const loadconnectedTimeGroupedByWeekDayFailure = (error: {}) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_FAILURE, error)

export const loadconnectedTimeGroupedByWeekDayByIdRequest = (id: number) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_REQUEST, id)
export const loadconnectedTimeGroupedByWeekDayByIdSuccess = (data: OnlineUser[]) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_SUCCESS, data)
export const loadconnectedTimeGroupedByWeekDayByIdFailure = (error: {}) => action(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_FAILURE, error)

