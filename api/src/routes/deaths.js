const { Router } = require("express");
const axios = require("axios");
const { Character, Occupation, Quote } = require("../db");
const getAllCharacters = require("../Controllers/getAllCharacters");
const getDeathsApí = require("../Controllers/getDeathsApi");

const router = Router();

router.get("/", async (req, res) => {
  let deathsApi = await getDeathsApí();

  res.send(deathsApi);
});

//   router.get('/', async (req, res, next) => {
//     const occupationsApi = await axios.get("https://breakingbadapi.com/api/characters");//entra api
//     const occupations = occupationsApi.data.map(el=>el.occupation)//me trae la info y la mapea
//     const occEach = occupations.map(el => {//xq es un arreglo de arreglos
//         for (let i=0; i < el.length; i++) return el[i]})
//     console.log(occEach)
//     occEach.forEach(el => {
//         Occupation.findOrCreate({//si no  esta lo crea y si no no
//             where: { name: el }//donde el nombre sea este el q toy mapeando
//         })
//     })
//     const allOccupations = await Occupation.findAll();//me guarda todas las ocupaciones en el modelo
//     res.send(allOccupations);

// });

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
