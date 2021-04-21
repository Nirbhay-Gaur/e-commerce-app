import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";

function CarouselHome() {
  return (
    <Carousel>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block carousel-img"
          src="https://www.acurax.com/wp-content/themes/acuraxsite/images/inner_page_bnr.jpg?x67877"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First carousel</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-img"
          src="https://www.acurax.com/wp-content/themes/acuraxsite/images/inner_page_bnr.jpg?x67877"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second carousel</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-img"
          src="https://www.acurax.com/wp-content/themes/acuraxsite/images/inner_page_bnr.jpg?x67877"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third carousel</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;
