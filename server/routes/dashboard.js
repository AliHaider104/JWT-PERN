const pool = require("../db");
const authorization = require("../middleware/authorization");
const router = require("express").Router();

router.get("/", authorization, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
