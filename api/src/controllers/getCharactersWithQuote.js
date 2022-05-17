const getCharactersApi = require("./getCharactersApi");
const getQuotesApi = require(".//getQuotesApí");

const getCharactersWithQuotes = async () => {
  let apiCharacters = await getCharactersApi();
  const apiQuotes = await getQuotesApi();
  const apiCharactersAndQuotes = apiCharacters.concat(apiQuotes);

  const aux = {};

  apiCharactersAndQuotes.forEach(
    ({ name, id, nickname, img, status, occupations, birthday, ...rest }) => {
      aux[name] = aux[name] || {
        name,
        id,
        nickname,
        img,
        status,
        occupations,
        birthday,
        quotes: [],
      };
      aux[name].quotes.push(rest.quotes);
    }
  );

  const finalData = Object.values(aux);

  return finalData;
};

module.exports = getCharactersWithQuotes;