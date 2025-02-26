import { User } from "../me/types";

/**
 * Action types
 */
export enum OnlineUsersTypes {
  //Load
  LOAD_CONNECTEDUSERS_REQUEST = "@lists/LOAD_CONNECTEDUSERS_REQUEST",
  LOAD_CONNECTEDUSERS_SUCCESS = "@lists/LOAD_CONNECTEDUSERS_SUCCESS",
  LOAD_CONNECTEDUSERS_FAILURE = "@lists/LOAD_CONNECTEDUSERS_FAILURE",

  LOAD_CONNECTEDTIMEGROUPEDBYHOUR_REQUEST = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYHOUR_REQUEST",
  LOAD_CONNECTEDTIMEGROUPEDBYHOUR_SUCCESS = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYHOUR_SUCCESS",
  LOAD_CONNECTEDTIMEGROUPEDBYHOUR_FAILURE = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYHOUR_FAILURE",

  LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_REQUEST = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_REQUEST",
  LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_SUCCESS = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_SUCCESS",
  LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_FAILURE = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_FAILURE",

  LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_REQUEST = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_REQUEST",
  LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_SUCCESS = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_SUCCESS",
  LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_FAILURE = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_FAILURE",

  LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_REQUEST = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_REQUEST",
  LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_SUCCESS = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_SUCCESS",
  LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_FAILURE = "@lists/LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_FAILURE",
}

/**
 * Data types
 */

export interface OnlineUser {
  id?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  timeConnected?: number;
  status?: string;
  user?: User;

  hour?: number;
  count?: number;
  sum?: string;
  weekday?: number;
}

export interface Error {
  error?: string;
}
/**
 * State type
 */
export interface OnlineUsersState {
  readonly onlineUsers: OnlineUser[];
  readonly loadingOnlineUsers: boolean;

  readonly data: OnlineUser[];
  readonly loadingData: boolean;

  readonly dataById: OnlineUser[];
  readonly loadingDataById: boolean;

  readonly weekData: OnlineUser[];
  readonly loadingWeekData: boolean;

  readonly weekDataById: OnlineUser[];
  readonly loadingWeekDataById: boolean;

  readonly error?: Error;
}
