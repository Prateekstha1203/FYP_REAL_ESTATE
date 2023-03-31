import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
} from "../constans/WistlistConstans";

export const wishlistReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist:  action.property,
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (property) => property.id !== action.propertyId
        ),
      };
    case ADD_TO_COMPARE:
      return {
        ...state,
        compare: [...state.compare, action.payload],
      };
    case REMOVE_FROM_COMPARE:
      return {
        ...state,
        compare: state.compare.filter(
          (property) => property.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
