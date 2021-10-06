const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("You are not Authorize");
    }

    const verify = jwt.verify(JSON.parse(jwtToken), process.env.jwtSecret);
    req.user = verify.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.json("You are not Authorize!");
  }
};
