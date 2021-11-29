import React, { useEffect, useState } from "react";
import mainStyles from "./Main.module.css";
import Nav from "../Nav/NavContainer/Nav";
import Cards from "../Cards/Cards";
import Paginacion from "../Paginacion/Paginacion";
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";
import { getDogs } from "../Actions/actions";

function Main({ render, precargarDogs, refresh, filtrado, NotFoundState }) {
  /* eslint-disable */
  const [refreshRender, setRefreshRender] = useState(refresh);
  useEffect(() => {
    precargarDogs();
  }, []);
  /* eslint-enable */
  /*----------------------- PAGINACION ----------------------- */
  const [page, setPage] = useState({ comienzo: 0, final: 8, pageActual: 1 });

  function configPaginacion(value) {
    if (value === "retroceder" && page.comienzo > 0)
      setPage({
        comienzo: page.comienzo - 8,
        final: page.final - 8,
        pageActual: page.pageActual - 1,
      });
    if (value === "avanzar" && page.pageActual !== render.length / 8) {
      if (
        filtrado.length > 0 &&
        page.pageActual === Math.ceil(filtrado.length / 8)
      ) {
        return;
      }
      setPage({
        comienzo: page.comienzo + 8,
        final: page.final + 8,
        pageActual: page.pageActual + 1,
      });
    }
    if (value === "reiniciar") {
      setPage({ comienzo: 0, final: 8, pageActual: 1 });
    }
  }
  let cardsRender =
    filtrado.length > 0
      ? filtrado.slice(page.comienzo, page.final)
      : render.slice(page.comienzo, page.final);

  /*----------------------- PAGINACION ----------------------- */
  /*----------------------- TOGGLE RENDER ----------------------- */

  let toggleRender =
    cardsRender.length > 0 ? (
      <>
        <Cards render={cardsRender} />
        <Paginacion actualizacion={configPaginacion} page={page} />
      </>
    ) : (
      <Loading />
    );
  /*----------------------- TOGGLE RENDER ----------------------- */

  return (
    <div className={mainStyles.container}>
      <Nav actualizacion={configPaginacion} />
      {NotFoundState === true ? <NotFound /> : toggleRender}
    </div>
  );
}

const mapStateToProps = (state) => ({
  render: state.render,
  refresh: state.refresh,
  filtrado: state.filtrado,
  NotFoundState: state.notFound,
});

const mapDispatchToProps = (dispatch) => ({
  precargarDogs: () => dispatch(getDogs()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
