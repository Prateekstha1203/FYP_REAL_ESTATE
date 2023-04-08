import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deletePropertyReducer,
  newPropertyReducer,
  propertyDetailsReducer,
  propertiesReducer,
  topListingsReducer,
  sendAgentEmailReducer,
  rentalPropertiesReducer,
  salePropertiesReducer,
  agentPropertiesReducer,
  
} from "./reducers/PropertyReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  agentReducer,
  sendContactEmailReducer,
} from "./reducers/userReducer";
import { wishlistReducer,wishlistFetchReducer} from "./reducers/WistlistReducer";

const reducer = combineReducers({
  properties: propertiesReducer,
  propertyDetails: propertyDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  createProperty: newPropertyReducer,
  deleteProperty: deletePropertyReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  agents: agentReducer,
  wishlist: wishlistReducer,
  sendContactEmail: sendContactEmailReducer,
  topListings: topListingsReducer,
  sendAgentEmail:sendAgentEmailReducer,
  rentalProperties:rentalPropertiesReducer,
  saleProperties:salePropertiesReducer,
  agentProperties:agentPropertiesReducer,
  wishlistProperties:wishlistFetchReducer,
});

const initialState = {
  agents: [],
  wishlist: [],
  marker:[],
  amenity: "",
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
