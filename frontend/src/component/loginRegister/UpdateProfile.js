import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../../more/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import Header from "../Common/navbar/Header";
import Footer from "../Common/footer/Footer";
import { UPDATE_PROFILE_RESET } from "../../constans/userContans";
import MetaData from "../../more/Metadata";
import { toast, ToastContainer } from "react-toastify";
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("mobile", mobile);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <MetaData title="Update Profile" />
          <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-5">
                <div className="card">
                  <h2 className="card-header bg-secondary text-white text-center">Update Profile</h2>
                  <div className="card-body">
                    <form
                      className="updateProfileForm"
                      encType="multipart/form-data"
                      onSubmit={updateProfileSubmit}
                    >
                      <div className="row mb-3">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label className="col-form-label h4">Name</label>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Name"
                              required
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label className="col-form-label h4">Email</label>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              required
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label className="col-form-label h4">Contact</label>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group">
                            <input
                              type="string"
                              className="form-control"
                              id="mobile"
                              placeholder="Contact No"
                              required
                              name="mobile"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-3">
                          <div id="updateProfileImage" className="form-group">
                            <img src={avatarPreview} alt="Avatar Preview" />
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group">
                            <input
                              type="file"
                              className="form-control-file"
                              id="avatar"
                              accept="image/*"
                              onChange={updateProfileDataChange}
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-secondary">
                        Update
                      </button>
                    </form>
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

export default UpdateProfile;
