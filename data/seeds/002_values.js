exports.seed = async function (knex) {
  await knex("goals").truncate();
  await knex("goals")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("goals").insert([
        { id: 1, goal: "Athletic ability", Goal_description: "" },
        { id: 2, goal: "Art and literature", Goal_description: "" },
        { id: 3, goal: "Creativity", Goal_description: "" },
        {
          id: 4,
          goal: "Social Justice",
          Goal_description: "",
        },
        { id: 5, goal: "Independence", Goal_description: "" },
      ]);
    });
};
