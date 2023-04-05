import React from "react";
 import "./aboutUs.css";
import work from "../../../assets/img/apartments/a5.png";
import avatar1 from "../../../assets/img/apartments/a6.png";
import Header from "../../Common/navbar/Header";
import Agents from "../Agent/Agents";
import Footer from "../../Common/footer/Footer";
const About = () => {
  return (
    <>
      <div>
        {/* ######## Start Home Section ######## */}
        <Header />
        <home>
          <div className="container-fluid">
            <div className="row">
              <div className="home col-12 mb-5 d-flex align-items-center justify-content-center bg-dark">
                <div className="row text-white text-center">
                  <div className="col-12 ">
                    <h1 className="abKarma">About Karma</h1>
                  </div>
                  <div className="col-12">
                    <span className="motto">
                      Karma is helping you to construct with happiness
                    </span>
                  </div>
                  <div className="col-12  mt-5">
                    <button className="learn">LEARN MORE</button>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row text-center">
                  <div className="col-12">
                    <h2 className="motto2 mt-5">
                      We're focused on precision and
                    </h2>
                    <h2 className="motto2">productivity</h2>
                    <div className="col-12 d-flex justify-content-between">
                      <div className="under "></div>
                    </div>
                    <div className="col-12 mt-5">
                      <span>
                        Our mission is to be the world’s most trusted field
                        management solution for construction
                      </span>
                    </div>
                    <div className="col-12 mb-5">
                      <span>teams on projects of any scale.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="bestService bg-dark row">
                  <div className="col-12 text-white text-center mt-5">
                    <h2>Karma have the</h2>
                    <h2>Best Services for you.</h2>
                  </div>
                  <div className="col-4 text-white mt-5 text-center">
                    <span>
                      <i class="dig fa-solid fa-person-digging"></i>
                    </span>
                    <h4 className="worker mt-5">Professional Workers</h4>
                    <span>
                      A professional is a member of a profession or any
                    </span>
                    <span> person who earns a living from a specified</span>
                    <span>professional activity.</span>
                  </div>
                  <div className="col-4 text-white mt-5 text-center">
                    <span>
                      <i class="down fa-solid fa-down-long"></i>
                    </span>
                    <h4 className="worker mt-5">Offer Low Price</h4>
                    <span>
                      Lowest price means the least possible amount that
                    </span>
                    <span> meets all requirements of a </span>
                    <span>purchasing agent.</span>
                  </div>
                  <div className="col-4 text-white mt-5 text-center">
                    <span>
                      <i class="fast fa-solid fa-gauge-simple-high"></i>
                    </span>
                    <h4 className="worker mt-5">Quick Quality Work</h4>
                    <span>Amount of Work Performed. The volume of work </span>
                    <span>produced in relation to the amount of work</span>
                    <span>requiring completion or attention.</span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="seeWork row bg-dark pt-5">
                  <div className="workImg col-6">
                    <img
                      className="how_Work mt-5 mb-5 ms-5 d-flex justify-content-between"
                      src={work}
                      alt="work"
                    />
                  </div>
                  <div className="col-6">
                    <div className="row pt-5">
                      <div className="col-12 text-white">
                        <h1 className="abKarma mt-5">Let's See How</h1>
                        <h1 className="abKarma">We Work</h1>
                        <h6>
                          Karma offers project completion with authenticity,
                          creativity and
                        </h6>
                        <h6>
                          style & where possible produced as close as own.
                        </h6>
                      </div>
                      <div className="col-12">
                        <div className="row text-white">
                          <div className="col-6">
                            <h4 className="mt-5 mb-3">Planning</h4>
                            <h6>
                              Planning may be defined as deciding in advance
                            </h6>
                            <h6>
                              what to be done in future. It is the process of
                            </h6>
                            <h6>
                              thinking before doing. It involves determination
                            </h6>
                            <h6>
                              of goals as well as the activities required to be{" "}
                            </h6>
                            <h6>undertaken to achieve the goals.</h6>
                          </div>
                          <div className="col-6">
                            <h4 className="mt-5 mb-3">Interior Design</h4>
                            <h6>
                              We can offer consultation services to clients to
                              understand their requirements and expectations.
                              This will enable you to provide personalized
                              solutions and create a design that meets their
                              specific needs.
                            </h6>
                          </div>
                          <div className="col-6">
                            <h4 className="mt-5 mb-3">Project Planning</h4>
                            <h6>
                              We can offer consultation services to clients to
                              understand their requirements and expectations.
                              This will enable you to provide personalized
                              solutions and create a design that meets their
                              specific needs.
                            </h6>
                          </div>
                          <div className="col-6">
                            <h4 className="mt-5 mb-3">Tender News</h4>
                            <h6>
                              We can stay up-to-date on industry trends and
                              developments, and use this information to identify
                              new tender opportunities as they emerge.
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-center mt-5 mb-5">
                    <Agents/>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </home>
        {/* ######## End Home Section ######## */}
      </div>
    </>
  );
};
export default About;