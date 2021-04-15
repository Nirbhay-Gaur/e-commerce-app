import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/loadingbox";
import "./productInfo.css";

function ProductInfo(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addtoCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Alert variant="danger" className="mx-5 my-3">
          {error}
        </Alert>
      ) : (
        <>
          <Link to="/">Back</Link>
          <div className="product-info my-5">
            <Container fluid>
              <Row>
                <Col sm={5}>
                  <div className="img-container">
                    <Image
                      fluid
                      className="product-info-img"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <Row>
                    <h1>{product.name}</h1>
                  </Row>
                  <Row className="product-info-description">
                    {product.description}
                  </Row>
                  <Row>
                    <strong>M.R.P - ₹{product.price}</strong>
                  </Row>
                </Col>
                <Col sm={3}>
                  <div className="product-info-sidebox">
                    <Row>Total Price - ₹{product.price}</Row>
                    <Row>
                      <div>
                        Status -
                        {product.countInStock > 0 ? (
                          <span> In Stock</span>
                        ) : (
                          <span> Unavailable</span>
                        )}
                      </div>
                    </Row>
                    {product.countInStock > 0 && (
                      <>
                        <Row>
                          <div>
                            Quantity -{" "}
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </Row>
                        <Row>
                          <Button
                            className="add-to-cart-button"
                            variant="primary"
                            onClick={addtoCartHandler}
                          >
                            Add to Cart
                          </Button>
                        </Row>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default ProductInfo;
