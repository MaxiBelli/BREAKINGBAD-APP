const axios = require("axios");

const { Character } = require("../db");

const getCharactersApi = async () => {
  const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.char_id,
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      occupations: el.occupation.map((el) => el),
      birthday: el.birthday,
    };
  });
  // console.log(apiInfo);
  return apiInfo;
};

// async function getApiInfo(req, res, next) {
//   try {
//     const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
//     const charactersInfo = await apiUrl.data;

//     charactersInfo.map(async (el) => {
//       try {
//         const [character, created] = await Character.findOrCreate({
//           where: {
//             id: el.char_id,
//           },

//           defaults: {
//             id: el.char_id,
//             name: el.name,
//             // img: el.img,
//             nickname: el.nickname,
//             status: el.status,
//             occupation1: el.occupation[0],
//             birthday: el.birthday,
//           },
//         });

//         return character;
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// console.log(getApiInfo());

module.exports = getCharactersApi;
