const { Router } = require("express");
const axios = require("axios");
const { Character, Occupation } = require("../db");
const getAllCharacters = require("../Controllers/getAllCharacters");
const router = Router();


router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const charactersTotal = await getAllCharacters();
  if (id) {
    let characterId = await charactersTotal.filter(
      (el) => el.id.toString() === id
    );
    characterId.length
      ? res.status(200).json(characterId)
      : res.status(404).send("No se encontró el personaje");
  }
});

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
  let { name, nickname, birthday, img, status, createdInDb, occupations } =
    req.body;

  let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
  });

  let occupationCreated = await Occupation.findAll({
    where: { name: occupations },
  });
  characterCreated.addOccupation(occupationCreated);
  res.send("Character created successfuly!!");
});

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!isNaN(id)) {
//     const characterIdUrl = await axios.get(
//       "https://www.breakingbadapi.com/api/characters/" + id
//     );
//     const characterIdInfo = await characterIdUrl.data.map((el) => {
//       const { char_id, name, nickname, birthday, status, img, occupation } = el;
//       return {
//         char_id,
//         name,
//         nickname,
//         birthday,
//         status,
//         img,
//         occupation,
//       };
//     });
//     res.send(characterIdInfo);
//   } else {
//     const characterIdBd = await Character.findByPk(id, {
//       include: {
//         model: Occupation,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });
//     res.send(characterIdBd);
//   }
// });

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

