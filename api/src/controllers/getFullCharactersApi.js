const getCharactersApi = require("./getCharactersApi");
const getQuotesApi = require("./getQuotesApí");
const getDeathsApi = require("./getDeathsApi");

const getFullCharactersApi = async () => {
  const apiCharacters = await getCharactersApi();
  const apiQuotes = await getQuotesApi();
  const apiDeaths = await getDeathsApi();
  const apiFullCharacters = apiCharacters.concat(apiQuotes, apiDeaths);

  const newObj = {};

  apiFullCharacters.forEach(
    ({ name, id, nickname, img, status, occupations, birthday, ...rest }) => {
      newObj[name] = newObj[name] || {
        name,
        id,
        nickname,
        img,
        status,
        occupations,
        birthday,
        quotes: [],
        cause: [],
        responsible: [],
        last_words: [],
      };
      newObj[name].quotes.push(rest.quotes);
      newObj[name].cause.push(rest.cause);
      newObj[name].responsible.push(rest.responsible);
      newObj[name].last_words.push(rest.last_words);
    }
  );

  const data = Object.values(newObj);

 const finalData = data.filter((e) => e.status);

  const allFullCharacter = finalData.map((el) => {
    return {
      name: el.name,
      id: el.id,
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      occupations: el.occupations,
      birthday: el.birthday,
      quotes: el.quotes.map((el) => el).filter(Boolean),
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
