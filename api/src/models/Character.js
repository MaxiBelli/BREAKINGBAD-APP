const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id:{ 
      type: DataTypes.UUID,//para q no se pisen los ids con los de la api
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,//es requerido, el campo no puede estar vacio
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Alive","Deceased","Presume dead", "Unknown"),//los estados q de pueden permitir
      allowNull: true,//xq no es obligatorio
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb:{ 
      type: DataTypes.BOOLEAN,//todos los q cree van a tener esta prop
      allowNull: false,
      defaultValue: true
    },  
  });
};
