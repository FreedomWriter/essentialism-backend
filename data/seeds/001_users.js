const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      id: 1,
      username: "myUser",
      password: bcrypt.hashSync("Pa5swordIs5ecure", 10)
    }
  ]);
};
