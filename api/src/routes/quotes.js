const { Router } = require("express");
const { Quote } = require("../db");
const getQuotesApi = require("../controllers/getQuotesApí");
const router = Router();

router.get("/", async (req, res) => {
  let quotesDb = await Quote.findAll();
  if (quotesDb.length === 0) {
    const quotesTotal = await getQuotesApi();
    const aux = await quotesTotal.map((el) => el.quotes);

    aux.forEach((el) => {
      Quote.findOrCreate({
        where: { quote: el },
      });
    });
    quotesDb = await Quote.findAll();
  }
  res.send(quotesDb);
});

module.exports = router;
