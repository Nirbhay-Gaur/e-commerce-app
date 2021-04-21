import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/loadingbox";
import Alert from "react-bootstrap/esm/Alert";
import "./login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center">
        <Col sm={4}>
          <Form onSubmit={submitHandler}>
            <div className="login-heading text-center">
              <h1>Log in</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && (
              <Alert variant="danger" className="mx-5 my-3">
                {error}
              </Alert>
            )}
            <div className="login-input">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="login-btn text-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
            <div className="text-center mt-2">
              New Customer?{" "}
              <Link to={`/register?redirect=${redirect}`}>
                Create your account
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
