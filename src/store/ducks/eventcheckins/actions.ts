import {action} from 'typesafe-actions'
import {EventCheckinsTypes, EventCheckin, CheckinPayload} from './types'

// Create checkin
export const createCheckinRequest = (payload: CheckinPayload) =>
  action(EventCheckinsTypes.CREATE_CHECKIN_REQUEST, payload)
export const createCheckinSuccess = (data: EventCheckin) =>
  action(EventCheckinsTypes.CREATE_CHECKIN_SUCCESS, data)
export const createCheckinFailure = (err: any[]) =>
  action(EventCheckinsTypes.CREATE_CHECKIN_FAILURE, err)

// Load checkins by event
export const loadCheckinsByEventRequest = (eventId: number) =>
  action(EventCheckinsTypes.LOAD_CHECKINS_BY_EVENT_REQUEST, eventId)
export const loadCheckinsByEventSuccess = (data: EventCheckin[]) =>
  action(EventCheckinsTypes.LOAD_CHECKINS_BY_EVENT_SUCCESS, data)
export const loadCheckinsByEventFailure = (err: any[]) =>
  action(EventCheckinsTypes.LOAD_CHECKINS_BY_EVENT_FAILURE, err)

// Cancel checkin
export const cancelCheckinRequest = (checkinId: number) =>
  action(EventCheckinsTypes.CANCEL_CHECKIN_REQUEST, checkinId)
export const cancelCheckinSuccess = (data: any) =>
  action(EventCheckinsTypes.CANCEL_CHECKIN_SUCCESS, data)
export const cancelCheckinFailure = (err: any[]) =>
  action(EventCheckinsTypes.CANCEL_CHECKIN_FAILURE, err)
