import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Form, Button ,Container} from "react-bootstrap";
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
      <div className="dashboard row">
        <div className="SlideBar col-2">
          <SideBar />
        </div>
        <div className="newProductContainer col-9">
          {userLoading ? (
            <Loading />
          ) : (
            // <div className="newProductContainer">
            //   <h1>Update User</h1>

            //   <Form
            //     className="createProductForm"
            //     onSubmit={handleUpdateUserSubmit}
            //   >
            //     <Form.Group controlId="name">
            //       <PersonIcon />
            //       <Form.Control
            //         type="text"
            //         placeholder="Name"
            //         required
            //         value={name}
            //         onChange={(e) => setName(e.target.value)}
            //       />
            //     </Form.Group>

            //     <Form.Group controlId="email">
            //       <MailOutlineIcon />
            //       <Form.Control
            //         type="email"
            //         placeholder="Email"
            //         required
            //         value={email}
            //         onChange={(e) => setEmail(e.target.value)}
            //       />
            //     </Form.Group>

            //     <Form.Group controlId="role">
            //       <VerifiedUserIcon />
            //       <Form.Control
            //         as="select"
            //         value={role}
            //         onChange={(e) => setRole(e.target.value)}
            //         required
            //       >
            //         <option value="">Choose Role</option>
            //         <option value="admin">admin</option>
            //         <option value="agent">agent</option>
            //         <option value="user">user</option>
            //       </Form.Control>
            //     </Form.Group>

            //     <Button
            //       id="createProductBtn"
            //       type="submit"
            //       disabled={role === "" ? true : false}
            //     >
            //       Update
            //     </Button>
            //   </Form>
            // </div>
            <Container
              fluid
              className="d-flex justify-content-center align-items-center updatePasswordContainer"
            >
              <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading text-center">
                  Change User Role
                </h2>

                <Form
                  className="updatePasswordForm"
                  onSubmit={handleUpdateUserSubmit}
                >
                  <Form.Group className="formgroup">
                    <PersonIcon />
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="formgroup">
                    <VerifiedUserIcon/>
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      style={{ paddingLeft: '3.2rem' }}
                    >
                      <option value="">Choose Role</option>
                      <option value="admin">admin</option>
                      <option value="agent">agent</option>
                      <option value="user">user</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    className="updatePasswordBtn"
                    type="submit"
                    disabled={role === "" ? true : false}
                  >
                    Update
                  </Button>
                </Form>
              </div>
            </Container>
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
