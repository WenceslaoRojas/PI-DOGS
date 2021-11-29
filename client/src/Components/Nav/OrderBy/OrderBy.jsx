import React from "react";
import orderStyle from "./OrderBy.module.css";
import { connect } from "react-redux";
import { orderBY } from "../../Actions/actions";

function OrderBy({ ordenarPor }) {
  return (
    <div className={orderStyle.divOrder}>
      <label htmlFor='order' className={orderStyle.label}>
        Ordenar por...
      </label>
      <select
        onChange={(e) => ordenarPor(e.target.value)}
        name='order'
        id='order'
      >
        <option value='alfabeticamente'>Alfabeticamente</option>
        <option value='peso'>Peso</option>
      </select>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  ordenarPor: (value) => dispatch(orderBY(value)),
});
export default connect(null, mapDispatchToProps)(OrderBy);
