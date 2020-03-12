const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("user_values").truncate();
  await knex("user_values").insert([
    {
      id: 1,
      user_value: "Progress",
      user_value_description: "watch me work",
      user_id: 1
    },
    {
      id: 2,
      user_value: "Love",
      user_value_description: "watch me work",
      user_id: 1
    },
    {
      id: 3,
      user_value: "Harmony",
      user_value_description: "watch me work",
      user_id: 1
    }
  ]);
};
