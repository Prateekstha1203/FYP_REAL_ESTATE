import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import image from "../../../assets/img/apartments/a1.png";
import './card.css'
function CardComponent() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="ms-2">Golden Urban House </Card.Title>
        <Card.Text>
          <h6 class="card-subtitle mb-2 text-body-secondary mt-2 ms-2">
            $12,345
          </h6>
          <p class="location ms-2 ">
            <i class="fa-solid fa-location-dot me-2"></i>Location, City, Country
          </p>
          <div className="row">
            <div className="col-4 d-flex justify-content-center">
              <p className="location ">
                <i class="fa-solid fa-l"></i> 1000 Sq.ft
              </p>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <p className="location ">
                <i class="fa-sharp fa-solid fa-bed"></i> 3 Bed
              </p>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <p className="location ">
                <i class="fa-solid fa-bath"></i> 2 Bath
              </p>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
