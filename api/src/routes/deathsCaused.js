const { Router } = require("express");
const getDeathsCausedApi = require("../Controllers/getDeathsCausedApi");
const router = Router();

router.get("/", async (req, res) => {
  const deathsCausedApi = await getDeathsCausedApi();

  res.send(deathsCausedApi);
});

module.exports = router;
