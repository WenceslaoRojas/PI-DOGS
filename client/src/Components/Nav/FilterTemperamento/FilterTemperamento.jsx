import React from "react";
import { connect } from "react-redux";
import { FiltrarPorTemperamento } from "../../Actions/actions";

function FilterTemperamento({
  filtrarTemperamento,
  temperamentosSelect,
  reiniciarPag,
}) {
  return (
    <select
      name='temperamento'
      id='temperamento'
      onChange={(e) => {
        filtrarTemperamento(e.target.value);
        reiniciarPag("reiniciar");
      }}
    >
      <option value='temperamento'>Temperamento</option>
      {temperamentosSelect.map((e) => (
        <option value={e.toLowerCase()} key={temperamentosSelect.indexOf(e)}>
          {e}
        </option>
      ))}
    </select>
  );
}

const mapStateToProps = (state) => ({
  temperamentosSelect: state.temperamentosRender,
});

const mapDispatchToProps = (dispatch) => ({
  filtrarTemperamento: (value) => dispatch(FiltrarPorTemperamento(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterTemperamento);
