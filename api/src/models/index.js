const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  const Raza = sequelize.define("raza", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longevidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  const Temperamentos = sequelize.define("temperamentos", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // const TemperamentoPrueba = sequelize.define("temperamento", {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  // });
};
