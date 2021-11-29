import React from "react";
import cardStyle from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ imagen, temperamento, peso, name }) {
  return (
    <div className={cardStyle.cardContainer}>
      <h2 className={cardStyle.cardTitle}>{name}</h2>
      <div className={cardStyle.card}>
        <img src={imagen} alt='imagen de perro' />
        <div className={cardStyle.cardDesc}>
          <div className={cardStyle.temperamento}>
            <label className={cardStyle.temperamentoLabel}>Temperamento:</label>
            <p className={cardStyle.p}>{temperamento}</p>
          </div>
          Peso: {peso} Kg
          <Link to={`/dogs/dogdetail/${name}`}>
            <button className={cardStyle.cta}>
              <span>Ver mas..</span>
              <svg width='15px' height='10px' viewBox='0 0 13 10'>
                <path d='M1,5 L11,5'></path>
                <polyline points='8 1 12 5 8 9'></polyline>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
