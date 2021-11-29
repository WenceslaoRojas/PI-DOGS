import React from "react";
import landigStyle from "./LandingPage.module.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className={landigStyle.container}>
      <h1>WikiDog's</h1>
      <Link to='/dogs' className={landigStyle.Link}>
        <button>¡Guau Guau!</button>
      </Link>
      <div className={landigStyle.backgroundLeft}></div>
      <div className={landigStyle.backgroundRight}></div>
      <img src="./" alt="" />
    </div>
  );
}

export default LandingPage;
