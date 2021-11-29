export function getDogs(name) {
  let data = {};
  return function (dispatch) {
    return fetch(`http://localhost:3001/dogs?name=${name}`)
      .then((response) => response.json())
      .then((jsonDog) => {
        if (jsonDog.length > 0) {
          data = {
            dogs: jsonDog,
          };
        } else {
          dispatch({ type: "NOT_FOUND" });
        }
      })
      .then(() => {
        fetch(`http://localhost:3001/temperament`)
          .then((response) => response.json())
          .then((jsonTemps) => {
            data = {
              ...data,
              temperamentos: jsonTemps,
            };
            dispatch({ type: "PRECARGA", payload: data });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        dispatch({ type: "NOT_FOUND" });
      });
  };
}
export function getDetailDog(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/dog/${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "DETAIL_DOG", payload: json });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
export function agregarPerro(data) {
  fetch("http://localhost:3001/dog", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => console.error(err));
}

export function orderBY(value) {
  return { type: "ORDER_BY", payload: value };
}

export function FiltrarPorTemperamento(value) {
  return { type: "FILTRAR_POR_TEMPERAMENTO", payload: value };
}
export function FiltrarPorRaza(value) {
  return { type: "FILTRAR_RAZA_O_CREADA", payload: value };
}

export function resetDog() {
  return { type: "DETAIL_DOG", payload: {} };
}
