const getCharactersApi = require("./getCharactersApi");
const getQuotesApi = require(".//getQuotesApí");

const getCharactersWithQuotes = async () => {
  let apiCharacters = await getCharactersApi();
  const apiQuotes = await getQuotesApi();
  const array = apiCharacters.concat(apiQuotes);

  const otro = {};

  array.forEach(
    ({ name, id, nickname, img, status, occupations, birthday, ...rest }) => {
      otro[name] = otro[name] || {
        name,
        id,
        nickname,
        img,
        status,
        occupations,
        birthday,
        quotes: [],
      };
      otro[name].quotes.push(rest.quotes);
    }
  );

  const finalData = Object.values(otro);

  return finalData;
};

module.exports = getCharactersWithQuotes;
