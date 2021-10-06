const express = require("express");
const app = express();
const cors = require("cors");

//* Middleware
app.use(express.json());
app.use(cors());

//* ROUTES

//* Register & Login Routes

app.use("/auth", require("./routes/jwtAuth"));

//* Dashboard Routes
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("Server is Running at Port 5000");
});
