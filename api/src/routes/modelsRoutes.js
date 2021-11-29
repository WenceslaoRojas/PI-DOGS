module.exports = {
  searchName: function (response, name) {
    var filtered = response.data.filter((e) => e.temperament !== undefined);
    var data = filtered.filter((e) =>
      e.name
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(name.toLocaleLowerCase())
    );

    return data;
  },
  filterTemperamento: function (response, temperamento) {
    var filtrados = response.data.filter((e) =>
      e.temperament
        .replace(/, /g, "")
        .toLocaleLowerCase()
        .includes(temperamento.toLocaleLowerCase())
    );

    return filtrados;
  },
  findDetails: function (data, img) {
    let dog = {
      temperamento: data.temperament,
      nombre: data.name,
      imagen: img,
      peso: data.weight.imperial,
      altura: data.height.imperial,
      vida: data.life_span,
    };
    console.log("_____________", dog, "======================");

    return dog;
  },
};
