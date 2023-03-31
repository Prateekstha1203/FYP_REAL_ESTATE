import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  // FETCH_WISHLIST_PROPERTIES_REQUEST,
  // FETCH_WISHLIST_PROPERTIES_SUCCESS,
  // FETCH_WISHLIST_PROPERTIES_FAILURE,
} from "../constans/WistlistConstans";

export const addToWishlist = (property) => ({
  type: ADD_TO_WISHLIST,
  payload: property,
});

export const removeFromWishlist = (propertyId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: propertyId,
});

// export const addToCompare = (property) => {
//   return {
//     type: ADD_TO_COMPARE,
//     payload: property,
//   };
// };

// export const removeFromCompare = (propertyId) => {
//   return {
//     type: REMOVE_FROM_COMPARE,
//     payload: propertyId,
//   };


// export const fetchWishlistProperties = () => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_WISHLIST_PROPERTIES_REQUEST });
//     const { data } = await axios.get("/api/wishlist");
//     dispatch({
//       type: FETCH_WISHLIST_PROPERTIES_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_WISHLIST_PROPERTIES_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
