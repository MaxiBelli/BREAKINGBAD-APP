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

  return apiInfo;
};

module.exports = getCharactersApi;
