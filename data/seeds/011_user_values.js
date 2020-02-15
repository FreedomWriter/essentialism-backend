const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("user_values").truncate();
  await knex("user_values").insert([
    { id: 1, value_id: 1, user_id: 1 },
    { id: 2, value_id: 2, user_id: 1 },
    { id: 3, value_id: 3, user_id: 1 }
  ]);
};
