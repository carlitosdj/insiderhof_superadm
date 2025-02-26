import {Reducer} from 'redux'
import {AnnotationState, AnnotationTypes} from './types'

const INITIAL_STATE: AnnotationState = {
  data: {},
  error: {},
  loading: false,
}

const reducer: Reducer<AnnotationState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Single
    case AnnotationTypes.LOAD_ANNOTATION_SINGLE_REQUEST:
      return {...state, loading: true, data: {}}
    case AnnotationTypes.LOAD_ANNOTATION_SINGLE_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data[0]}
    case AnnotationTypes.LOAD_ANNOTATION_SINGLE_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //Create
    case AnnotationTypes.CREATE_ANNOTATION_REQUEST:
      return {...state, loading: true}
    case AnnotationTypes.CREATE_ANNOTATION_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case AnnotationTypes.CREATE_ANNOTATION_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    default:
      return state
  }
}

export default reducer
