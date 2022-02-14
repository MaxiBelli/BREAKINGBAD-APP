const axios = require("axios");


const getApiInfo = async () => {
  const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      id: el.char_id,
      occupations: el.occupation.map((el) => el),
      birthday: el.birthday,
    };
  });
  // console.log(apiInfo);
  return apiInfo;
};

console.log(getApiInfo());

module.exports = getApiInfo;