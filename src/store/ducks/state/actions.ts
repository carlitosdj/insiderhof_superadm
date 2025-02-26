import {action} from 'typesafe-actions'
import {StateTypes, State} from './types'

//Load
export const loadStateRequest = () => action(StateTypes.LOAD_STATES_REQUEST)
export const loadStateSuccess = (data: State[]) => action(StateTypes.LOAD_STATES_SUCCESS, data)
export const loadStateFailure = (err: any[]) => action(StateTypes.LOAD_STATES_FAILURE, err)

