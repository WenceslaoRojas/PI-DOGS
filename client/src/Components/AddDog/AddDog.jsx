import React, { useState } from "react";
import addStyle from "./AddDog.module.css";
import NavSecundario from "../Nav/NavSecundario/NavSecundario";
import BtnTemperamentos from "./BtnTemperamentos/BtnTemperamento";
import { agregarPerro } from "../Actions/actions";
import { connect } from "react-redux";

function AddDog({ temperamentosSelect }) {
  const [input, setInput] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    height: "",
    life: "",
    temperament: [],
  });
  /* -------------------- CONTROLAR LOS ESTADOS DE LOS INPUTS ----------------------- */
  const handleOnChange = function (data) {
    if (data.target.name === "temperamento" && data.target.value !== "inicio") {
      return setInput({
        ...input,
        temperament: [...input.temperament, data.target.value],
      });
    } else if (data.target.name === "BtnDelete") {
      return setInput({
        ...input,
        temperament: input.temperament.filter((e) => e !== data.target.value),
      });
    }
    setInput({
      ...input,
      [data.target.name]: data.target.value,
    });
  };
  /* -------------------- CONTROLAR LOS ESTADOS DE LOS INPUTS ----------------------- */

  /* ------------------- VENTANA MODAL ---------------------- */
  const [show, setShow] = useState(false);

  const handleModalClose = (e) => {
    setShow(false);
  };

  const handleModalOpen = () => {
    setShow(true);
  };
  /* ------------------- VENTANA MODAL ---------------------- */
  /* ------------------- MANEJADOR DE SUBMIT, VENTANA MODAL, RESET ---------------------- */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    agregarPerro(input);
    handleModalOpen();
    e.target.reset();
    setInput({ ...input, temperament: [] });
  };
  /* ------------------- MANEJADOR DE SUBMIT, VENTANA MODAL, RESET ---------------------- */

  return (
    <div className={addStyle.divContainer}>
      <NavSecundario />
      <div hidden={!show}>
        <div className={addStyle.modalBackground} onClick={handleModalClose}>
          <div className={addStyle.modalCard}>
            <h2 htmlFor=''>¡Perrito creado!</h2>
            <img
              src='https://i.giphy.com/media/jmTNcqNNRB6pIgCuF2/giphy.webp'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className={addStyle.centerInfo}>
        <div className={addStyle.imgContainer}>
          <div className={addStyle.huellaContainer}>
            <h1>NUEVA MASCOTA</h1>
            <i className={addStyle.huellaDog}></i>
          </div>
          <img src='/img/dogAdd.png' alt='' />
        </div>
        <div className={addStyle.formContainer}>
          <h1>¡Vamos a agregar a tu perrito!</h1>
          <form
            onSubmit={(e) => {
              handleOnSubmit(e);
            }}
          >
            <section className={addStyle.section}>
              <article>
                <label htmlFor='raza'>Nombre de la Raza</label>
                <input
                  type='text'
                  id='raza'
                  placeholder='Ingresa su raza...'
                  name='name'
                  autoComplete='none'
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </article>
              <article>
                <label htmlFor='vida'>Esperanza de vida</label>
                <input
                  type='number'
                  id='vida'
                  name='life'
                  placeholder='Ingresa su esperanza de vida'
                  onChange={(e) => handleOnChange(e)}
                />
              </article>
            </section>
            <section className={addStyle.section}>
              <article>
                <label className={addStyle.labelPeso} htmlFor='peso'>
                  Min Peso Max
                </label>
                <div className={addStyle.divPeso}>
                  <input
                    type='number'
                    id='peso'
                    name='weightMin'
                    placeholder='Min'
                    onChange={(e) => handleOnChange(e)}
                  />
                  <input
                    type='number'
                    id='peso'
                    name='weightMax'
                    placeholder='Max'
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </article>
              <article>
                <label htmlFor='altura'>Altura</label>
                <input
                  type='number'
                  name='height'
                  id='altura'
                  placeholder='Ingresa su altura promedio'
                  onChange={(e) => handleOnChange(e)}
                />
              </article>
            </section>
            <section className={addStyle.sectionTemperamentos}>
              <label htmlFor='altura'>Temperamento</label>
              <select
                className={addStyle.selectTemperamento}
                name='temperamento'
                id='temperamento'
                onChange={(e) => handleOnChange(e)}
              >
                <option value='inicio'>Temperamento</option>
                {temperamentosSelect.map((e) => (
                  <option
                    value={e.toLowerCase()}
                    key={e.length + Math.random()}
                  >
                    {e}
                  </option>
                ))}
              </select>
              <div className={addStyle.inputTemperamentos}>
                {input.temperament.map((e) => {
                  return (
                    <BtnTemperamentos
                      key={e.length + Math.random()}
                      temperamento={e}
                      eliminar={handleOnChange}
                    />
                  );
                })}
              </div>
            </section>
            <button
              className={addStyle.btnAdd}
              type='submit'
              disabled={
                input.name === "" ||
                input.weightMin === "" ||
                input.weightMax === "" ||
                input.height === "" ||
                input.life === "" ||
                input.temperament.length === 0
              }
            >
              AGREGAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  temperamentosSelect: state.temperamentosRender,
});

export default connect(mapStateToProps, null)(AddDog);
