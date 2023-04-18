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
  GET_RENTAL_PROPERTIES_REQUEST,
  GET_RENTAL_PROPERTIES_SUCCESS,
  GET_RENTAL_PROPERTIES_FAIL,
  GET_SALE_PROPERTIES_REQUEST,
  GET_SALE_PROPERTIES_SUCCESS,
  GET_SALE_PROPERTIES_FAIL,
  GET_AGENT_PROPERTIES_REQUEST,
  GET_AGENT_PROPERTIES_SUCCESS,
  GET_AGENT_PROPERTIES_FAIL,
} from "../constans/PropertyConstans";

export const getProperty = (
  keyword = "",
  currentPage = 1,
  category = "",
  propertyType = ""
) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PROPERTY_REQUEST,
    });

    let link = `/properties?keyword=${keyword}&page=${currentPage}`;

    if (category) {
      link += `&category=${category}`;
    }

    if (propertyType) {
      link += `&propertyType=${propertyType}`;
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

    const { data } = await axios.post(`/property/new`, propertyData, config);
    console.log(data);
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
export const getAgentProperties = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_AGENT_PROPERTIES_REQUEST });

    const { data } = await axios.get(`/agent/viewlisting/${id}`);
    console.log(data.properties);
    dispatch({
      type: GET_AGENT_PROPERTIES_SUCCESS,
      payload: data.properties,
    });
  } catch (error) {
    dispatch({
      type: GET_AGENT_PROPERTIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
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

    const { data } = await axios.delete(`/property/${id}`);

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

export const deleteAgentProperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROPERTY_REQUEST });

    const { data } = await axios.delete(`/property/${id}`);

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

    const { data } = await axios.put(`/property/${id}`, propertyData, config);

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

export const sendAgentEmail = (name, email, userMessage, propertyId) => async (
  dispatch
) => {
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

export const getRentalProperties = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RENTAL_PROPERTIES_REQUEST });
    const { data } = await axios.get("/properties/rent");
    dispatch({ type: GET_RENTAL_PROPERTIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RENTAL_PROPERTIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSaleProperties = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SALE_PROPERTIES_REQUEST });
    const { data } = await axios.get("/properties/sale");
    dispatch({ type: GET_SALE_PROPERTIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SALE_PROPERTIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const fetchAgentProperties = (agentId) => {
//   return async (dispatch) => {
//     dispatch({ type: FETCH_AGENT_PROPERTIES_REQUEST });
//     try {
//       const response = await fetch(`/agent/viewListing/${agentId}`);
//       console.log(response)
//       const properties = await response.json();
//       dispatch({ type: FETCH_AGENT_PROPERTIES_SUCCESS, payload: properties });
//     } catch (error) {
//       dispatch({ type: FETCH_AGENT_PROPERTIES_FAILURE, payload: error.message });
//     }
//   };
// };

// export const fetchAgentProperties = (id) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: FETCH_AGENT_PROPERTIES_REQUEST });
//       const response = await axios.get(`/agent/viewlisting/${id}`);
//       console.log(response);
//       const properties = response.data;
//       console.log(properties);
//       dispatch({ type: FETCH_AGENT_PROPERTIES_SUCCESS, payload: properties });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       dispatch({
//         type: FETCH_AGENT_PROPERTIES_FAILURE,
//         payload: error.message,
//       });
//       throw new Error("Unable to get agent properties");
//     }
//   };
// };
