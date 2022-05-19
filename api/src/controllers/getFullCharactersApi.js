const getCharactersApi = require("./getCharactersApi");
const getQuotesApi = require("./getQuotesApí");
const getDeathsApi = require("./getDeathsApi");
const getDeathsCausedApi = require("./getDeathsCausedApi");

const getFullCharactersApi = async () => {
  const apiCharacters = await getCharactersApi();
  const apiQuotes = await getQuotesApi();
  const apiDeaths = await getDeathsApi();
  const apiDeathsCaused = await getDeathsCausedApi();
  const apiFullCharacters = apiCharacters.concat(apiQuotes, apiDeaths, apiDeathsCaused);

  const newObj = {};

  apiFullCharacters.forEach(
    ({ name, id, nickname, img, status, occupations, birthday, ...rest }) => {
      newObj[name] = newObj[name] || {
        name,
        id,
        nickname,
        img,
        birthday,
        occupations,
        quotes: [],
        deaths_caused: [],
        status,
        cause: [],
        responsible: [],
        last_words: [],
      };
      newObj[name].quotes.push(rest.quotes);
      newObj[name].cause.push(rest.cause);
      newObj[name].responsible.push(rest.responsible);
      newObj[name].last_words.push(rest.last_words);
      newObj[name].deaths_caused.push(rest.deaths_caused);
    }
  );

  const data = Object.values(newObj);

 const finalData = data.filter((e) => e.status);

  const allFullCharacter = finalData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      nickname: el.nickname,
      img: el.img,
      birthday: el.birthday,
      occupations: el.occupations,
      quotes: el.quotes.map((el) => el).filter(Boolean),
      deaths_caused: el.deaths_caused.map((el) => el).filter(Boolean),
      status: el.status,
      cause: el.cause
        .map((el) => el)
        .filter(Boolean)
        .toString(),
      responsible: el.responsible
        .map((el) => el)
        .filter(Boolean)
        .toString(),
      last_words: el.last_words
        .map((el) => el)
        .filter(Boolean)
        .toString(),
    };
  });
  return allFullCharacter;
};

module.exports = getFullCharactersApi;
