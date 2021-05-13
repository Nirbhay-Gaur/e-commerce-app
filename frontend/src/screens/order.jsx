import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
import "./placeOrder.css";
import LoadingBox from "../components/loadingbox";
import Alert from "react-bootstrap/Alert";
import { detailsOrder } from "../actions/orderActions";

function Order(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <Alert variant="danger" className="mx-5 my-3">
      {error}
    </Alert>
  ) : (
    <div>
      <div className="my-4">
        <Container>
          <h3>Order {order._id}</h3>
          <Row>
            <Col sm={8}>
              <div>
                <Card>
                  <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                      <br />
                      <strong>Address:</strong> {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.zipCode},{" "}
                      {order.shippingAddress.country}
                    </Card.Text>
                    {order.isDelivered ? (
                      <Alert variant="success">
                        Successfully Delivered at {order.deliveredAt}
                      </Alert>
                    ) : (
                      <Alert variant="danger">Not Delivered </Alert>
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method:</strong> {order.paymentMethod}
                    </Card.Text>
                    {order.isPaid ? (
                      <Alert variant="success">
                        Successfully Paid at {order.paidAt}
                      </Alert>
                    ) : (
                      <Alert variant="danger">Not Paid</Alert>
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Order Details</Card.Title>
                    <Card.Text>
                      {order.orderItems.map((item, i) => (
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
                  <span>₹{order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="order-info">
                  <span>Shipping</span>
                  <span>₹{order.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="order-info">
                  <span>GST</span>
                  <span>₹{order.taxPrice.toFixed(2)}</span>
                </div>
                <hr style={{ margin: "0" }} />
                <strong>
                  <div className="order-info mt-1">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </strong>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Order;
