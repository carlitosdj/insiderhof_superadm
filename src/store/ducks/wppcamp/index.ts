import { Reducer } from "redux";
import { WppcampState, WppcampTypes } from "./types";

const INITIAL_STATE: WppcampState = {
  data: [],
  error: false,
  loading: false,
  camp: {},
  groupavailable: {},
};

const reducer: Reducer<WppcampState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case WppcampTypes.LOAD_ALLCAMP_REQUEST:
      return { ...state, loading: true };
    case WppcampTypes.LOAD_ALLCAMP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case WppcampTypes.LOAD_ALLCAMP_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    //Load single
    case WppcampTypes.LOAD_CAMP_REQUEST:
      return { ...state, loading: true };
    case WppcampTypes.LOAD_CAMP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        camp: action.payload.data,
      };
    case WppcampTypes.LOAD_CAMP_FAILURE:
      return { ...state, loading: false, error: action.payload, camp: {} };

    //Create
    case WppcampTypes.CREATE_CAMP_REQUEST:
      return { ...state };
    case WppcampTypes.CREATE_CAMP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, action.payload.data],
      };
    case WppcampTypes.CREATE_CAMP_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    //Update
    case WppcampTypes.UPDATE_CAMP_REQUEST:
      return { ...state };
    case WppcampTypes.UPDATE_CAMP_SUCCESS:
      console.log("ACTION PAYLOAD VER", action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      }; //update data?
    case WppcampTypes.UPDATE_CAMP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //Delete
    case WppcampTypes.DELETE_CAMP_REQUEST:
      return { ...state };
    case WppcampTypes.DELETE_CAMP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data.id),
      };
    case WppcampTypes.DELETE_CAMP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //Available
    case WppcampTypes.LOAD_WPPGROUPAVAILABLE_REQUEST:
      return { ...state, loading: true };
    case WppcampTypes.LOAD_WPPGROUPAVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        groupavailable: action.payload.data,
      };
    case WppcampTypes.LOAD_WPPGROUPAVAILABLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        groupavailable: {},
      };

    default:
      return state;
  }
};

export default reducer;
