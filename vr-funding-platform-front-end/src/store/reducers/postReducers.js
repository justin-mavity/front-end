import {
  FETCH_FUNDRAISERS_START,
  FETCH_FUNDRAISERS_SUCCESS,
  FETCH_FUNDRAISERS_ERROR,
  FUNDRAISER_ADD,
  FUNDRAISER_ADD_ERROR,
  FUNDRAISER_DELETE,
  FUNDRAISER_DELETE_ERROR,
  FUNDRAISER_EDIT,
  FUNDRAISER_EDIT_ERROR,
} from "../actions/PostActions";

const initialState = {
  fundraisers: [],
  loading: false,
  error: "",
};

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FUNDRAISERS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FUNDRAISERS_SUCCESS:
      return {
        ...state,
        loading: false,
        fundraisers: action.payload,
      };
    case FETCH_FUNDRAISERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FUNDRAISER_ADD:
      return {
        ...state,
        loading: false,
        fundraisers: action.payload,
      };
    case FUNDRAISER_ADD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FUNDRAISER_DELETE:
      return {
        ...state,
        loading: false,
        fundraisers: action.payload,
      };
    case FUNDRAISER_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FUNDRAISER_EDIT:
      return {
        ...state,
        loading: false,
        fundraisers: action.payload,
      };
    case FUNDRAISER_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
