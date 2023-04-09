import React from "react";

const CompareTable = ({ selectedProperties }) => {
  // Define an array of all the properties you want to compare
  const propertiesToCompare = [
    "propertyTitle",
    "propertyType",
    "category",
    "description",
    "address",
    "bedrooms",
    "bathrooms",
    "price",
    "propertyFace",
    "buildYear",
    "areaSqFt",
    "parking",
    "isFurnished",
  ];

  if (!selectedProperties) {
    return null;
  }

  return (
    <div>
      <h2>Compare Properties</h2>
      <table>
        <tbody>
          {propertiesToCompare.map((property, index) => (
            <tr key={index}>
              <td>{property}</td>
              {selectedProperties.map((selectedProperty, index) => (
                <td key={index}>{selectedProperty[property]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
