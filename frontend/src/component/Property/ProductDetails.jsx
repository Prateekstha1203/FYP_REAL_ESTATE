import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getPropertyDetails,
} from "../../actions/PropertyActions";
import Footer from "../../Footer";
import MetaData from "../../more/Metadata";
import Header from "../Home/Header";
import "./Productdetails.css";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import ReviewCard from "./ReviewCard.jsx";
import Loading from "../../more/Loader";

const PropertyDetails = ({ match, history }) => {
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

  const options = {
    value: property.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${property.propertyTitle}`} />
          <Header />
          <div className="ProductDetails">
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
          <Footer />
        </>
      )}
    </>
  );
};

export default PropertyDetails;
