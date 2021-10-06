const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "alihaider104",
  host: "localhost",
  port: 5432,
  database: "JWT",
});

module.exports = pool;
