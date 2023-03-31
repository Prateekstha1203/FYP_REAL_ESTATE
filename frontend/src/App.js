import React from "react";
import "./App.css";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Properties from "./component/Property/Properties";
import UserData from "./more/UserData";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Store from "./store";
import ProtectedRoute from "./route/ProtectedRoute";
import Dashboard from "./component/Admin/Dashboard";
import CreateProperty from "./component/Admin/CreateProperty";
import AllProperty from "./component/Admin/AllProperty";
import EditProperty from "./component/Admin/EditProperty";
import AllUsers from "../../frontend/src/component/Admin/AllUsers";
import UpdateUser from "../../frontend/src/component/Admin/UpdateUser";
import Register from "./component/loginRegister/Register";
import Login from "./component/loginRegister/Login";
import Search from "./component/Property/Search";
import UpdatePassword from "./component/loginRegister/UpdatePassword";
import ResetPassword from "./component/loginRegister/ResetPassword";
import ForgotPassword from "./component/loginRegister/ForgetPassword";
import Footer from "./component/Common/footer/Footer";
import Header from "./component/Common/navbar/Header";
import Profile from "./component/loginRegister/Profile";
import UpdateProfile from "./component/loginRegister/UpdateProfile";
import Agents from "./component/Home/userDashboard/Agent/Agents";
import PropertyDetail from "./component/Property/PropertyDetail";
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
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        
        <Route exact path="/login" component={Login} />
        <Route exact path="/agent" component={Agents} />
        <Route exact path="/properties" component={Properties} />
        <Route path="/properties/:keywalue" component={Properties} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/property/:id" component={PropertyDetail} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update/info" component={UpdateProfile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/property"
          component={CreateProperty}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/properties"
          component={AllProperty}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/property/:id"
          component={EditProperty}
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
        {/* <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={AllReviews}
          /> */}
      </Switch>
    </Router>
  );
}

export default App;
