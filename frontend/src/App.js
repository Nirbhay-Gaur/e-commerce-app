import React from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./screens/home";
import SignUp from "./screens/signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/login";
import ProductInfo from "./screens/productinfo";
import Cart from "./screens/cart";
import Shipping from "./screens/shipping";
import PaymentMethod from "./screens/payment";
import PlaceOrder from "./screens/placeOrder";
import Order from "./screens/order";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/order/:id" component={Order}></Route>
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/payment" component={PaymentMethod} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/signin" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/product/:id" component={ProductInfo} />
          <Route path="/" component={Home} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
