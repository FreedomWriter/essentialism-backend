const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("users").delete();
  await knex("users").insert([
    {
      id: 1,
      username: "username",
      password: bcrypt.hashSync("password", 10),
    },
  ]);
};
