import React from "react";
import "./login.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../more/Loader";
import { clearErrors, register } from "../../actions/userAction";

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );


  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const { name, email, mobile, password } = user;


  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("mobile", mobile);
    dispatch(register(myForm));
    console.log(mobile);
  };

  

const registerDataChange = (e) => {
  {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
};

useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }

  if (isAuthenticated) {
    history.push("/");
  }
}, [dispatch, error, alert, history, isAuthenticated]);


return (
  <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <section className="background-radial-gradient overflow-hidden">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    .background-radial-gradient {\n      background-color: hsl(218, 41%, 15%);\n      background-image: radial-gradient(650px circle at 0% 0%,\n          hsl(218, 41%, 35%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%),\n        radial-gradient(1250px circle at 100% 100%,\n          hsl(218, 41%, 45%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%);\n    }\n\n    #radius-shape-1 {\n      height: 220px;\n      width: 220px;\n      top: -60px;\n      left: -130px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    #radius-shape-2 {\n      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n      bottom: -60px;\n      right: -110px;\n      width: 300px;\n      height: 300px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    .bg-glass {\n      background-color: hsla(0, 0%, 100%, 0.9) !important;\n      backdrop-filter: saturate(200%) blur(25px);\n    }\n  ",
            }}
          />
          <div className="container text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                <h1
                  className="my-5 display-5 fw-bold ls-tight"
                  style={{ color: "hsl(218, 81%, 95%)" }}
                >
                  The best offer <br />
                  <span style={{ color: "hsl(218, 81%, 75%)" }}>
                    for your business
                  </span>
                </h1>
                <p
                  className="mb-4 opacity-70"
                  style={{ color: "hsl(218, 81%, 85%)" }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Temporibus, expedita iusto veniam atque, magni tempora
                  mollitia dolorum consequatur nulla, neque debitis eos
                  reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
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
                    <h2>Register</h2>
                    <form
                      encType="multipart/form-data"
                      onSubmit={registerSubmit}
                    >
                      <div className="inputArea">
                        <div className="form-row">
                          <div className="col">
                            <div className="input-group">
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Name"
                                aria-describedby="name"
                                required
                                value={name}
                                onChange={registerDataChange}
                              />
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="username"
                                >
                                  <i className="fas fa-user"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col">
                            <div className="input-group">
                              <input
                                type="email"
                                name="email"
                                required
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={registerDataChange}
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
                            <div className="input-group">
                              <input
                                type="text"
                                name="mobile"
                                className="form-control"
                                placeholder="Enter Phone Number"                                required
                                value={mobile}
                                onChange={(e) => {
                                  if (!/^\d+$/.test(e.target.value) || e.target.value.length > 10) {
                                    e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                                  }
                                  registerDataChange(e);
                                }}
                              />
                              <div className="input-group-prepend">
                                <span className="input-group-text" id="Site">
                                  <i className="fas fa-phone"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col">
                            <div className="input-group">
                              <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Your Password"
                                aria-describedby="url"
                                required
                                value={password}
                                onChange={registerDataChange}
                              />
                              <div className="input-group-prepend">
                                <span className="input-group-text" id="url">
                                  <i className="fas fa-key"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-12">
                            <button
                              className="loginnow"
                              disable={loading}
                              type="submit"
                            >
                              {loading ? "Waiting..." : "Register"}
                            </button>
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
      </>
    )}
  </>
);
          };
export default Register;
