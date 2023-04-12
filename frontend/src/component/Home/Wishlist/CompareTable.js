import React from "react";
import './Compare.css'
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

  // Calculate column width based on the number of selected properties
  const columnWidth = `col-${12 / (selectedProperties.length + 1)}`;

  return (
    <div className="table-responsive">
      <div className="compareheading ">Compare Properties</div>
      <table className="table table-striped">
        <thead>
        <tr className="first-row" style={{ backgroundColor: "#72448d" }}>
            <th>Property Attributes</th>
            {selectedProperties.map((selectedProperty, index) => (
              <th key={index} className={columnWidth}>
                Property {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {propertiesToCompare.map((property, index) => (
            <tr key={index}>
              <td>{property}</td>
              {selectedProperties.map((selectedProperty, index) => (
                <td key={index} className={columnWidth}>
                  {selectedProperty[property]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
