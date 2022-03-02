const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("user_Goals").truncate();
  await knex("user_Goals").insert([
    {
      id: 1,
      user_Goal: "Progress",
      user_Goal_description: "watch me work",
      user_id: 1,
    },
    {
      id: 2,
      user_Goal: "Love",
      user_Goal_description: "watch me work",
      user_id: 1,
    },
    {
      id: 3,
      user_Goal: "Harmony",
      user_Goal_description: "watch me work",
      user_id: 1,
    },
  ]);
};
