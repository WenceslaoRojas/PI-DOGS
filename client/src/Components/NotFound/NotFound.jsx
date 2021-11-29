import React from "react";
import notStyle from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={notStyle.container}>
      <h1>PERRITO NO ENCONTRADO :( </h1>
      <img src='/img/giphy.gif' alt='' />
    </div>
  );
}

export default NotFound;
