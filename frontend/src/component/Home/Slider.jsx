import React from "react";

const Slider = () => {
  return (
    <>
      <section className="slider">
        <div id="wowslider-container1">
          <div className="ws_images">
            <ul>
              <li>
                <img
                  src="https://www.bulgarihotels.com/.imaging/bhr-wide-big-jpg/dam/BEIJING/what-s-on/won-feb-2019/yvonneyu-d82f55.zip/Bulgari-Fitness-Membership.jpg/jcr%3Acontent"
                  alt="Spa Website 1"
                  title=""
                  id="wows1_0"
                />
                <p>Beauty &amp; Harmony Can Coexist</p>
                <h5>Looking for a Beauty</h5>
                <button type="button" className="main-slider-btn ">
                  View More
                </button>
              </li>
              <li>
                <img
                  src="https://nikerishotelgroup.com/wp-content/uploads/2018/07/spa-2.jpg"
                  alt="image slider"
                  title=""
                  id="wows1_1"
                />
                <p>Beauty &amp; Harmony Can Coexist</p>
                <h5>Looking for a Beauty</h5>
                <button type="button" className="main-slider-btn">
                  View More
                </button>
              </li>
              <li>
                <img
                  src="https://www.daffodilhotel.co.uk/media/2098/spa-facilities-1920x1080-2.jpg?mode=pad&quality=80"
                  alt="SPA WEBSITE"
                  title=""
                  id="wows1_2"
                />
                <p>Beauty &amp; Harmony Can Coexist</p>
                <h5>Looking for a Beauty</h5>
                <button type="button" className="main-slider-btn ">
                  View More
                </button>
              </li>
            </ul>
          </div>
          <div className="ws_bullets">
            <div>
              <a href="#" title="Sap Website">
                <span>1</span>
              </a>
              <a href="#" title="spa website">
                <span>2</span>
              </a>
              <a href="#" title="SPA WEBSITE">
                <span>3</span>
              </a>
            </div>
          </div>
          <div className="ws_shadow" />
        </div>
      </section>
    </>
  );
};

export default Slider;
