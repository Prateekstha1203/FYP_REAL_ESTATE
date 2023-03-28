import React from "react";
import Footer from "../Common/footer/Footer";
import Header from "../Common/navbar/Header";
import PropertyCard from "../Property/PropertyCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, getProperty } from "../../actions/PropertyActions";
import SearchProperty from "./userDashboard/Search/SearchBar";
import Team from "./userDashboard/Agent/Team";

//  import Properties from "../User/Rent/Properties";
const Home = () => {
  const dispatch = useDispatch();
  const { properties, error, loading } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProperty());
  }, [dispatch, error]);

  return (
    <div>
      <Header />
      <SearchProperty />

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {properties &&
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
      </div>
      <Team />
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

      {/* <Properties /> */}

      <Footer />
    </div>
  );
};
export default Home;
