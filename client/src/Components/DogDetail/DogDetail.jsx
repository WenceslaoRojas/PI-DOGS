import React, { useEffect } from "react";
import dogStyle from "./DogDetail.module.css";
import { connect } from "react-redux";
import NavSecundario from "../Nav/NavSecundario/NavSecundario";
import { useParams } from "react-router";
import { getDetailDog } from "../Actions/actions";
import Loading from "../Loading/Loading";

function DogDetail({ dog, llamarDetalles }) {
  const { name } = useParams();
  /* eslint-disable */

  useEffect(() => {
    llamarDetalles(name);
  }, []);
  /* eslint-enable */
  return (
    <div>
      <NavSecundario />
      {Object.entries(dog).length === 0 ? (
        <Loading />
      ) : (
        <div className={dogStyle.container}>
          <div className={dogStyle.divImg}>
            <img src={dog.imagen} alt='' />
          </div>
          <div className={dogStyle.description}>
            <h2>{dog.nombre}</h2>
            <label>Peso: {dog.peso}kg</label>
            <label>Altura: {dog.altura} Cm</label>
            <label>Años de vida: {dog.vida} </label>
            <label>Temperamento: {dog.temperamento}</label>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog,
  };
};
const mapDispatchToProps = (dispatch) => ({
  llamarDetalles: (name) => dispatch(getDetailDog(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DogDetail);
