import React from "react";
import "./Team.css";
import Image from "./agent.png";

const Team = () => {
  const team_member = [
    {
      list: "50",
      cover: "./agent.png",
      address: "Liverpool, Canada",
      name: "Sargam S. Singh",
      icon: [
        <i class="fa-brands fa-facebook-f"></i>,
        <i class="fa-brands fa-linkedin"></i>,
        <i class="fa-brands fa-twitter"></i>,
        <i class="fa-brands fa-instagram"></i>,
      ],
    },
    {
      list: "70",
      cover: "./agent.png",
      address: "Montreal, Canada",
      name: "Harijeet M. Siller",
      icon: [
        <i class="fa-brands fa-facebook-f"></i>,
        <i class="fa-brands fa-linkedin"></i>,
        <i class="fa-brands fa-twitter"></i>,
        <i class="fa-brands fa-instagram"></i>,
      ],
    },
    {
      list: "80",
      cover: "./agent.png",
      address: "Denever, USA",
      name: "Anna K. Young",
      icon: [
        <i class="fa-brands fa-facebook-f"></i>,
        <i class="fa-brands fa-linkedin"></i>,
        <i class="fa-brands fa-twitter"></i>,
        <i class="fa-brands fa-instagram"></i>,
      ],
    },
  ];
  return (
    <>
      <section className="team background">
        <div className="container">
          <div className="content mtop grid3">
            {team_member.map((val, index) => (
              <div className="box" key={index}>
                <button className="btn3">{val.list} Listings</button>
                <div className="details">
                  <div className="img w-48 h-48 rounded-full overflow-hidden">
                    <img
                      src={Image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <i className="fa-solid fa-circle-check"></i>
                  </div>

                  <div className="flex-auto ">
                    <i className="fa fa-location-dot "></i>
                    {val.address}
                  </div>
                  <h4>{val.name}</h4>

                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <div className="button flex space-x-4 ">
                    <button className="text-2xl ">
                      <i className="fa fa-envelope"> </i>
                      <span>Message</span>
                    </button>
                    <button className="btn4 ">
                      <i className="fa fa-phone-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
