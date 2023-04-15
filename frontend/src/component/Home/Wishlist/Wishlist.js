import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../more/Loader";
import {
  getWishlist,
  compareWishlistProperties,
} from "../../../actions/WistlistAction";
import "./Wishlist.css";
import PropertyCard from "../../Common/CardComponent/PropertyCard";
import CompareTable from "./CompareTable";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Common/navbar/Header";
import Footer from "../../Common/footer/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Wishlist = () => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const { wishlistProperties, loading } = useSelector(
    (state) => state.wishlistProperties
  );

  const [selectedProperties, setSelectedProperties] = useState([]);
  // const [isCompareDisabled, setIsCompareDisabled] = useState(true);
  const [showCompareTable, setShowCompareTable] = useState(false);

  const handleCompare = () => {
    console.log(selectedProperties);
    if (selectedProperties.length < 2) {
      if (!showToast) {
        setShowToast(true);
        toast.error("Please select at least two properties to compare", {
          onClose: () => setShowToast(false),
        });
      }
    } else {
      setShowCompareTable(true);
      dispatch(compareWishlistProperties(selectedProperties));
    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  // useEffect(() => {
  //   setIsCompareDisabled(selectedProperties.length < 2);
  // }, [selectedProperties]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Header />
      <div className="container my-2">
        <div className="wishlistContent">
          <div className="wishlistheading ">Wishlist Properties</div>
          {/* <div className="wishlistText">Click on the checkBox to compare property</div> */}
          <button onClick={handleCompare} className="compare">
            Compare
          </button>
        </div>
        {wishlistProperties && wishlistProperties.length > 0 ? (
          <div className="row">
            <div className="col-md-12"></div>
            <Carousel showDots={true} responsive={responsive}>
              {wishlistProperties.map((wish) => (
                <div className="itemsWishlist" key={wish.id}>
                  <PropertyCard property={wish} user={wish.user} />
                  <input
                    type="checkbox"
                    className="wishlistCheckbox"
                    value={wish.id}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const selectedCount = selectedProperties.length;
                      if (isChecked && selectedCount >= 3) {
                        toast.error(
                          "You can only select up to three properties"
                        );
                      } else {
                        setSelectedProperties((prevState) => {
                          if (isChecked) {
                            return [...prevState, wish];
                          } else {
                            return prevState.filter((p) => p.id !== wish.id);
                          }
                        });
                      }
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <p>Wishlist is empty</p>
        )}
        {showCompareTable && selectedProperties.length > 0 && (
          <CompareTable selectedProperties={selectedProperties} />
        )}
      </div>
      <Footer />
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

export default Wishlist;
