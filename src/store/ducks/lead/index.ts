import {Reducer} from 'redux'
import {LeadState, LeadTypes} from './types'

const INITIAL_STATE: LeadState = {
  data: {},
  error: {},
  loading: false,
}

const reducer: Reducer<LeadState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case LeadTypes.LOAD_LEAD_REQUEST:
      return {...state, loading: true, data: {}}
    case LeadTypes.LOAD_LEAD_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case LeadTypes.LOAD_LEAD_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //Create
    case LeadTypes.CREATE_LEAD_REQUEST:
      return {...state, loading: true, data: {}}
    case LeadTypes.CREATE_LEAD_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case LeadTypes.CREATE_LEAD_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //Update
    case LeadTypes.CONFIRM_LEAD_REQUEST:
      return {...state, loading: true, data: {}}
    case LeadTypes.CONFIRM_LEAD_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case LeadTypes.CONFIRM_LEAD_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //Delete
    case LeadTypes.NOTDISTURB_LEAD_REQUEST:
      return {...state, loading: true, data: {}}
    case LeadTypes.NOTDISTURB_LEAD_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data} //só uma data: pq excluiu o user "Excluido com sucesso."
    case LeadTypes.NOTDISTURB_LEAD_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}
    default:
      return state
  }
}

export default reducer
