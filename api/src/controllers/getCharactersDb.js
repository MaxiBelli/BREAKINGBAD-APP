const { Character, Occupation } = require("../db");

const getDbInfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
module.exports = getDbInfo;



