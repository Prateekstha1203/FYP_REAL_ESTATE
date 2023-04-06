import React from "react";
import Footer from "../Common/footer/Footer";
import Header from "../Common/navbar/Header";
import PropertyCard from "../Common/CardComponent/PropertyCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, getProperty } from "../../actions/PropertyActions";

import Agents from "./Agent/Agents";

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

      <h2 className="homeHeading">Featured Properties</h2>
      <div className="container" id="container">
        <div className="row">
          {properties &&
            properties.map((property) => (
              <div className="col-md-4" key={property.id}>
                <PropertyCard property={property} className="card" />
              </div>
            ))}
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

      {/* <Properties /> */}

      <Footer />
    </div>
  );
};
export default Home;
