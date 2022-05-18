const axios = require("axios");

const getDeathsApi = async () => {
  const apiDeathsUrl = await axios.get("https://breakingbadapi.com/api/deaths");
  const apiDeathsInfo = await apiDeathsUrl.data.map((el) => {
    return {
      name: el.death,
      cause: el.cause,
      responsible: el.responsible,
      last_words: el.last_words,
    };
  });
  return apiDeathsInfo;
};

module.exports = getDeathsApi;
