import React from "react";
import Image from "../../../assets/img/house-banner.png";
import Search from "../userDashboard/Search";
const Banner = () => {
  return (
    <section className="py-6 h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col  items-center lg:items-start  text center lg:text-left justify-center flex-1  lg:px-0">
          <h1 className="text-5xl font-bold lg:text-[58px] mb-6">
            <span className="text-violet-700 x"> Buy</span> Your Dream House
            With Us.
          </h1>
          <p className="max-w-[580px] mb-8">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </p>
        </div>
        <div className="hidden flex-1 lg:flex">
          <img src={Image} alt=""></img>
        </div>
      </div>
      <Search />
    </section>
  );
};
export default Banner;
