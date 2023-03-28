import React from "react";
import "./App.css";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import UserData from "./more/UserData";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Store from "./store";
import ProtectedRoute from "./route/ProtectedRoute";
import axios from "axios";
import { useState } from "react";
import  Dashboard from './component/Admin/Dashboard'
import CreateProduct from "./component/Admin/CreateProduct";
import AllProducts from "../../frontend/src/component/Admin/AllProducts";
import EditProduct from "../../frontend/src/component/Admin/EditProduct";
import AllUsers from "../../frontend/src/component/Admin/AllUsers";
import UpdateUser from "../../frontend/src/component/Admin/UpdateUser";
import AllReviews from "../../frontend/src/component/Admin/AllReviews";
import HouseContextProvider from "./component/Home/userDashboard/HouseContext";
import Register from "./component/loginRegister/Register";
import Login from "./component/loginRegister/Login";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
    
      <HouseContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Login} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product"
            component={CreateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={AllProducts}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/edit/product/:id"
            component={EditProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={AllUsers}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={AllReviews}
          />
        </Switch>
      </HouseContextProvider>
    </Router>
  );
}

export default App;
