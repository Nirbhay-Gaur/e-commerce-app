import React from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./screens/home";
import SignUp from "./screens/signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/login";
import CheckOut from "./screens/cart";
import ProductInfo from "./screens/productinfo";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/cart/:id?" component={CheckOut}></Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/product/:id" component={ProductInfo}></Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
