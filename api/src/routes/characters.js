const { Router } = require("express");
const axios = require("axios");
const { Character, Occupation } = require("../db");

const router = Router();

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      id: el.char_id,
      occupation: el.occupation.map((el) => el),
      birthday: el.birthday,
    };
  });
  // console.log(apiInfo);
  return apiInfo;
};

console.log(getApiInfo());

const getDbinfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllCharacters = async () => {
  let apiInfo = await getApiInfo();
  const dbInfo = await getDbinfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

router.get("/", async (req, res) => {
  const name = req.query.name;
  const charactersTotal = await getAllCharacters();

  if (name) {
    let characterName = await charactersTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    characterName.length
      ? res.status(200).json(characterName)
      : res.status(404).send("Character not found");
  } else {
    res.status(200).send(charactersTotal);
  }
});


router.post("/", async (req, res) => {
  let { name, nickname, birthday, img, status, createdInDb, occupation } =
    req.body;

  let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
  });

  let occupationDb = await Occupation.findAll({
    where: { name: occupation },
  });
  characterCreated.addOccupation(occupationDb);
  res.send("Character created successfuly!!");
});

// router.get("/characters/:id", async (req, res, next) => {
//   const id = req.params.id;
//   const charactersTotal = await getAllCharacters();
//   if (id) {
//     let characterId = await charactersTotal.filter(
//       (el) => el.id.toString() === id
//     );
//     characterId.length
//       ? res.status(200).json(characterId)
//       : res.status(404).send("No se encontró el personaje");
//   }
// });
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!isNaN(id)) {
    const characterIdUrl = await axios.get(
      "https://www.breakingbadapi.com/api/characters/" + id
    );
    const characterIdInfo = await characterIdUrl.data.map((el) => {
      const { char_id, name, nickname, birthday, status, img, occupation } = el;
      return {
        char_id,
        name,
        nickname,
        birthday,
        status,
        img,
        occupation,
      };
    });
    res.send(characterIdInfo);
  } else {
    const characterIdBd = await Character.findByPk(id, {
      include: {
        model: Occupation,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    res.send(characterIdBd);
  }
});

module.exports = router;

//PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const character = req.body;

  try {
    let updateCharacter = await Activity.update(character, {
      where: { id },
    });
    return res.json({ changed: true });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let deleteCharacter = await Character.destroy({
      where: { id },
    });
    return res.json({ erased: true });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

