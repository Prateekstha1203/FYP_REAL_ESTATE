import React, { useContext, useEffect, useState } from "react";
import {
  RiArrowUpSLine,
  RiMap2Line,
  RiArrowDownSLine,
  RiMapPinLine,
} from "react-icons/ri";

import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";
const CountryDropdown = () => {
  const { country, setCountry, countries } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log(countries);
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        
        <div>
          <div className="text=[15px] font-medium leading-tight">{country}</div>
          <div className="text-[13px]">Select Your Place</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="drop-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="drop-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="px-6 py-8 text-base md:text-lg space-y-6 shadow-md bg-white absolute w-full z-10 list-none rounded-b-lg text-gray-800" >
        {countries.map((country, index) => {
          return (
            <Menu.Item
              className="cursor-pointer hover:text-violet-700 text-slate-700 transition"
              as="li"
              key={index}
              onClick={() => {
                setCountry(country);
              }}
            >
              {country}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
