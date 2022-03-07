const knex = require("knex");
const config = require("../knexfile");

const env = process.env.DB_ENV || "development";
console.log(process.env.DB_ENV);

const db = knex(config[env]);

module.exports = db;
