import React, { useEffect, useRef } from "react";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import "./slider.css";
import { Link } from "react-router-dom";
import img1 from "../../../assets/img/apartments/a6lg.png";
import img2 from "../../../assets/img/apartments/a5lg.png";
import img3 from "../../../assets/img/apartments/a3lg.png";
Swiper.use([Navigation]);

const Slider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 4000,
      },
      speed: 2000,
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
    });
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div
          className="swiper-slide"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
          }}
        >
          <p>
            Welcome To Fortune Real estate
            <br />
            The Best Properties place
            <br />
            <Link to="/properties">
              <button class="custom-btn btn-3">
                <span>View Properties</span>
              </button>
            </Link>
          </p>
        </div>
        <div
          className="swiper-slide"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
          
          }}
        >
          <p>
            Welcome To Fortune Real estate
            <br />
            The Best Properties place
            <br />
            <Link to="/properties">
              <button class="custom-btn btn-3">
                <span>View Properties</span>
              </button>
            </Link>
          </p>
        </div>
        <div
          className="swiper-slide"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${img3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
          }}
        >
          <p>
            Welcome To Fortune Real estate
            <br />
            The Best Properties place
            <br />
            <Link to="/properties">
              <button class="custom-btn btn-3">
                <span>View Properties</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
      <div ref={prevRef} className="swiper-button-prev"></div>
      <div ref={nextRef} className="swiper-button-next"></div>
    </div>
  );
};

export default Slider;
