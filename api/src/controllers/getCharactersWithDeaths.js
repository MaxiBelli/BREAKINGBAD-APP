const getCharactersWithQuotes = require("./getCharactersWithQuote");
const getDeathsApi = require("./getDeathsApi");

const getCharactersWithDeaths = async () => {
  let apiCharacters = await getCharactersWithQuotes();
  const apiDeaths = await getDeathsApi();
  const apiCharactersAndQuotes = apiCharacters.concat(apiDeaths);

  const aux = {};

  apiCharactersAndQuotes.forEach(
    ({
      name,
      id,
      nickname,
      img,
      status,
      occupations,
      birthday,
      quotes,
      ...rest
    }) => {
      aux[name] = aux[name] || {
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
      aux[name].cause.push(rest.cause);
      aux[name].responsible.push(rest.responsible);
      aux[name].last_words.push(rest.last_words);
    }
  );

  const data = Object.values(aux);
  let finalData = data.filter((e) => e.status);

  return finalData;
};

module.exports = getCharactersWithDeaths;
