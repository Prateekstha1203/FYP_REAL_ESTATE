import axios from "axios";
import {
  ADMIN_PROPERTY_FAIL,
  ADMIN_PROPERTY_REQUEST,
  ADMIN_PROPERTY_SUCCESS,
  ALL_PROPERTY_FAIL,
  ALL_PROPERTY_REQUEST,
  ALL_PROPERTY_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PROPERTY_FAIL,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  NEW_PROPERTY_FAIL,
  NEW_PROPERTY_REQUEST,
  NEW_PROPERTY_SUCCESS,
  PROPERTY_DETAILS_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  UPDATE_PROPERTY_FAIL,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  GET_TOP_LISTINGS_REQUEST,
  GET_TOP_LISTINGS_SUCCESS,
  GET_TOP_LISTINGS_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
} from "../constans/PropertyConstans";

export const getProperty = (
  keyvalue = "",
  currentPage = 1,
  category,
  propertyType
) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PROPERTY_REQUEST,
    });

    let link = `/properties?keyvalue=${keyvalue}&page=${currentPage}}`;

    if (category) {
      link = `/properties?keyvalue=${keyvalue}&page=${currentPage}&category=${category}&propertyType=${propertyType}`;
    }
    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getTopListings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_LISTINGS_REQUEST });

    const { data } = await axios.get("/newListing");

    dispatch({
      type: GET_TOP_LISTINGS_SUCCESS,
      payload: data.topListings,
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_LISTINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get All Products Details
export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROPERTY_DETAILS_REQUEST });

    const { data } = await axios.get(`/property/${id}`);

    dispatch({
      type: PROPERTY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROPERTY_DETAILS_FAIL,
      payload: error.response.message,
    });
  }
};

// Create Product --------Admin
export const createProperty = (propertyData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PROPERTY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/admin/property/new`,
      propertyData,
      config
    );

    dispatch({
      type: NEW_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products -----Admin
export const getAdminProperty = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PROPERTY_REQUEST });

    const { data } = await axios.get("/admin/properties");

    dispatch({
      type: ADMIN_PROPERTY_SUCCESS,
      payload: data.properties,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product ------Admin
export const deleteProperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROPERTY_REQUEST });

    const { data } = await axios.delete(`/admin/property/${id}`);

    dispatch({
      type: DELETE_PROPERTY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProperty = (id, propertyData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROPERTY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/admin/property/${id}`, propertyData, config);

    dispatch({
      type: UPDATE_PROPERTY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};




export const sendAgentEmail = (name, email, userMessage, propertyId) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_EMAIL_REQUEST,
    });

    const { data } = await axios.post("/property/:id", {
      name,
      email,
      userMessage,
      propertyId,
    });
    dispatch({
      type: SEND_EMAIL_SUCCESS,
      payload: data.message,
    });

  } catch (error) {
    dispatch({
      type: SEND_EMAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
