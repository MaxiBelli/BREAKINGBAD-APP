const { Character, Occupation, Quote } = require("../db");

const getCharactersDb = async () => {
  return await Character.findAll({
    include: [
      {
        model: Occupation,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Quote,
        attributes: ["quote"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
module.exports = getCharactersDb;
