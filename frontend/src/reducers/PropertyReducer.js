import {
  ALL_PROPERTY_FAIL,
  ALL_PROPERTY_REQUEST,
  ALL_PROPERTY_SUCCESS,
  CLEAR_ERRORS,
  PROPERTY_DETAILS_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  // NEW_REVIEW_REQUEST,
  // NEW_REVIEW_SUCCESS,
  // NEW_REVIEW_RESET,
  // NEW_REVIEW_FAIL,
  ADMIN_PROPERTY_REQUEST,
  ADMIN_PROPERTY_SUCCESS,
  ADMIN_PROPERTY_FAIL,
  NEW_PROPERTY_REQUEST,
  NEW_PROPERTY_SUCCESS,
  NEW_PROPERTY_FAIL,
  NEW_PROPERTY_RESET,
  DELETE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAIL,
  UPDATE_PROPERTY_FAIL,
  DELETE_PROPERTY_RESET,
  UPDATE_PROPERTY_RESET,
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

export const propertiesReducer = (state = { properties: [] }, action) => {
  switch (action.type) {
    case ALL_PROPERTY_REQUEST:
    case ADMIN_PROPERTY_REQUEST:
      return {
        loading: true,
        properties: [],
      };
    case ALL_PROPERTY_SUCCESS:
      return {
        loading: false,
        properties: action.payload.properties,
        propertiesCount: action.payload.propertiesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredPropertiesCount: action.payload.filteredPropertiesCount,
      };

    case ADMIN_PROPERTY_SUCCESS:
      return {
        loading: false,
        properties: action.payload,
      };

    case ALL_PROPERTY_FAIL:
    case ADMIN_PROPERTY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const getAgentPropertiesReducer = (state = { agentProperties: [] }, action) => {
  switch (action.type) {
    case GET_AGENT_PROPERTIES_REQUEST:
      return { loading: true, agentProperties: [] };
    case GET_AGENT_PROPERTIES_SUCCESS:
      return { loading: false, agentProperties: action.payload };
    case GET_AGENT_PROPERTIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const propertyDetailsReducer = (state = { property: {} }, action) => {
  switch (action.type) {
    case PROPERTY_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PROPERTY_DETAILS_SUCCESS:
      return {
        loading: false,
        property: action.payload.property,
        amenities: action.payload.amenities,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };
    case PROPERTY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// New Property ----Admin
export const newPropertyReducer = (state = { property: {} }, action) => {
  switch (action.type) {
    case NEW_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PROPERTY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        property: action.payload.property,
      };
    case NEW_PROPERTY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PROPERTY_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Property
export const deletePropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROPERTY_REQUEST:
    case UPDATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PROPERTY_FAIL:
    case UPDATE_PROPERTY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROPERTY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PROPERTY_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const topListingsReducer = (state = { topListings: [] }, action) => {
  switch (action.type) {
    case GET_TOP_LISTINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOP_LISTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        topListings: action.payload,
        success: true,
      };
    case GET_TOP_LISTINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  success: false,
  error: false,
};

export const sendAgentEmailReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
      return { loading: true, success: false, error: null };
    case SEND_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        message: action.payload,
      };
    case SEND_EMAIL_FAILURE:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const rentalPropertiesReducer = (
  state = { rentalProperties: [] },
  action
) => {
  switch (action.type) {
    case GET_RENTAL_PROPERTIES_REQUEST:
      return { loading: true, rentalProperties: [] };
    case GET_RENTAL_PROPERTIES_SUCCESS:
      return { loading: false, rentalProperties: action.payload.data };
    case GET_RENTAL_PROPERTIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const salePropertiesReducer = (
  state = { saleProperties: [] },
  action
) => {
  switch (action.type) {
    case GET_SALE_PROPERTIES_REQUEST:
      return { loading: true, saleProperties: [] };
    case GET_SALE_PROPERTIES_SUCCESS:
      return { loading: false, saleProperties: action.payload.data };
    case GET_SALE_PROPERTIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const agentPropertiesReducer = (
//   state = { agentProperties: [], loading: false, error: null },
//   action
// ) => {
//   switch (action.type) {
//     case FETCH_AGENT_PROPERTIES_REQUEST:
//       return { ...state, loading: true, error: null };
//     case FETCH_AGENT_PROPERTIES_SUCCESS:
//       return { ...state, loading: false, agentProperties: action.payload };
//     case FETCH_AGENT_PROPERTIES_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
