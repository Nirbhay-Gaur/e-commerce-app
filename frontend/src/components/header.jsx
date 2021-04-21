import React from "react";
import "./header.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Navbar className="header" variant="dark" expand="lg" sticky="top">
      <Link to="/">
        <Navbar.Brand>MyApp 🚀</Navbar.Brand>
      </Link>
      {/* <div className="header-content">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button>
            <span>
              <SearchIcon />
            </span>
          </Button>
        </Form>
      </div> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <Nav.Link>Account</Nav.Link>
          <Nav.Link>Orders</Nav.Link> */}
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="#signout" onClick={signoutHandler}>
                  Sign Out
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link>
              <Link to="/signin" id="signin-link">
                Sign in
              </Link>
            </Nav.Link>
          )}
          <Nav.Link>
            <Link to="/cart">
              <span className="cart-link">
                <div className="cart-icon">
                  <ShoppingCartOutlinedIcon />
                </div>
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
