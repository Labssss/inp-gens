const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: true
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

module.exports = pool