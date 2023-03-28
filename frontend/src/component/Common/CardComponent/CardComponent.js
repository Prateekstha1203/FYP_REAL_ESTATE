import React from "react";
import Card from "react-bootstrap/Card";
import "./card.css";

const CardComponent = ({ property }) => {
 


  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
     
         <div>
            <Card>
              <Card.Img variant="top" src={property.images[0].url} />
              <Card.Body>
                <Card.Title>{property.propertyTitle}</Card.Title>
                <Card.Text>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {property.price}
                  </h6>
                  <p className="location">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {property.description}
                  </p>
                  <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                      <p className="location ">
                        <i className="fa-l fa-solid fa-home"></i>
                        {property.areaSqFt}
                      </p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                      <p className="location ">
                        <i className="fa-l fa-solid fa-bed"></i>{" "}
                        {property.bedrooms} Bed
                      </p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                      <p className="location ">
                        <i className="fa-l fa-solid fa-bath"></i>{" "}
                        {property.bathrooms} Bath
                      </p>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
    </div>
  );
};

export default CardComponent;
