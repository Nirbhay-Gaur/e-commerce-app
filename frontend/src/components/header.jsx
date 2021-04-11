import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Link to="/">
        <Navbar.Brand>MyApp</Navbar.Brand>
      </Link>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button>
          <span>
            <SearchIcon />
          </span>
        </Button>
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#account">Account</Nav.Link>
          <Nav.Link href="#orders">Orders</Nav.Link>
          <Nav.Link>
            <Link to="/cart">
              <span>
                <ShoppingCartOutlinedIcon />
                {cartItems.length > 0 && (
                  <Badge variant="info">{cartItems.length}</Badge>
                )}
              </span>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
