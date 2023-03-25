
import React from "react";
import Banner from  './userDashboard/Banner'
import Footer from '../../common/footer/Footer.js'
import Header from './userDashboard/Header'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import PropertyCard from "../User/CardComponent/Card";
import Navbar from "../Navbar/Navbar";
 
import CardComponent from "../User/CardComponent/Card";
const Home =()=> {
  return (
    <div>
      {/* <Navbar />
      <Header />
      <Banner /> */}
      
      <CardComponent />
      {/* <div className="container" id="container">
              {products && products.map((product) => (
                <PropertyCard key={product._id} product={product} />
              ))}
            </div> */}

      <Footer />
    </div>
  )
}
export default Home;
