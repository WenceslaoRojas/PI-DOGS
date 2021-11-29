import React from "react";
import navSecundarioStyle from "./NavSecundario.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetDog } from "../../Actions/actions";

function NavSecundario({ resetDog }) {
  return (
    <nav className={navSecundarioStyle.nav}>
      <Link to={"/dogs"}>
        <button className={navSecundarioStyle.btn} onClick={() => resetDog()}>
          Home
        </button>
      </Link>
      <h3>WikiDogs</h3>
      <i></i>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => ({
  resetDog: () => dispatch(resetDog()),
});

export default connect(null, mapDispatchToProps)(NavSecundario);
