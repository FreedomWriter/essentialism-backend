const knex = require("knex");

const env = process.env.DB_ENV || "development";

module.exports = knex(config[env]);
