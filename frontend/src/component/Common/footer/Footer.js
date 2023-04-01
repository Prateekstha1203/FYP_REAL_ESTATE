import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import Logo from "../fortune.png";
import { Link } from "react-router-dom";
import { Fragment } from "react";
export const footer = [
  {
    title: "LAYOUTS",
    text: [
      { list: "Home Page" },
      { list: "About Page" },
      { list: "Property Page" },
      { list: "Contact Page" },
    ],
  },
  {
    title: "ALL SECTIONS",
    text: [
      { list: "Headers" },
      { list: "Features" },
      { list: "Testimonials" },
      { list: "Footers" },
    ],
  },
  {
    title: "COMPANY",
    text: [
      { list: "About" },
      { list: "Blog" },
      { list: "Pricing" },
      { list: "Login" },
    ],
  },
];

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img src={Logo} alt="" />
              <div className="anyThing">Do You Need Help With Anything?</div>
              <Link class="non-resp" to="/contact">
               CONTACT US
              </Link>
            </div>
          </div>

          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>© 2023 Fortune Real Estate. Designd By Prateek Shrestha.</span>
      </div>
    </Fragment>
  );
};

export default Footer;
