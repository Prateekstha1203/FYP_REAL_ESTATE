// import React from "react";
// import { useContext } from "react";
// import { RiSearch2Line } from "react-icons/ri";

// import CountryDropDown from "./CountryDropdown";
// import PropertyDropDown from "./PropertyDropdown";
// import PriceRangeDropDown from "./PriceRangeDropdown";
// import { HouseContext } from "./HouseContext";
// const Searchbar = () => {
//     const  {houses} = useContext(HouseContext);
//      console.log(houses)
//      const {handleClick} = useContext(HouseContext);
//   return (
//     <div className="container py-4 mx-w-1170 mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-x-3  relative md:-top-4 md:shadow-2xl bg-white md:bg-transparent md:backdrop:blur rounded-lg">
//       <CountryDropDown />
//       <PropertyDropDown />
//       <PriceRangeDropDown />
//       <button className="hover:bg-violet-900 transition md:max-w-[152px] w-100 h-16 rounded-lg flex items-center justify-center" onClick={()=>handleClick()}>
//         <RiSearch2Line />
//       </button>
//     </div>
//   );
// };

// export default Searchbar;
