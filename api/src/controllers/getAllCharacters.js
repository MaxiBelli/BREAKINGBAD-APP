const getFullCharactersApi = require("./getFullCharactersApi");
const getCharactersDb = require("./getCharactersDb");

const getAllCharacters = async () => {
  const apiInfo = await getFullCharactersApi();
  const dbInfo = await getCharactersDb();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};
module.exports = getAllCharacters;
