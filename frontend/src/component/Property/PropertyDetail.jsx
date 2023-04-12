import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getPropertyDetails } from "../../actions/PropertyActions";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faBedEmpty } from "@fortawesome/free-solid-svg-icons";

import "./propertyDetail.css";
import Agent from "../../component/Home/Agent/agent.png";
import { Link } from "react-router-dom";
import { sendAgentEmail } from "../../actions/PropertyActions";


const PropertyDetail = ({ match, history }) => {
  const dispatch = useDispatch();

  const {
    property,
    amenities,
    longitude,
    latitude,
    loading,
    error,
  } = useSelector((state) => state.propertyDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getPropertyDetails(match.params.id));

    
  }, [dispatch, match.params.id, error]);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "Hello I am interested in your Real estate.",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, userMessage } = formData;
    const propertyId = match.params.id;
    console.log(name, email, userMessage, propertyId);
    dispatch(sendAgentEmail(name, email, userMessage, propertyId));
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${property.propertyTitle}`} />
          <section className="propertyDetails">
            <div className="container mx-auto min-height-800 mb-14">
              <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">
                <div>
                  <h4 className="font-weight-bold">{property.propertyTitle}</h4>
                  <h5 className="mb-4">{property.address}</h5>
                </div>
                <div className="mb-4 d-flex gap-2 align-items-center small ">
                  <div className="bg-success text-white px-4 py-1 rounded-pill">
                    {property.propertyType}
                  </div>
                  <div className="face text-white px-4 py-1  rounded-pill">
                    {property.category}
                  </div>
                </div>
                <div className="price font-weight-bold px-3 text-purple">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    style={{ color: "#6d1ed9" }}
                  />
                  {property.price}
                </div>
              </div>
              <div className="d-flex flex-column align-items-start gap-4 d-lg-flex flex-lg-row">
                <div className="mainDiv ">
                  <div className="mb-8">
                    {property.images &&
                      property.images.map((item, i) => (
                        <img className="CarouselImage" key={i} src={item.url} />
                      ))}
                  </div>
                  <div className=" details ">
                    <div className="d-flex gap-3 text-purple my-3">
                      <div className="d-flex gap-2 align-items-center">
                        <i class="fa-solid fa-bed"></i>
                        <div>{property.bedrooms}</div> <span>Bedrooms</span>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faRupeeSign} className="fs-6" />
                        <div>{property.bathrooms}</div>
                        <span>Bathrooms</span>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faRupeeSign} className="fs-6" />
                        <div>{property.areaSqFt}</div>
                        <span>Area SqFt</span>
                      </div>
                    </div>
                    <div className="describe">
                      <p>Description: {property.description}</p>
                      <span>longitude:{longitude}</span>
                      <span>latitude:{latitude}</span>
                      <span>Nearest Amenites</span>
                      {amenities && (
                        <ul>
                          {amenities.map((amenity, index) => (
                            <li key={index}>
                              {amenity.category} - {amenity.name} -{" "}
                              {amenity.distance} meters
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="messageClass ">
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div className="square">
                      <img src={Agent}></img>
                    </div>
                    <div>
                      <h5 className="font-weight-bold">Prateek Shrestha</h5>
                      <Link to="" className="text-primary custom-text-sm">
                        View Listing
                      </Link>
                    </div>
                  </div>
                  <form
                    className="d-flex flex-column gap-2"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.userMessage}
                      onChange={handleInputChange}
                    />
                    <div className="d-flex gap-x-2">
                      <button type="submit" className="btnMessage">
                        Send Message
                      </button>
                    </div>
                  </form>
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
    </Fragment>
  );
};

export default PropertyDetail;
