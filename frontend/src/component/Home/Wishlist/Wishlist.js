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

  const { wishlistProperties, loading } = useSelector(
    (state) => state.wishlistProperties
  );

  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isCompareDisabled, setIsCompareDisabled] = useState(true);
  const [showCompareTable, setShowCompareTable] = useState(false);

  const handleCompare = () => {
    console.log(selectedProperties);
    if (selectedProperties.length < 2) {
      toast.error("Please select at least two properties to compare");
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

  useEffect(() => {
    setIsCompareDisabled(selectedProperties.length < 2);
  }, [selectedProperties]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Header />
      <div className="container my-4">
        <div>
          <div className="wishlistheading ">Wishlist Properties</div>
        </div>
        {wishlistProperties && wishlistProperties.length > 0 ? (
          <div className="row">
            <div className="col-md-12">
              <button onClick={handleCompare} disabled={isCompareDisabled}>
                Compare
              </button>
            </div>
            <Carousel showDots={true} responsive={responsive}>
              {wishlistProperties.map((wish) => (
                <div classname="itemsWishlist" key={wish.id}>
                  <PropertyCard property={wish} user={wish.user} />
                  <input
                    type="checkbox"
                    className="wishlistCheckbox"
                    value={wish.id}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const selectedCount = selectedProperties.length;
                      if (isChecked && selectedCount >= 4) {
                        toast.error(
                          "You can only select up to four properties"
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
    </Fragment>
  );
};

export default Wishlist;
