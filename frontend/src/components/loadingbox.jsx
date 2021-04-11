import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./loadingbox.css";

function LoadingBox() {
  return (
    <div className="loading">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <span className="loading-text">Loading...</span>
    </div>
  );
}

export default LoadingBox;
