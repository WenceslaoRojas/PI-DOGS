import React from "react";
import Card from "../Card/Card";
import cardsContainer from "./Cards.module.css";

function Cards(cardsRender) {
  return (
    <div className={cardsContainer.container}>
      {cardsRender.render.map((e) => (
        <Card
          key={e.id}
          id={e.id}
          name={e.name}
          imagen={e.image.url}
          temperamento={e.temperament}
          peso={e.weight.metric}
        />
      ))}
    </div>
  );
}
export default Cards;
