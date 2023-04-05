import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAgents } from "../../../actions/userAction";
import React from "react";
import Loading from "../../../more/Loader";
import Team from "./Team";
import "./Team.css";
import Wishlist from "../Wishlist/Wishlist";
import flower from "../../../assets/GREYFLOWER.png";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
const Agents = () => {
  const dispatch = useDispatch();

  const { agents } = useSelector((state) => state.agents);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAgents())
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="agentClass">
          <div class="container">
            <div class="row justify-content-center text-center mb-5">
              <div class="col-lg-6 mb-3">
                <h2 class="font-weight-bold heading topAgent mb-4">
                  Our Agents
                </h2>
                <p class="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam enim pariatur similique debitis vel nisi qui
                  reprehenderit totam? Quod maiores.
                </p>
              </div>
            </div>
            <div class="row">
              {agents &&
                agents.agents.map((agent) => (
                  <div
                    class="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0 "
                    key={agent._id}
                  >
                    <div class="h-100 person">
                      <img
                        className="img-fluid "
                        src={agent.avatar.url}
                        alt={agent.name}
                      />

                      <div class="person-contents">
                        <h2 class="mb-0">
                          <a href="#" className="name">
                            {agent.name}
                          </a>
                        </h2>
                        <span class="meta d-block mb-3">
                          Our Real Estate{" "}
                          <span className="spanAgent">{agent.role}</span>
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere officiis inventore cumque tenetur
                          laboriosam, minus culpa doloremque odio, neque
                          molestias?
                        </p>

                        <img
                          src={flower}
                          alt=""
                          className="flower text-center mt-1 mb-2"
                        />
                        <div className="email">Email : {agent.email}</div>
                        <ul class="social list-unstyled list-inline dark-hover">
                          <li class="list-inline-item">
                            <a href="#">
                              <span class="icon-twitter">
                                <TwitterIcon style={{fontSize:"40px"}}/>
                              </span>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#">
                              <span className="d-flex align-items-center" style={{ width: "100%" }}>
                                <FacebookOutlinedIcon style={{fontSize:"40px"}}/>
                              </span>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#">
                              <span class="icon-github">
                                <GitHubIcon style={{fontSize:"40px"}}/>
                              </span>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#">
                              <span class="icon-instagram">
                                <InstagramIcon style={{fontSize:"40px"}} />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {/* <div class="section section-5 bg-light"></div>
        </div>
      )} */}
    </>
  );
};

export default Agents;
