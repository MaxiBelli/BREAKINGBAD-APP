const axios = require("axios");

// const router = Router();
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
          : el.author && el.author === "Kim Wexler"
          ? "Kimberly Wexler"
          : el.author && el.author === "Jimmy McGill"
          ? "Saul Goodman"
          : el.author && el.author === "Chuck McGill"
          ? "Charles McGill"
          : el.author,
    };
  });
  // console.log(apiQuotesInfo);
  return apiQuotesInfo;
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

module.exports = getQuotesApi;
