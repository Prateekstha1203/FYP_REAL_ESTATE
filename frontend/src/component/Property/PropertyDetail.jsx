import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getPropertyDetails } from "../../actions/PropertyActions";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/Metadata";
import Header from "../Common/navbar/Header";
import Footer from "../Common/footer/Footer";
import Loading from "../../more/Loader";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faBedFront,
  faBath,
} from "@fortawesome/free-solid-svg-icons";
import "./propertyDetail.css";
import Agent from "../../component/Home/userDashboard/Agent/agent.png";
import { Link } from "react-router-dom";
{
  /* <FontAwesomeIcon icon={faBedFront} />
<FontAwesomeIcon icon={faBath} /> 
<FontAwesomeIcon icon={faEnvelope} />*/
}
const PropertyDetail = ({ match, history }) => {
  const dispatch = useDispatch();

  const { property, loading, error } = useSelector(
    (state) => state.propertyDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getPropertyDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

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
                    <img src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></img>
                  </div>
                  <div className=" details ">
                    <div className="d-flex gap-3 text-purple my-3">
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faRupeeSign} className="fs-6" />
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
                    <div className="desc">Description: {property.description}</div>
                  </div>
                </div>
                <div className="messageClass ">
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div className="square">
                      <img src={Agent}></img>
                    </div>
                    <div>
                      <h5 className="font-weight-bold">Prateek shrestha</h5>
                      <Link to="" className="text-primary custom-text-sm">
                        View Listing
                      </Link>
                    </div>
                  </div>
                  <form className="d-flex flex-column gap-2">
                    <input type="text" placeholder="Enter your name"></input>
                    <input type="text" placeholder="Enter your Email"></input>
                    <textarea
                      placeholder="Message"
                      defaultValue="Hello I am interested in your Real estate."
                    ></textarea>
                    <div className="d-flex gap-x-2">
                      <button className="btnMessage">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* <div className="ProductDetails">
            <div className="first__varse">
              <Carousel>
                {property.images &&
                  property.images.map((listing, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={listing.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{property.propertyTitle}</h2>
              </div>
            </div>
          </div> */}
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

// return (
//   <>
//     {loading ? (
//       <Loading />
//     ) : (
//       <>
//         <MetaData title={`${property.propertyTitle}`} />
//         <Header />
//         <section className="propertyDetails">
//           <div className="container mx-auto min-h-[800px] px-14"></div>
//         </section>
//         <div className="ProductDetails">
//           <div className="first__varse">
//             <Carousel>
//               {property.images &&
//                 property.images.map((listing, i) => (
//                   <img
//                     className="CarouselImage"
//                     key={i}
//                     src={listing.url}
//                     alt={`${i} Slide`}
//                   />
//                 ))}
//             </Carousel>
//           </div>
//           <div className="varse__2">
//             <div className="detailsBlock-1">
//               <h2>{property.propertyTitle}</h2>
//             </div>
//            </div>
//         </div>
//         <ToastContainer
//           position="bottom-center"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <Footer />
//       </>
//     )}
//   </>
// );
// };

export default PropertyDetail;
