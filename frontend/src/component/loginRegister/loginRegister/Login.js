import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { login, clearErrors } from "../../../actions/userAction";
import Loader from "../../../more/Loader";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/");
      toast.success("Successfully login to home page.");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="background-radial-gradient loginTop">
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n    .background-radial-gradient {\n      background-color: hsl(218, 41%, 15%);\n      background-image: radial-gradient(650px circle at 0% 0%,\n          hsl(218, 41%, 35%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%),\n        radial-gradient(1250px circle at 100% 100%,\n          hsl(218, 41%, 45%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%);\n    }\n\n    #radius-shape-1 {\n      height: 220px;\n      width: 220px;\n      top: -60px;\n      left: -130px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    #radius-shape-2 {\n      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n      bottom: -60px;\n      right: -110px;\n      width: 300px;\n      height: 300px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    .bg-glass {\n      background-color: hsla(0, 0%, 100%, 0.9) !important;\n      backdrop-filter: saturate(200%) blur(25px);\n    }\n  ",
              }}
            />
            <div className="container text-center text-lg-start ">
              <div className="row gx-lg-5 align-items-center ">
                <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                  <h1
                    className="my-5 display-5 fw-bold ls-tight"
                    style={{ color: "hsl(218, 81%, 95%)" }}
                  >
                    The best offer <br />
                    <span style={{ color: "hsl(218, 81%, 75%)" }}>
                      for your future home.
                    </span>
                  </h1>
                  <p
                    className="mb-4 opacity-70"
                    style={{ color: "hsl(218, 81%, 85%)" }}
                  >
                    Real estate is not about selling houses, it's about making
                    dreams come true and building lasting relationships with our
                    clients.
                  </p>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                  <div
                    id="radius-shape-1"
                    className="position-absolute rounded-circle shadow-5-strong"
                  />
                  <div
                    id="radius-shape-2"
                    className="position-absolute shadow-5-strong"
                  />
                  <div className="card bg-glass logRegForm">
                    <div className=" card-body  contact_form_wrappre2">
                      <form onSubmit={loginSubmit}>
                        <div className="inputArea">
                          <div className="form-row">
                            <div className="col">
                              <div className="input-group">
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter Email Address"
                                  aria-describedby="Site"
                                  required
                                  value={loginEmail}
                                  onChange={(event) =>
                                    setLoginEmail(event.target.value)
                                  }
                                />
                                <div className="input-group-prepend">
                                  <span className="input-group-text" id="Site">
                                    <i className="fas fa-envelope"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col">
                              <div className="input-group mb-3">
                                <input
                                  type="password"
                                  name="password"
                                  className="form-control"
                                  placeholder="Your Password"
                                  aria-describedby="url"
                                  required
                                  value={loginPassword}
                                  onChange={(event) =>
                                    setLoginPassword(event.target.value)
                                  }
                                />
                                <div className="input-group-prepend">
                                  <span className="input-group-text" id="url">
                                    <i className="fas fa-key"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row mb-0">
                            <div className="col">
                              <div className="d-flex justify-content-end align-items-center  forget">
                                <Link to="/password/forgot">
                                  Forget Password ?
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="col-md-12">
                              <div className="col-md-12">
                                <button
                                  className="loginnow"
                                  disable={loading}
                                  type="submit"
                                >
                                  {loading ? "Waiting..." : "Login"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
        </>
      )}
    </>
  );
};

export default Login;
