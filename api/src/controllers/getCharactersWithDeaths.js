const getCharactersWithQuotes = require("./getCharactersWithQuote");
const getDeathsApi = require("./getDeathsApi");

const getCharactersWithDeaths = async () => {
  let apiCharacters = await getCharactersWithQuotes();
  const apiDeaths = await getDeathsApi();
  const array = apiCharacters.concat(apiDeaths);

  const otro = {};

  array.forEach(
    ({ name, id, nickname, img, status, occupations, birthday, quotes, ...rest }) => {
      otro[name] = otro[name] || {
        name,
        id,
        nickname,
        img,
        status,
        occupations,
        birthday,
        quotes,
        cause: [],
        responsible: [],
        last_words: [],
      };
      otro[name].cause.push(rest.cause);
      otro[name].responsible.push(rest.responsible);
      otro[name].last_words.push(rest.last_words);
    }
  );

  const finalData = Object.values(otro);

  return finalData;
};

module.exports = getCharactersWithDeaths;
