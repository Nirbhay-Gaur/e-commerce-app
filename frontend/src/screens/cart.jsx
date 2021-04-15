import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Subtotal from "../components/subtotal";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import "./cart.css";

function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container className="my-5">
      <Row>
        <Col sm={8}>
          <div className="item-list">
            <h2>Your Shopping Cart</h2>
            <hr />
            {cartItems.length === 0 ? (
              <Alert variant="warning">
                Cart is empty. <Link to="/">Go Shopping!</Link>
              </Alert>
            ) : (
              <>
                {cartItems.map((item, i) => (
                  <div key={i}>
                    <div className="checkoutProduct">
                      <Image
                        className="checkoutProduct-img"
                        src={item.image}
                        thumbnail
                      />

                      <div className="checkoutProduct-info">
                        <div className="checkoutProduct-title">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="checkoutProduct-price">
                          M.R.P - ₹{item.price}
                        </div>
                        <div className="checkoutProduct-qty">
                          Quantity -{" "}
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Col>
        <Col sm={2}>
          <Subtotal history={props.history} />
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
