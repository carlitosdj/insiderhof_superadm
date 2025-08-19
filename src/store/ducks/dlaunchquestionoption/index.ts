import { Reducer } from 'redux';
import { LaunchQuestionOptionState, LaunchQuestionOptionTypes } from './types';

const INITIAL_STATE: LaunchQuestionOptionState = {
  options: [],
  option: null,
  error: false,
  loading: false,
};

const reducer: Reducer<LaunchQuestionOptionState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    // Load options by question
    case LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTIONS_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTIONS_SUCCESS:
      return { ...state, loading: false, error: false, options: action.payload.data };
    case LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload, options: [] };

    // Load single option
    case LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTION_SUCCESS:
      return { ...state, loading: false, error: false, option: action.payload.data };
    case LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTION_FAILURE:
      return { ...state, loading: false, error: action.payload, option: null };

    // Create
    case LaunchQuestionOptionTypes.CREATE_LAUNCHQUESTIONOPTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionOptionTypes.CREATE_LAUNCHQUESTIONOPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        options: [...state.options, action.payload.data]
      };
    case LaunchQuestionOptionTypes.CREATE_LAUNCHQUESTIONOPTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update
    case LaunchQuestionOptionTypes.UPDATE_LAUNCHQUESTIONOPTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionOptionTypes.UPDATE_LAUNCHQUESTIONOPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        options: state.options.map((option) =>
          option.id === action.payload.data.id ? action.payload.data : option
        ),
        option: state.option?.id === action.payload.data.id ? action.payload.data : state.option
      };
    case LaunchQuestionOptionTypes.UPDATE_LAUNCHQUESTIONOPTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete
    case LaunchQuestionOptionTypes.DELETE_LAUNCHQUESTIONOPTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionOptionTypes.DELETE_LAUNCHQUESTIONOPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        options: state.options.filter((option) => option.id !== action.payload),
        option: state.option?.id === action.payload ? null : state.option
      };
    case LaunchQuestionOptionTypes.DELETE_LAUNCHQUESTIONOPTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Reorder
    case LaunchQuestionOptionTypes.REORDER_LAUNCHQUESTIONOPTIONS_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionOptionTypes.REORDER_LAUNCHQUESTIONOPTIONS_SUCCESS:
      return { ...state, loading: false, error: false, options: action.payload.data };
    case LaunchQuestionOptionTypes.REORDER_LAUNCHQUESTIONOPTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Clear state
    case LaunchQuestionOptionTypes.CLEAR_LAUNCHQUESTIONOPTION_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;