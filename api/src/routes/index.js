const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios"); //importo
const { Character, Occupation } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
      appearance: el.appearance.map((el) => el),
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
      attributes: ["name"], //traer nombre
      through: {
        //mediante este atributo traeme el modelo de ocupacion//es una comprobacion
        attributes: [],
      },
    },
  });
};

const getAllCharacters = async () => {
  let apiInfo = await getApiInfo(); //la ejecuto sino no me va a devolver nada
  const dbInfo = await getDbinfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/characters", async (req, res, next) => {
  const name = req.query.name; ///characters?name=...
  const charactersTotal = await getAllCharacters();
  try {
    if (name) {
      let characterName = await charactersTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      characterName.length
        ? res.status(200).json(characterName)
        : res.status(404).send("No se encontró el personaje");
    } else {
      res.status(200).send(charactersTotal);
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/occupations", async (req, res, next) => {
  const occupationsApi = await axios.get(
    "https://breakingbadapi.com/api/characters"
  ); //entra api
  const occupations = occupationsApi.data.map((el) => el.occupation); //me trae la info y la mapea
  const occEach = occupations.map((el) => {
    //xq es un arreglo de arreglos
    for (let i = 0; i < el.length; i++) return el[i];
  });
  console.log(occEach);
  occEach.forEach((el) => {
    Occupation.findOrCreate({
      //si no  esta lo crea y si no no
      where: { name: el }, //donde el nombre sea este el q toy mapeando
    });
  });
  const allOccupations = Occupation.findAll(); //me guarda todas las ocupaciones en el modelo
  res.send(allOccupations);
});

router.post("/characters", async (req, res, next) => {
  //post con todo lo q me va a llegar x body
  let {
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
    occupation, //abajo no le paso ocupacion xq tengo q hacer la relacion a aparte
  } = req.body;

  let characterCreated = await Character.create({
    //creo el personaje con todo esto
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
  });

  let occupationDb = await Occupation.findAll({
    //la ocupacion la tengo q encontrar en el modelo q tiene todas las ocupaciones
    where: { name: occupation }, //donde la ocupacion la tengo q encontrar con la q coincida con la q le paso x body
  });
  characterCreated.addOccupation(occupationDb); //al perdonaje creado le agrego la ocupacion q coincidio con el nombre
  res.send("Character created successfuly!!");
});

router.get("/characters/:id", async (req, res, next) => {
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

module.exports = router;

//PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const activity = req.body;

  try {
    let act = await Activity.update(activity, {
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
    let act = await Activity.destroy({
      where: { id },
    });
    return res.json({ erased: true });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//GET/ACTIVITIES/ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let activityById = await Activity.findOne({
      where: { id },
      include: Country,
    });
    activityById ? res.send(activityById) : res.sendStatus(404);
  } catch (error) {
    res.status(400).send(error);
  }
});
