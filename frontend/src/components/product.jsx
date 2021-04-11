import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div className="mx-3 my-3">
      <Card style={{ width: "18rem" }}>
        <Link to={`/product/${props.id}`}>
          <Card.Img variant="top" src={props.img} />
        </Link>
        <Card.Body>
          <Link to={`/product/${props.id}`}>
            <Card.Title>{props.title}</Card.Title>
          </Link>
          <Card.Text>₹{props.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
