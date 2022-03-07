exports.seed = async function (knex) {
  await knex("goals").delete();
  await knex("goals")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("goals").insert([
        { id: 1, goal: "Athletic ability", goal_description: "" },
        { id: 2, goal: "Art and literature", goal_description: "" },
        { id: 3, goal: "Creativity", goal_description: "" },
        {
          id: 4,
          goal: "Social Justice",
          goal_description: "",
        },
        { id: 5, goal: "Independence", goal_description: "" },
      ]);
    });
};
