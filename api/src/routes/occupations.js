const { Router } = require("express");
const { Character, Occupation } = require("../db");
const getFullCharactersApi = require("../Controllers/getFullCharactersApi");
const router = Router();

router.get("/", async (req, res) => {
  let occupationsDb = await Occupation.findAll();
  if (occupationsDb.length === 0) {
    const charactersTotal = await getFullCharactersApi();
    const aux = await charactersTotal.map((el) => el.occupations);
    let occupationsApi = [];
    for (let i = 0; i < aux.length; i++) {
      for (let j = 0; j < aux[i].length; j++) {
        occupationsApi.push(aux[i][j]);
      }
    }
    occupationsApi = occupationsApi.filter((el, i) => {
      //para no repetir las ocupaciones
      return occupationsApi.indexOf(el) === i;
    });
    occupationsApi.forEach((el) => {
      Occupation.findOrCreate({
        where: { name: el },
      });
    });
    occupationsDb = await Occupation.findAll();
  }
  res.send(occupationsDb);
});

//GET/CCCUPATIONS/ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let occupationsById = await Occupation.findOne({
      where: { id },
      include: Character,
    });
    occupationsById ? res.send(occupationsById) : res.sendStatus(404);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
