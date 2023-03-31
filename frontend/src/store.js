import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deletePropertyReducer,
  newPropertyReducer,
  propertyDetailsReducer,
  propertiesReducer,
} from "./reducers/PropertyReducer";
// import wishlistReducer from './reducers/WistlistReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, agentReducer } from "./reducers/userReducer";
import { wishlistReducer } from "./reducers/WistlistReducer";

const reducer = combineReducers({
  properties: propertiesReducer,
  propertyDetails: propertyDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  createProperty: newPropertyReducer,
  deleteProperty: deletePropertyReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword:forgotPasswordReducer,
  agent:agentReducer,
  wishlist:wishlistReducer,
});

let initialState = {
  properties: [],
  agent:[],
  isAuthenticated: false,
  wishlist:[],
};


const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
