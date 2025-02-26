import {Reducer} from 'redux'
import {ContactState, ContactsTypes} from './types'
const INITIAL_STATE: ContactState = {
  all: [],
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<ContactState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case ContactsTypes.LOAD_ALLCONTACT_REQUEST:
      return {...state, loading: true}
    case ContactsTypes.LOAD_ALLCONTACT_SUCCESS:
      return {...state, loading: false, error: false, all: action.payload.data}
    case ContactsTypes.LOAD_ALLCONTACT_FAILURE:
      return {...state, loading: false, error: action.payload, all: []}

    //Load single
    case ContactsTypes.LOAD_CONTACT_REQUEST:
      return {...state, loading: true}
    case ContactsTypes.LOAD_CONTACT_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ContactsTypes.LOAD_CONTACT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case ContactsTypes.CREATE_CONTACT_REQUEST:
      return {...state}
    case ContactsTypes.CREATE_CONTACT_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case ContactsTypes.CREATE_CONTACT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case ContactsTypes.UPDATE_CONTACT_REQUEST:
      return {...state}
    case ContactsTypes.UPDATE_CONTACT_SUCCESS:
      console.log('ACTION PAYLOAD VER', action.payload)
      return {
        ...state,
        loading: false,
        error: false,
        all: state.all?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      } //update data?
    case ContactsTypes.UPDATE_CONTACT_FAILURE:
      return {...state, loading: false, error: action.payload}

      //Delete
    case ContactsTypes.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data),
        all: state.all?.filter((item) => item.id !== action.payload.data),
      } //só uma data: pq excluiu o user "Excluido com sucesso."
    case ContactsTypes.DELETE_CONTACT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
