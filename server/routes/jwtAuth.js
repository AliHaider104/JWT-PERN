const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGen = require("../utils/jwtGen");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

//* REGISTERATION
router.post("/register", validinfo, async (req, res) => {
  try {
    //1. destructure the req body (Name,Email,Password)
    const { name, email, password } = req.body;

    //2. check if the user exists (if yes then throw an error)
    const user = await pool.query("SELECT* from users where user_email=$1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      res.status(401).send("User Already Exist");
    }

    //3. Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter a new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5. Generate our JWT token
    const token = jwtGen(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* LOGIN
router.post("/login", validinfo, async (req, res) => {
  //1. destructure (email and password)
  const { email, password } = req.body;
  //2. check if the user exist (if not then throw an error)
  const user = await pool.query("SELECT* from users WHERE user_email=$1", [
    email,
  ]);
  if (user.rows.length === 0) {
    res.status(401).send("Email or Password is Incorrect");
  }

  //3. check if the user password is same as in database
  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );
  if (!validPassword) {
    res.status(401).json("Email or Password is Incorrect");
  }

  //4. Give jwt token
  const token = jwtGen(user.rows[0].user_id);
  res.json({ token });
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
