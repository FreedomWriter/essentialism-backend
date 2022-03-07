const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("user_goals").delete();
  await knex("user_goals").insert([
    {
      id: 1,
      user_goal: "Progress",
      user_goal_description: "watch me work",
      user_id: 1,
    },
    {
      id: 2,
      user_goal: "Love",
      user_goal_description: "watch me work",
      user_id: 1,
    },
    {
      id: 3,
      user_goal: "Harmony",
      user_goal_description: "watch me work",
      user_id: 1,
    },
  ]);
};
