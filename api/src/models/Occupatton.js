const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("occupation", {
    // id:{ // no le paso ID xq no vamor a tener otro
    //   type: DataTypes.UUID,//
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,//
    //   primaryKey: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
