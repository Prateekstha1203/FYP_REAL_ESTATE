import React from "react";
import Card from "react-bootstrap/Card";
import "./card.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import {
    clearErrors,
    getPropertyDetails,
  } from "../../actions/PropertyActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const PropertyCard = ({ property }) => {
    const dispatch = useDispatch();

    const {  error } = useSelector(
      (state) => state.propertyDetails
    );
  
  
    
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getPropertyDetails());
    }, [dispatch, error, alert]);
  
   
  
    // Increase quantity
    const [quantity] = useState(1);
  
  
    const addToFavouriteHandler = () => {
      dispatch(addFavouriteItemsToCart( quantity));
      toast.success("Product Added to Favourites");
    };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div>
          <Card>
            <div className="imgCard ps-3 pt-3">
              <Card.Body>
                <Card.Title>{property.propertyTitle}</Card.Title>
                <Card.Text>
                <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Add to wishlist
                    </span>
                  </div>


                  <h6 className="card-subtitle mb-2 text-muted">
                    {property.price}
                  </h6>
                  <p className="location">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {property.description}
                  </p>
                  <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                      <p className="location ">
                        <i className="fa-l fa-solid fa-home"></i>
                        {property.areaSqFt}
                      </p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                      <p className="location ">
                        <i className="fa-l fa-solid fa-bed"></i>{" "}
                        {property.bedrooms} Bed
                      </p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                      <p className="location ">
                        <i className="fa-l fa-solid fa-bath"></i>{" "}
                        {property.bathrooms} Bath
                      </p>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
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
    </>
  );
};

export default PropertyCard;
