/**
 * Action types
 */
export enum StateTypes {
  //Load
  LOAD_STATES_REQUEST = '@state/LOAD_STATES_REQUEST',
  LOAD_STATES_SUCCESS = '@state/LOAD_STATES_SUCCESS',
  LOAD_STATES_FAILURE = '@state/LOAD_STATES_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface State {
  id?: number | undefined | null
  name?: string
  state?: string
  country?: string
}
/**
 * State type
 */
export interface StateState {
  readonly data: State[]
  readonly loading: boolean
  readonly error: boolean
}
