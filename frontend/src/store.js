import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deletePropertyReducer,
  newPropertyReducer,
  propertyDetailsReducer,
  propertiesReducer,
} from "./reducers/PropertyReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";


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
});

let initialState = {
  properties:[],
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
