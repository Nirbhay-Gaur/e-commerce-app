import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <hr />
      <p>App ⓒ {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
