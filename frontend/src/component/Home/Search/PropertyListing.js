import React from "react";
import { useSelector } from "react-redux";

const PropertyList = () => {
  const { properties } = useSelector((state) => state.property);

  return (
    <div>
      {properties.map((property) => (
        <div key={property._id}>
          <h2>{property.propertyTitle}</h2>
          <p>{property.description}</p>
          {/* Display other property information */}
        </div>
      ))}
    </div>
  );
};








