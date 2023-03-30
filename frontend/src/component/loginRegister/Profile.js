
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../more/Metadata";
import Loader from "../../more/Loader";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Common/navbar/Header";
import Footer from "../Common/footer/Footer";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <MetaData title={`${user.name}'s Profile`} />
          <div className="container ">
            <div className="row justify-content-center align-items-center mt-5">
              <div className="col-md-4 h-20">
                <div className="card mb-4">
                  <div className="card-header bg-secondary text-white">
                    <h3 className="m-0">Profile Picture</h3>
                  </div>
                  <div className="card-body text-center">
                    <img
                      className="img-account-profile rounded-circle mb-2"
                      src={user.avatar.url}
                      alt={user.name}
                      style={{ width: "130px", height: "130px" }}
                    />
                    <div className="small font-italic text-muted mb-2">
                      JPG or PNG no larger than 5 MB
                    </div>
                    <Link className="btn btn-secondary heading" to="/me/update">
                      Update Password
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-8 h-20">
                <div className="card mb-4">
                  <div className="card-header bg-secondary text-white">
                    <h3 className="m-0">Account Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <h4 className="fw-bold">Full Name</h4>
                      </div>
                      <div className="col-sm-8">
                        <p className="card-text">{user.name}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <h4 className="fw-bold">Email</h4>
                      </div>
                      <div className="col-sm-8">
                        <p className="card-text">{user.email}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <h4 className="fw-bold">Contact</h4>
                      </div>
                      <div className="col-sm-8">
                        <p className="card-text">{user.mobile}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <h4 className="fw-bold">Joined On</h4>
                      </div>
                      <div className="col-sm-8">
                        <p className="card-text">
                          {String(user.createdAt).substr(0, 10)}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <a href="/me/update/info" className="btn btn-secondary">
                          Change Detail
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
