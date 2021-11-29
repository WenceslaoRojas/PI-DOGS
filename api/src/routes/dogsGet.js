const express = require("express");
const models = require("./modelsRoutes");
const routerDog = require("express").Router();
const axios = require("axios");
const { Raza, Temperamentos } = require("../db");

routerDog.use(express.json());

routerDog.get("/dogs", async (req, res) => {
  let data = [];
  /* ------------------ BUSQUEDA EN LA BASE DE DATOS ------------------- */
  const razas =
    req.query.name === "undefined"
      ? await Raza.findAll({ include: Temperamentos })
      : await Raza.findAll({
          where: { nombre: req.query.name },
          include: Temperamentos,
        });
  razas.forEach((e) => {
    data.push({
      name: e.dataValues.nombre,
      weight: { metric: e.dataValues.peso },
      height: { metric: e.dataValues.altura },
      id: e.dataValues.id,
      image: { url: "https://c.tenor.com/b1DVdUGztTIAAAAC/cartoon-dog.gif" },
      life_span: e.dataValues.longevidad,
      temperament: e.temperamentos.map((e) => e.dataValues.name).join(", "),
    });
  });
  /* ------------------ BUSQUEDA EN LA BASE DE DATOS ------------------- */

  /* ------------------ BUSQUEDA EN LA API ------------------- */
  axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((response) => {
      if (req.query.name !== "undefined") {
        data = [...data, ...models.searchName(response, req.query.name)];
        return;
      }
      data = [
        ...data,
        ...response.data.filter((e) => e.temperament !== undefined),
      ];
    })
    .then(() => {
      if (data.length < 0) throw new Error("no hay perros con ese nombre");
      data.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });
      res.send(data); //? SE ENVIA DATA DE AMBAS BUSQUEDAS
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
  /* ------------------ BUSQUEDA EN LA API ------------------- */
});

routerDog.get("/dog/:name", async (req, res) => {
  let data = {};
  /* ------------------ BUSQUEDA EN LA BASE DE DATOS ------------------- */

  const dog = await Raza.findOne({
    where: { nombre: req.params.name },
    include: Temperamentos,
  });
  if (dog) {
    data = {
      nombre: dog.dataValues.nombre,
      peso: dog.dataValues.peso,
      altura: dog.dataValues.altura,
      id: dog.dataValues.id,
      imagen: "https://c.tenor.com/b1DVdUGztTIAAAAC/cartoon-dog.gif",
      vida: dog.dataValues.longevidad,
      temperamento: dog.temperamentos.map((e) => e.dataValues.name).join(", "),
    };
    res.send(data);
    /* ------------------ BUSQUEDA EN LA BASE DE DATOS ------------------- */
    /* ------------------ BUSQUEDA EN LA API ------------------- */
  } else {
    data = await axios
      .get(`https://api.thedogapi.com/v1/breeds/search?q=${req.params.name}`)
      .then((responseDog) => {
        axios
          .get(
            `https://api.thedogapi.com/v1/images/${responseDog.data[0].reference_image_id}`
          )
          .then((responseImage) => {
            res.send(
              models.findDetails(responseDog.data[0], responseImage.data.url)
            );
            return;
          });
      })
      .catch((err) => {
        res.status(400).send({ msg: "no encontro el perro" });
        return;
      });
  }
  /* ------------------ BUSQUEDA EN LA API ------------------- */
});

routerDog.get("/temperament", async (req, res) => {
  /* ------------------ BUSQUEDA EN LA API ------------------- */

  const temps = await Temperamentos.findAll();
  let arrTemp = [];
  let tiempoDeEspera = "";
  if (temps.length === 0) {
    tiempoDeEspera = await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((response) => {
        response.data.map((e) => {
          if (e.temperament) {
            arrTemp.push(...e.temperament.split(/\s*,\s*/));
          }
        });
      });

    const temp = new Set(arrTemp);
    let result = [...temp];
    tiempoDeEspera = await Promise.all(
      result.map((e) => {
        Temperamentos.create({
          name: e.toLowerCase(),
        });
      })
    );
    return res.send(result);
  }
  arrTemp = temps.map((e) => e.name);
  res.send(arrTemp);
});

routerDog.post("/dog", async (req, res) => {
  /* ---------------- CREAMOS LA RAZA --------------------- */
  let data = req.body;
  const tempParaBindear = await Promise.all(
    data.temperament.map((e) =>
      Temperamentos.findOne({
        where: { name: e },
      })
    )
  );
  const dog = await Raza.create({
    nombre: data.name.trim(),
    peso: `${data.weightMin.trim()} - ${data.weightMax.trim()}`,
    altura: data.height.trim(),
    longevidad: data.life.trim(),
  });
  const unirTempRaza = await Promise.all(
    tempParaBindear.map((e) => dog.addTemperamentos(e))
  );
  /* ---------------- TERMINAMOS LA RAZA --------------------- */

  res.send();
});

module.exports = routerDog;
