import React, { useEffect } from "react";
import Carousel from "../components/carousel";
import Product from "../components/product";
import LoadingBox from "../components/loadingbox";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import "./home.css";
import Footer from "../components/footer";

function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="home">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Alert variant="danger" className="mx-5 my-3">
          {error}
        </Alert>
      ) : (
        <>
          <Carousel />
          <div className="container-custom mt-4">
            <div className="row justify-content-center">
              {products.map((product) => (
                <Product
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  img={product.image}
                />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
