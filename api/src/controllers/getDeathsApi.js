const axios = require("axios");

// const router = Router();
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
  // console.log(apiQuotesInfo);
  return apiDeathsInfo;
};

// el.author === "Gus Fring" ||
//         "Hank Schrader" ||
//         "Kim Wexler" ||
//         "Jimmy McGill" ||
//         "Chuck McGill"
//           ? "Gustavo Fring" ||
//             "Henry Schrader" ||
//             "Kimberly Wexler" ||
//             "Saul Godman" ||
//             "Charles McGill"
//           : el.author,

// const getAllQuotes = async () => {
//   try {
//     const apiUrl = await axios.get("https://breakingbadapi.com/api/quotes");
//     const quotesInfo = await apiUrl.data;

//     quotesInfo.map(async (el) => {
//       try {
//         const [quote, created] = await Quote.findOrCreate({
//           where: {
//             id: el.quote_id,
//           },

//           defaults: {
//             id: el.quote_id,
//             quotes: el.quote,
//             author: el.author,
//           },
//         });

//         return quote;
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = getDeathsApi;
