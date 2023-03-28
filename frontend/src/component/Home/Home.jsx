import React from "react";
import Banner from "./userDashboard/Banner";
import Footer from "../Common/footer/Footer";
import Header from "../Common/navbar/Header";
import Productcard from "../Products/productCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, getProduct } from "../../actions/ProductActions";
import SearchProperty from "./userDashboard/Search/SearchBar";

//  import Properties from "../User/Rent/Properties";
const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <div>
      <Header />
      <SearchProperty />

      {/* <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <Productcard key={product._id} product={product} />
          ))}
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

      {/* <Properties /> */}

      <Footer />
    </div>
  );
};
export default Home;
