import React from "react";
import loadingStyle from "./Loading.module.css";
function Loading() {
  return (
    <div className={loadingStyle.container}>
      <div className={loadingStyle.center}>
        <h1>Espera, aún no lo he encontrado...</h1>
        <img
          src='https://i.giphy.com/media/MGbi9O1ByAzv32qr00/200.webp'
          alt=''
        />
      </div>
    </div>
  );
}

export default Loading;
