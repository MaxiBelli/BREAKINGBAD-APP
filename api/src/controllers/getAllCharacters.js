const getCharactersWithQuotes = require('./getCharactersWithQuote')
const getCharactersDb = require('./getCharactersDb')
const getCharactersWithDeaths = require('./getCharactersWithDeaths')

const getAllCharacters = async () => {
    let apiInfo = await getCharactersWithDeaths();
    // const dbInfo = await getCharactersDb();
    // const totalInfo = apiInfo.concat(dbInfo);
    // return totalInfo;
    return apiInfo;
  };
module.exports = getAllCharacters;