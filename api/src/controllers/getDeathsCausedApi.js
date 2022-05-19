const axios = require("axios");

const getDeathsCausedApi = async () => {
  const apiDeathsUrl = await axios.get("https://breakingbadapi.com/api/deaths");
  const apiDeathsCausedInfo = await apiDeathsUrl.data.map((el) => {
    return {
      name: el.responsible,
      deaths_caused: el.death,
    };
  });
  return apiDeathsCausedInfo;
};

module.exports = getDeathsCausedApi;
