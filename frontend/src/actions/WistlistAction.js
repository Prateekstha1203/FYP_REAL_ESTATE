import {
  FETCH_WISHLIST_PROPERTIES_REQUEST,
  FETCH_WISHLIST_PROPERTIES_SUCCESS,
  FETCH_WISHLIST_PROPERTIES_FAILURE,
  COMPARE_WISHLIST_PROPERTIES
} from "../constans/WistlistConstans";
import axios from "axios";

export const addToWishlist = (propertyId) => async (dispatch) => {
  try {
    const response = await axios.post(`/addToWishlist/${propertyId}`);

    if (response.data.success) {
      dispatch({
        type: 'ADD_TO_WISHLIST',
        payload: response.data.wishlist,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFromWishlist = (propertyId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/removeFromWishlist/${propertyId}`);

    if (response.data.success) {
      dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: response.data.wishlist,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getWishlist = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_WISHLIST_PROPERTIES_REQUEST });
    const res = await axios.get("/wishlist");
    console.log(res.data.wishlist[0].properties)
    dispatch({
      type: FETCH_WISHLIST_PROPERTIES_SUCCESS,
      payload: res.data.wishlist[0].properties,
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: FETCH_WISHLIST_PROPERTIES_FAILURE });
  }
};


export const compareWishlistProperties = (selectedProperties) => (dispatch) => {
  dispatch({ type: COMPARE_WISHLIST_PROPERTIES, payload: selectedProperties });
};
