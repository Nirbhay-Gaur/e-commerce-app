import React, { useState } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentMethod(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="d-flex justify-content-center mt-5">
        <Form onSubmit={submitHandler}>
          <Form.Group as="row">
            <Form.Check
              type="radio"
              id="paypal"
              label="PayPal"
              value="PayPal"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
          <Form.Group as="row">
            <Form.Check
              type="radio"
              id="stripe"
              label="Stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
          <Form.Group as="row">
            <Form.Check
              type="radio"
              id="cod"
              label="Cash on Delivery"
              value="COD"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMethod;
