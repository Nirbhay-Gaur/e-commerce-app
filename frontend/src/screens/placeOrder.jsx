import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CheckoutSteps from "../components/checkoutSteps";
import Image from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
import "./placeOrder.css";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_REQUEST } from "../constants/orderConstants";
import LoadingBox from "../components/loadingbox";
import Alert from "react-bootstrap/Alert";

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod || !cart.shippingAddress.address) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 1000 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_REQUEST });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="my-4">
        <Container>
          <Row>
            <Col sm={8}>
              {error && (
                <Alert variant="danger" className="mx-5 my-3">
                  {error}
                </Alert>
              )}
              <div>
                <Card>
                  <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                      <br />
                      <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.zipCode},{" "}
                      {cart.shippingAddress.country}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method:</strong> {cart.paymentMethod}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Order Details</Card.Title>
                    <Card.Text>
                      {cart.cartItems.map((item, i) => (
                        <div key={i}>
                          <div className="checkoutProduct">
                            <Image
                              style={{
                                width: "200px",
                                height: "150px",
                                objectFit: "contain",
                              }}
                              className="checkoutProduct-img"
                              src={item.image}
                              thumbnail
                            />

                            <div className="checkoutProduct-info align-items-center d-flex">
                              <div className="checkoutProduct-title pr-5">
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </div>
                              <div className="checkoutProduct-price pl-5">
                                {item.qty} x ₹{item.price} = ₹
                                {item.qty * item.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col sm={4}>
              <div className="order-summary subtotal-sticky">
                <div>
                  <h5>Order Summary</h5>
                </div>
                <div className="order-info">
                  <span>Items</span>
                  <span>₹{cart.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="order-info">
                  <span>Shipping</span>
                  <span>₹{cart.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="order-info">
                  <span>GST</span>
                  <span>₹{cart.taxPrice.toFixed(2)}</span>
                </div>
                <strong>
                  <div className="order-info mt-1">
                    <span>Total</span>
                    <span>₹{cart.totalPrice.toFixed(2)}</span>
                  </div>
                </strong>
                <Button
                  type="button"
                  onClick={placeOrderHandler}
                  className="checkout-button"
                >
                  Proceed to Pay
                </Button>
                {loading && <LoadingBox></LoadingBox>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default PlaceOrder;
