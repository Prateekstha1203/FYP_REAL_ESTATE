import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "../SideBarAdmin/Sidebar";
import { UPDATE_USER_RESET } from "../../../constans/userContans";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../../actions/userAction";
import Loading from "../../../more/Loader";
import { ToastContainer, toast } from "react-toastify";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();

  const {
    loading: userLoading,
    error: userDetailsError,
    user: userDetails,
  } = useSelector((state) => state.userDetails);

  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (userDetails && userDetails._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
      setRole(userDetails.role);
    }
    if (userDetailsError) {
      toast.error(userDetailsError);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    userDetailsError,
    history,
    isUpdated,
    updateError,
    userDetails,
    userId,
  ]);

  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(userId, formData));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {userLoading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={handleUpdateUserSubmit}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">admin</option>
                  <option value="agent">agent</option>
                  <option value="user">user</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default UpdateUser;
