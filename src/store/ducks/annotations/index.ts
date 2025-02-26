import {Reducer} from 'redux'
import {AnnotationsState, AnnotationsTypes} from './types'

const INITIAL_STATE: AnnotationsState = {
  data: [],
  error: {},
  loading: false,
}

const reducer: Reducer<AnnotationsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //All
    case AnnotationsTypes.LOAD_MY_ANNOTATIONS_REQUEST:
      return {...state, loading: true, data: []}
    case AnnotationsTypes.LOAD_MY_ANNOTATIONS_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case AnnotationsTypes.LOAD_MY_ANNOTATIONS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
