import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Header from "../../Common/navbar/Header";
import Footer from "../../Common/footer/Footer";
import { clearErrors, updatePassword } from "../../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../constans/userContans";
import Loader from "../../../more/Loader";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../more/Metadata";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Update password successfully.")
      history.push("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment className="container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <Header />
          <Container
            fluid
            className="d-flex justify-content-center align-items-center updatePasswordContainer"
          >
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading text-center">
                Update Password
              </h2>

              <Form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <Form.Group className="formgroup">
                  <VpnKeyIcon className="mb-1" />
                  <Form.Control
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="formgroup">
                  <LockOpenIcon className="mb-1" />
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="formgroup">
                  <LockIcon className="mb-1" />
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <button className="updatePasswordBtn formgroup">Submit</button>
              </Form>
            </div>
          </Container>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
