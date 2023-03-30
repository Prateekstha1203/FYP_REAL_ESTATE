import React from "react";
import Logo from '../fortune.jpg'
import "./css";
import { NavLink } from "react-router-dom";
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
    <>
      <section className="footerContact bg-slate-900 py-10  flex color-white justify-between items-center">
        <div className="container mx-auto flex  justify-between items-center">
          <div className="text">
            <h1 className=" text-2xl sm:text-3xl md:text-4xl text-white font-medium">
              Do You Have Questions ?
            </h1>
            <p className="text-base text-white font-medium pt-3">
              We'll help you to grow your career and growth.
            </p>
          </div>
          <button className=" bg-violet-700  hover:bg-violet-800 ps-5 py-4 rounded-lg transition text-2xl">Contact Us Today</button>
        </div>
      </section>

      <footer className="footer bg-violet-900 text-white py-12 ">
        <div className="container">
          <div className="box">
            <div className="logo ">
              <div className="w-55 h-25 pb-3">
                  <img src={Logo} className="w-80 h-35 " alt="" />
              </div>
              <h2 className="font-semibold text-2xl">Do You Need Help With Anything?</h2>
              <p className="my-3 font-meduim text-[14px]">
                Receive updates, hot deals, tutorials, discounts sent straignt
                in your inbox every month
              </p>

              <div className="input flex w-[500px]">
                <input type="text" placeholder="Email Address" />
                <button className="bg-violet-700  hover:bg-violet-800 ps-3 py-3 rounded-lg">Subscribe</button>
              </div>
            </div>
          </div>

          {map((val, index) => (
            <div className="box">
              <h3 className="font-semibold text-1.5xl" key={index}>{val.title}</h3>
              <ul>
                {val.text.map((items, index) => (
                  <li key={index}><NavLink to='{ items.list}'  className="my-3 text-gray-400 hover:text-white text-1.25xl font-medium"> {items.list}  </NavLink></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span className="bg-slate-900 text-white py-6 text-[18px]  font-medium flex color-white justify-center items-center">© 2021 Real Estate. Designd By Prateek Shrestha.</span>
      </div>
    </>
  );
};

export default Footer;
