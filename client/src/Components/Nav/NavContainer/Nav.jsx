import React from "react";
import navStyle from "./Nav.module.css";
import OrderBy from "../OrderBy/OrderBy";
import FilterTemperamento from "../FilterTemperamento/FilterTemperamento";
import { getDogs, FiltrarPorRaza } from "../../Actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Nav({ searchDogs, filtrarPeso, actualizacion }) {
  return (
    <nav className={navStyle.nav}>
      <div className={navStyle.createDog}>
        <img src='/img/navDog.png' alt='' />
        <h3>WikiDogs</h3>
        <Link to='/addDog'>
          <button>Agregar nuevo perro</button>
        </Link>
      </div>
      <div className={navStyle.divFilterAndSearch}>
        <OrderBy />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type='text'
            placeholder='Busca por raza 🐶'
            onChange={(e) => {
              searchDogs(e.target.value);
            }}
          />
          <button type='submit' />
        </form>
        <div className={navStyle.divFilter}>
          <label htmlFor='filter'>Filtrar por...</label>
          <FilterTemperamento reiniciarPag={actualizacion} />
          <select
            name='peso'
            id='order'
            onChange={(e) => {
              filtrarPeso(e.target.value);
              actualizacion("reiniciar");
            }}
          >
            <option value='Todos'>Todos</option>
            <option value='Razas'>Razas Existentes</option>
            <option value='Creadas'>Razas Creadas</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => ({
  searchDogs: (name) => dispatch(getDogs(name)),
  filtrarPeso: (value) => dispatch(FiltrarPorRaza(value)),
});
export default connect(null, mapDispatchToProps)(Nav);
