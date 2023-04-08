import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST,
  FETCH_WISHLIST_PROPERTIES_FAILURE,
  FETCH_WISHLIST_PROPERTIES_REQUEST,
  FETCH_WISHLIST_PROPERTIES_SUCCESS,
} from "../constans/WistlistConstans";

export const wishlistReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: Array.isArray(state.wishlist)
          ? [...state.wishlist, action.payload]
          : [action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      if (state.wishlist && Array.isArray(state.wishlist)) {
        return {
          ...state,
          wishlist: state.wishlist.filter((id) => id !== action.payload),
        };
      }
      return state;

    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.wishlist,
      };
    default:
      return state;
  }
};


export const wishlistFetchReducer = (
  state = { wishlistProperties: [] },
  action
) => {
  switch (action.type) {
    case FETCH_WISHLIST_PROPERTIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WISHLIST_PROPERTIES_SUCCESS:
      return {
        ...state,
        wishlistProperties: action.payload,
        loading: false,
      };
    case FETCH_WISHLIST_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
