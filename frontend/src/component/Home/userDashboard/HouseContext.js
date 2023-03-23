import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../../../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location(any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price Range(any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    const uniqueCountries = ["Location (any)", ... new Set(allCountries)];
    setCountries(uniqueCountries);
  },[]);


  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    const uniqueProperties = ["Properties type (any)", ... new Set(allProperties)];
    setProperties(uniqueProperties);
  },[]);

  const handleClick= ()=>{
    console.log('clicked');
  }
  return (
    <HouseContext.Provider
      value={{
        country,
        countries,
        setCountry,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
