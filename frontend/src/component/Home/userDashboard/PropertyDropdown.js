import React, { useContext, useEffect, useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine, RiHome5Line } from "react-icons/ri";

import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";

const PropertyDropdown = () => {
  const { property, setProperty, properties } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log(properties);
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiHome5Line className="dropdown-icon-primary" />

        <div>
          <div className="text=[15px] font-medium leading-tight">
            {property}
          </div>
          <div className="text-[13px]">Select Your Property</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="drop-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="drop-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="px-6 py-8 text-base md:text-lg space-y-6 shadow-md bg-white absolute w-full z-10 list-none rounded-b-lg text-gray-800">
        {properties.map((property, index) => {
          return (
            <Menu.Item
              className="cursor-pointer hover:text-violet-700 text-slate-700 transition"
              as="li"
              key={index}
              onClick={() => {
                setProperty(property);
              }}
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
