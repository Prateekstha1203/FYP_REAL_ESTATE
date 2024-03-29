import React from "react";
import "./App.css";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Store from "./store";
import { useSelector } from "react-redux";
import ProtectedRoute from "./route/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewListingCard from "./component/Common/CardComponent/NewListingCard";

import Login from "./component/loginRegister/loginRegister/Login";
import Register from "./component/loginRegister/loginRegister/Register";
import ContactForm from "./component/Home/ContactUs/ContactForm";
import Properties from "./component/Property/Properties";
import PropertyDetail from "./component/Property/PropertyDetail";

import CreateProperty from "./component/Agent/CreateProperty/CreateProperty";
import AllUsers from "../../frontend/src/component/Admin/allpropertyuser/AllUsers";
import Dashboard from "./component/Admin/adminDashboard/Dashboard";
import AllProperty from "./component/Admin/allpropertyuser/AllProperty";
import UpdateProperty from "./component/Agent/EditProperty/EditProperty";

import Agents from "./component/Home/Agent/Agents";
import UserData from "./more/UserData";

import Profile from "./component/loginRegister/userprofile/Profile";
import UpdateUser from "../../frontend/src/component/Admin/EditPropertyUser/UpdateUser";
import UpdatePassword from "./component/loginRegister/reset_password/UpdatePassword";
import ResetPassword from "./component/loginRegister/reset_password/ResetPassword";
import ForgotPassword from "./component/loginRegister/forget_password/ForgetPassword";
import UpdateProfile from "./component/loginRegister/userprofile/UpdateProfile";
import NewListing from "./component/Home/NewListing/NewListing";
import { loadUser } from "./actions/userAction";
import Wishlist from "./component/Home/Wishlist/Wishlist";
import About from "./component/Home/About/AboutUs";
import ViewListing from "./component/Agent/CreateProperty/ViewListing";

import AgentDashboard from "./component/Agent/AgentDashboard/AgentDashboard";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Lato", "Source Sans Pro", "Poppins"],
      },
    });

    Store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      <Switch>
        <Route exact path="/card" component={NewListingCard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/wishlist" component={Wishlist} />
        <Route exact path="/about" component={About} />
        <Route exact path="/newListing" component={NewListing} />

        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/agent" component={Agents} />
        <Route exact path="/properties" component={Properties} />
        <Route path="/properties/:keyword" component={Properties} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/property/:id" component={PropertyDetail} />
        <ProtectedRoute
          exact
          path="/me/update/info"
          component={UpdateProfile}
        />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute
          exact
          path="/me/update/info"
          component={UpdateProfile}
        />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <ProtectedRoute
          isAgent={true}
          exact
          path="/agent/property"
          component={CreateProperty}
        />
        <ProtectedRoute
          isAgent={true}
          exact
          path="/agent/viewlisting/:id"
          component={ViewListing}
        />

        <ProtectedRoute
          isAgent={true}
          exact
          path="/agentDashboard"
          component={AgentDashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/properties"
          component={AllProperty}
        />
        <ProtectedRoute
          isAgent={true}
          exact
          path="/edit/property/:id"
          component={UpdateProperty}
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
      </Switch>
    </Router>
  );
}

export default App;
