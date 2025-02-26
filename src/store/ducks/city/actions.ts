import {action} from 'typesafe-actions'
import {CityTypes, City} from './types'

//Load
export const loadCityRequest = (id: string) => action(CityTypes.LOAD_CITIES_REQUEST, id)
export const loadCitySuccess = (data: City[]) => action(CityTypes.LOAD_CITIES_SUCCESS, data)
export const loadCityFailure = (err: any[]) => action(CityTypes.LOAD_CITIES_FAILURE, err)

