import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./product.css";

function Product(props) {
  return (
    <div className="col-auto mb-3">
      <Card className="card-styles">
        <Link to={`/product/${props.id}`}>
          <Card.Img className="image-top" variant="top" src={props.img} />
        </Link>
        <Card.Body>
          <Link to={`/product/${props.id}`}>
            <Card.Title>{props.name}</Card.Title>
          </Link>
          <Card.Text>₹{props.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
