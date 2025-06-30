import { Reducer } from "redux";
import { CartsState, CartsTypes } from "./types";
const INITIAL_STATE: CartsState = {
  data: [],
  error: false,
  loading: false,
  selectedCarts: [],
  
};

const reducer: Reducer<CartsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case CartsTypes.LOAD_CARTS_REQUEST:
      return { ...state, loading: true };
    case CartsTypes.LOAD_CARTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      }; //2x .data oO
    case CartsTypes.LOAD_CARTS_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    //Load
    case CartsTypes.LOAD_CART_REQUEST:
      return { ...state, loading: true };
    case CartsTypes.LOAD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      }; //2x .data oO
    case CartsTypes.LOAD_CART_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    //Create
    case CartsTypes.CREATE_CART_REQUEST:
      return { ...state };
    case CartsTypes.CREATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data, ...state.data],
      };
    case CartsTypes.CREATE_CART_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    //Update
    case CartsTypes.UPDATE_CART_REQUEST:
      return { ...state };
    case CartsTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      };
    case CartsTypes.UPDATE_CART_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    //Delete
    case CartsTypes.DELETE_CART_REQUEST:
      return { ...state };
    case CartsTypes.DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data.id),
      }
    case CartsTypes.DELETE_CART_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };



    case CartsTypes.SELECTED_CART_ADD:
      return { ...state };

    case CartsTypes.SELECTED_CART_ADD_SUCCESS:
      return {
        ...state,
        selectedCarts: [...state.selectedCarts, action.payload],
      };

    case CartsTypes.SELECTED_CART_REMOVE:
      return { ...state };

    case CartsTypes.SELECTED_CART_REMOVE_SUCCESS:
      return {
        ...state,
        selectedCarts: state.selectedCarts?.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
