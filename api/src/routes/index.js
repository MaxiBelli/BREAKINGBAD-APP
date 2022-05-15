const { Router } = require("express");
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

const charactersRouter = require("./characters");
const occupationsRouter = require("./occupations");
const quotesRouter = require("./quotes");
const deathsRouter = require("./deaths");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/characters", charactersRouter);
router.use("/occupations", occupationsRouter);
router.use("/quotes", quotesRouter);
router.use("/deaths", deathsRouter);

module.exports = router;
