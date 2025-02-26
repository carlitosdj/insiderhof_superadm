/**
 * Action types
 */
export enum CityTypes {
  //Load
  LOAD_CITIES_REQUEST = '@city/LOAD_CITIES_REQUEST',
  LOAD_CITIES_SUCCESS = '@city/LOAD_CITIES_SUCCESS',
  LOAD_CITIES_FAILURE = '@city/LOAD_CITIES_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface City {
  id?: number | undefined | null
  name?: string
  state?: string
}
/**
 * State type
 */
export interface CityState {
  readonly data: City[]
  readonly loading: boolean
  readonly error: boolean
}
