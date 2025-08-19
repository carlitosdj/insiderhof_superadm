import { Reducer } from 'redux';
import { LaunchQuestionState, LaunchQuestionTypes } from './types';

const INITIAL_STATE: LaunchQuestionState = {
  questions: [],
  question: null,
  error: false,
  loading: false,
};

const reducer: Reducer<LaunchQuestionState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    // Load questions by launch phase
    case LaunchQuestionTypes.LOAD_LAUNCHQUESTIONS_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionTypes.LOAD_LAUNCHQUESTIONS_SUCCESS:
      return { ...state, loading: false, error: false, questions: action.payload.data };
    case LaunchQuestionTypes.LOAD_LAUNCHQUESTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload, questions: [] };

    // Load single question
    case LaunchQuestionTypes.LOAD_LAUNCHQUESTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionTypes.LOAD_LAUNCHQUESTION_SUCCESS:
      return { ...state, loading: false, error: false, question: action.payload.data };
    case LaunchQuestionTypes.LOAD_LAUNCHQUESTION_FAILURE:
      return { ...state, loading: false, error: action.payload, question: null };

    // Create
    case LaunchQuestionTypes.CREATE_LAUNCHQUESTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionTypes.CREATE_LAUNCHQUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        questions: [...state.questions, action.payload.data]
      };
    case LaunchQuestionTypes.CREATE_LAUNCHQUESTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update
    case LaunchQuestionTypes.UPDATE_LAUNCHQUESTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionTypes.UPDATE_LAUNCHQUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        questions: state.questions.map((question) =>
          question.id === action.payload.data.id ? action.payload.data : question
        ),
        question: state.question?.id === action.payload.data.id ? action.payload.data : state.question
      };
    case LaunchQuestionTypes.UPDATE_LAUNCHQUESTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete
    case LaunchQuestionTypes.DELETE_LAUNCHQUESTION_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionTypes.DELETE_LAUNCHQUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        questions: state.questions.filter((question) => question.id !== action.payload),
        question: state.question?.id === action.payload ? null : state.question
      };
    case LaunchQuestionTypes.DELETE_LAUNCHQUESTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Reorder
    case LaunchQuestionTypes.REORDER_LAUNCHQUESTIONS_REQUEST:
      return { ...state, loading: true };
    case LaunchQuestionTypes.REORDER_LAUNCHQUESTIONS_SUCCESS:
      return { ...state, loading: false, error: false, questions: action.payload.data };
    case LaunchQuestionTypes.REORDER_LAUNCHQUESTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Clear state
    case LaunchQuestionTypes.CLEAR_LAUNCHQUESTION_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;