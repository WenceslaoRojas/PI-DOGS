import React from "react";
import paginacionStyle from "./Paginacion.module.css";
import { connect } from "react-redux";

function Paginacion({ page, render, filtrado, actualizacion }) {
  let pagTotales =
    filtrado.length > 0 ? filtrado.length / 8 : render.length / 8;
  pagTotales = pagTotales !== 0 ? pagTotales : 1;
  return (
    <div className={paginacionStyle.container}>
      <button
        className={paginacionStyle.btnLeft}
        onClick={(e) => {
          actualizacion("retroceder");
        }}
      ></button>
      <label>
        {page.pageActual} de {Math.ceil(pagTotales)}
      </label>
      <button
        className={paginacionStyle.btnRight}
        onClick={(e) => {
          actualizacion("avanzar");
        }}
      ></button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  render: state.render,
  filtrado: state.filtrado,
});
export default connect(mapStateToProps, null)(Paginacion);
