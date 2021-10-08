const pool = require("../db");
const authorization = require("../middleware/authorization");
const router = require("express").Router();

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT* FROM users WHERE user_id=$1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
