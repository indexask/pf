const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  secret: process.env.SECRET,
  allowExitOnIdle: true,
})

module.exports = pool
