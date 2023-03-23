import React, { useContext, useEffect, useState } from "react";
import {
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiWallet3Line,
} from "react-icons/ri";

import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";

const PriceRangeDropdown = () => {
  const { price, setPrice } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  const prices = [
    {
      value: "Price Range (any)",
    },
    {
      value: "0.5cr - 1cr",
    },
    {
      value: "1cr - 1.5cr",
    },
    {
      value: "1.5cr - 2cr",
    },
    {
      value: "2cr - 2.5cr",
    },
  ];
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiWallet3Line className="dropdown-icon-primary" />

        <div>
          <div className="text=[15px] font-medium leading-tight">{price}</div>
          <div className="text-[13px]">Choose price range</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="drop-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="drop-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="px-6 py-8 text-base md:text-lg space-y-6 shadow-md bg-white absolute w-full z-10 list-none rounded-b-lg text-gray-800">
        {prices.map((price, index) => {
          return (
            <Menu.Item
              className="cursor-pointer hover:text-violet-700 text-slate-700 transition"
              as="li"
              key={index}
              onClick={() => {
                setPrice(price.value);
              }}
            >
              {price.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
