const axios = require("axios");

const getQuotesApi = async () => {
  const apiQuotesUrl = await axios.get("https://breakingbadapi.com/api/quotes");
  const apiQuotesInfo = await apiQuotesUrl.data.map((el) => {
    return {
      quotes: el.quote,
      name:
        el.author === "Gus Fring"
          ? "Gustavo Fring"
          : el.author && el.author === "Hank Schrader"
          ? "Henry Schrader"
          : el.author,
      series: el.series,
    };
  });

  const apiQuotes = apiQuotesInfo.filter((e) => e.series === "Breaking Bad");
  const quotes = apiQuotes.map((el) => {
    return {
      quotes: el.quotes,
      name: el.name,
    };
  });
  return quotes;
};


module.exports = getQuotesApi;
