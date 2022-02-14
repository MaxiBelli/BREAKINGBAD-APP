const getApiInfo = require('./getCharactersApi')
const getDbInfo = require('./getCharactersDb')

const getAllCharacters = async () => {
    let apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
  };
module.exports = getAllCharacters;