import { Reducer } from 'redux';
import { IdeactionState, IdeactionTypes, Ideaction } from './types';

const INITIAL_STATE: IdeactionState = {
  myIdeactions: [],
  ideaction: null,
  loading: true,
  error: false,
};

const reducer: Reducer<IdeactionState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case IdeactionTypes.REORDER_IDEACTIONS:
      return {...state, myIdeactions: action.payload }

    //Load
    case IdeactionTypes.LOAD_MY_IDEACTIONS_REQUEST:
      return {...state, loading: true, myIdeactions: []}
    case IdeactionTypes.LOAD_MY_IDEACTIONS_SUCCESS:
      return {...state, loading: false, error: false, myIdeactions: action.payload}
    case IdeactionTypes.LOAD_MY_IDEACTIONS_FAILURE:
      return {...state, loading: false, error: action.payload, myIdeactions: []}


    case IdeactionTypes.LOAD_IDEACTION_REQUEST:
      return {...state, loading: true,}
    case IdeactionTypes.LOAD_IDEACTION_SUCCESS:
      return {...state, loading: false, error: false, ideaction: action.payload}
    case IdeactionTypes.LOAD_IDEACTION_FAILURE:
      return {...state, loading: false, error: action.payload, ideaction: null}

    //Create
    case IdeactionTypes.CREATE_IDEACTION_REQUEST:
      return {...state}
    case IdeactionTypes.CREATE_IDEACTION_SUCCESS:
      return {...state, loading: false, error: false, myIdeactions: [...state.myIdeactions, action.payload]}
    case IdeactionTypes.CREATE_IDEACTION_FAILURE:
      return {...state, loading: false, error: action.payload, myIdeactions: []}

    //Update
    case IdeactionTypes.UPDATE_IDEACTION_REQUEST:
      return {...state}
    case IdeactionTypes.UPDATE_IDEACTION_SUCCESS:
      return {...state, loading: false, error: false, myIdeactions: state.myIdeactions?.map((ideaction) =>
        ideaction.id === action.payload.id ? action.payload : ideaction
      ),}
    case IdeactionTypes.UPDATE_IDEACTION_FAILURE:
      return {...state, loading: false, error: action.payload, myIdeactions: []}

    //Delete
    case IdeactionTypes.DELETE_IDEACTION_REQUEST:
      return {...state}
    case IdeactionTypes.DELETE_IDEACTION_SUCCESS:
      return {...state, loading: false, error: false, myIdeactions: state.myIdeactions.filter((item) => item.id !== action.payload.id)}
    case IdeactionTypes.DELETE_IDEACTION_FAILURE:
      return {...state, loading: false, error: action.payload, myIdeactions: []}
    default:
      return state
  }
}

export default reducer; 