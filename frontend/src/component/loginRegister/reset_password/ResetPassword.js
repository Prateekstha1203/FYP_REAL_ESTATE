import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../../../more/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../actions/userAction";
import { toast, ToastContainer } from "react-toastify";
import MetaData from "../../../more/Metadata";
import { Container, Form} from "react-bootstrap";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error, history, success]);

  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <Fragment>
    //       <MetaData title="Change Password" />
    //       <div className="container">
    //         <div className="row justify-content-center align-items-center mt-5">
    //           <div className="col-md-6">
    //             <div className="card">
    //               <div className="card-body updatePasswordBox">
    //                 <h2 className="card-title updatePasswordHeading text-center">
    //                   Update Profile
    //                 </h2>
    //                 <form onSubmit={resetPasswordSubmit} className="updatePasswordForm">
    //                   <div className="form-group">
    //                     <div className="input-group formgroup">
    //                       <div className="input-group-prepend">
    //                         <span className="input-group-text">
    //                           <i className="fas fa-lock"></i>
    //                         </span>
    //                       </div>
    //                       <input
    //                         type="password"
    //                         className="form-control"
    //                         placeholder="New Password"
    //                         required
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                       />
    //                     </div>
    //                   </div>
    //                   <div className="form-group ">
    //                     <div className="input-group formgroup">
    //                       <div className="input-group-prepend">
    //                         <span className="input-group-text">
    //                           <i className="fas fa-lock"></i>
    //                         </span>
    //                       </div>
    //                       <input
    //                         type="password"
    //                         className="form-control"
    //                         placeholder="Confirm Password"
    //                         required
    //                         value={confirmPassword}
    //                         onChange={(e) => setConfirmPassword(e.target.value)}
    //                       />
    //                     </div>
    //                   </div>
    //                   <input
    //                     type="submit"
    //                     value="Update"
    //                     className="btn btn-primary btn-block"
    //                   />
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <ToastContainer
    //         position="bottom-center"
    //         autoClose={5000}
    //         hideProgressBar={false}
    //         newestOnTop={false}
    //         closeOnClick
    //         rtl={false}
    //         pauseOnFocusLoss
    //         draggable
    //         pauseOnHover
    //       />
    //     </Fragment>
    //   )}
    // </Fragment>
    <Fragment className="container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <Container
            fluid
            className="d-flex justify-content-center align-items-center updatePasswordContainer h-100"
          >
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading text-center">
                Update Password
              </h2>

              <Form
                className="updatePasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <Form.Group className="formgroup">
                  <LockOpenIcon className="mb-1" />
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
      )}
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

export default ResetPassword;
