import React from "react";
import Button from "react-bootstrap/esm/Button";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import "./subtotal.css";

function Subtotal(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="subtotal-sticky">
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):{" "}
                <strong>{value}</strong>
              </p>
            </>
          )}
          decimalScale={2}
          fixedDecimalScale={true}
          value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
        />
        <Button
          type="button"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
          className="checkout-button"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Subtotal;
