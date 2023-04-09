import React, { Fragment, useState, useEffect } from "react";
// import "./ResetPassword.css";
import Loader from "../../../more/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../actions/userAction";
import { toast, ToastContainer } from "react-toastify";
import MetaData from "../../../more/Metadata";
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
  }, [dispatch, error,  history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="container">
            <div className="row justify-content-center align-items-center mt-5">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4">
                      Update Profile
                    </h2>
                    <form onSubmit={resetPasswordSubmit}>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-lock"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-lock"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Update"
                        className="btn btn-primary btn-block"
                      />
                    </form>
                  </div>
                </div>
              </div>
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
      )}
    </Fragment>
  );
};

export default ResetPassword;
