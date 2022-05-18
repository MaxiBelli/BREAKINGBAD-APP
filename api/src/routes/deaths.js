const { Router } = require("express");
const getDeathsApí = require("../Controllers/getDeathsApi");
const router = Router();

router.get("/", async (req, res) => {
  const deathsApi = await getDeathsApí();

  res.send(deathsApi);
});

module.exports = router;
