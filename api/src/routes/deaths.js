const { Router } = require("express");
const getDeathsApi = require("../Controllers/getDeathsApi");
const router = Router();

router.get("/", async (req, res) => {
  const deathsApi = await getDeathsApi();

  res.send(deathsApi);
});

module.exports = router;
