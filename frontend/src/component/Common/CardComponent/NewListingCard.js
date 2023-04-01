import React from "react";
import Logo from "../fortune.png";
const NewListingCard = () => {
  return (
    <div className="newListingCard">
      <div class="row">
        <div class="col-12">
          <div className="property-item">
            <a href="property-single.html" className="img">
              <img src={Logo} alt="Image" className="img-fluid" />
            </a>

            <div className="property-content">
              <div className="price mb-2">
                <span>$1,291,000</span>
              </div>
              <div>
                <span className="d-block mb-2 text-black-50">
                  5232 California Fake, Ave. 21BC
                </span>
                <span className="city d-block mb-3">California, USA</span>

                <div className="specs d-flex mb-4">
                  <span className="d-block d-flex align-items-center me-3">
                    <span className="icon-bed me-2"></span>
                    <span className="caption">2 beds</span>
                  </span>
                  <span className="d-block d-flex align-items-center">
                    <span className="icon-bath me-2"></span>
                    <span className="caption">2 baths</span>
                  </span>
                </div>

                <a
                  href="property-single.html"
                  className="btn btn-primary py-2 px-3"
                >
                  See details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewListingCard;
